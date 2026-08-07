/**
 * Image to DXF Converter — Frontend Logic
 */

const App = (() => {
  /* ── State ──────────────────────────────────────────── */
  let selectedFile = null;
  let currentMode  = '2d';
  let dxfBlob      = null;
  let dxfFilename  = 'output.dxf';

  /* ── DOM refs ───────────────────────────────────────── */
  const dropZone     = document.getElementById('drop-zone');
  const fileInput    = document.getElementById('file-input');
  const previewArea  = document.getElementById('preview-area');
  const previewImg   = document.getElementById('preview-img');
  const fileNameEl   = document.getElementById('file-name');
  const fileSizeEl   = document.getElementById('file-size');
  const clearBtn     = document.getElementById('clear-btn');
  const convertBtn   = document.getElementById('convert-btn');
  const downloadBtn  = document.getElementById('download-btn');
  const statusSec    = document.getElementById('status-section');
  const statusCard   = document.getElementById('status-card');
  const statusIcon   = document.getElementById('status-icon');
  const statusTitle  = document.getElementById('status-title');
  const statusMsg    = document.getElementById('status-msg');
  const progressWrap = document.getElementById('progress-bar-wrap');
  const progressBar  = document.getElementById('progress-bar');
  const mode2dBtn    = document.getElementById('mode-2d');
  const mode3dBtn    = document.getElementById('mode-3d');
  const settingsPanel = document.getElementById('settings-panel');

  /* ── Mode Toggle ────────────────────────────────────── */
  function setMode(mode) {
    currentMode = mode;
    mode2dBtn.classList.toggle('active', mode === '2d');
    mode3dBtn.classList.toggle('active', mode === '3d');
    settingsPanel.dataset.mode = mode;
    hideStatus();
    dxfBlob = null;
    downloadBtn.classList.remove('visible');
  }

  mode2dBtn.addEventListener('click', () => setMode('2d'));
  mode3dBtn.addEventListener('click', () => setMode('3d'));

  /* ── Drag and Drop ──────────────────────────────────── */
  dropZone.addEventListener('click', () => fileInput.click());

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
  });
  dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    const files = e.dataTransfer.files;
    if (files.length > 0) handleFile(files[0]);
  });

  fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) handleFile(fileInput.files[0]);
  });

  /* ── File Handler ───────────────────────────────────── */
  function handleFile(file) {
    const allowed = ['image/png','image/jpeg','image/bmp','image/tiff','image/webp','image/gif'];
    if (!allowed.includes(file.type) && !file.name.match(/\.(tif|tiff|bmp)$/i)) {
      showStatus('error', '⚠️ Unsupported Format', `File type "${file.type || file.name.split('.').pop()}" is not supported. Please use PNG, JPG, BMP, TIFF, or WebP.`);
      return;
    }

    selectedFile = file;
    dxfBlob = null;
    downloadBtn.classList.remove('visible');
    hideStatus();

    // Preview
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImg.src = e.target.result;
      previewArea.classList.add('visible');
      dropZone.style.display = 'none';
    };
    reader.readAsDataURL(file);

    // File info
    fileNameEl.textContent = file.name;
    fileSizeEl.textContent = formatBytes(file.size);
  }

  /* ── Clear ──────────────────────────────────────────── */
  clearBtn.addEventListener('click', () => {
    selectedFile = null;
    dxfBlob = null;
    fileInput.value = '';
    previewArea.classList.remove('visible');
    dropZone.style.display = '';
    downloadBtn.classList.remove('visible');
    hideStatus();
  });

  /* ── Convert ────────────────────────────────────────── */
  convertBtn.addEventListener('click', async () => {
    if (!selectedFile) {
      showStatus('error', '📂 No Image Selected', 'Please upload an image before converting.');
      return;
    }
    await runConversion();
  });

  async function runConversion() {
    const formData = buildFormData();

    // UI: loading state
    convertBtn.classList.add('loading');
    convertBtn.disabled = true;
    dxfBlob = null;
    downloadBtn.classList.remove('visible');
    showStatus('processing', '⚙️ Converting...', 'Processing your image, please wait.');
    animateProgress(0, 75, 2000);

    try {
      const res = await fetch('/convert', {
        method: 'POST',
        body: formData,
      });

      animateProgress(75, 100, 500);

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Unknown server error' }));
        throw new Error(err.error || `Server error ${res.status}`);
      }

      // Extract filename from Content-Disposition header
      const cd = res.headers.get('Content-Disposition') || '';
      const match = cd.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
      dxfFilename = match ? match[1].replace(/['"]/g, '') : `output_${currentMode}.dxf`;

      dxfBlob = await res.blob();

      showStatus('success', '✅ Conversion Complete!',
        `Your DXF file is ready. Click Download to save "${dxfFilename}".`);
      downloadBtn.classList.add('visible');

    } catch (err) {
      animateProgress(100, 0, 300);
      showStatus('error', '❌ Conversion Failed', err.message || 'An unexpected error occurred.');
    } finally {
      convertBtn.classList.remove('loading');
      convertBtn.disabled = false;
    }
  }

  function buildFormData() {
    const fd = new FormData();
    fd.append('image', selectedFile);
    fd.append('mode',  currentMode);

    // Common
    fd.append('dxf_version', document.getElementById('dxf-version').value);
    fd.append('blur_radius',  document.getElementById('blur-radius').value);
    fd.append('scale',        document.getElementById('scale').value);
    fd.append('invert',       document.getElementById('invert').checked ? 'true' : 'false');

    if (currentMode === '2d') {
      fd.append('threshold',     document.getElementById('threshold').value);
      fd.append('epsilon_factor', (parseFloat(document.getElementById('detail').value) / 10000).toString());
      fd.append('use_canny',     document.getElementById('use-canny').checked ? 'true' : 'false');
      fd.append('layer_mode',    document.getElementById('layer-mode').value);
    } else {
      fd.append('scale',       document.getElementById('scale-xy').value);
      fd.append('scale_z',     document.getElementById('scale-z').value);
      fd.append('resolution',  document.getElementById('resolution').value);
      fd.append('output_type', document.getElementById('output-type').value);
      fd.append('contour_levels', document.getElementById('contour-levels').value);
    }

    return fd;
  }

  /* ── Download ───────────────────────────────────────── */
  downloadBtn.addEventListener('click', () => {
    if (!dxfBlob) return;
    const url = URL.createObjectURL(dxfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = dxfFilename;
    a.click();
    URL.revokeObjectURL(url);
  });

  /* ── Status Helpers ─────────────────────────────────── */
  function showStatus(type, title, msg) {
    statusSec.classList.add('visible');
    statusCard.className = `status-card ${type}`;
    const icons = { success: '✅', error: '❌', processing: '⚙️' };
    statusIcon.textContent = icons[type] || 'ℹ️';
    statusTitle.textContent = title;
    statusMsg.textContent   = msg;

    if (type === 'processing') {
      progressWrap.classList.add('visible');
    } else {
      setTimeout(() => {
        progressWrap.classList.remove('visible');
        progressBar.style.width = '0%';
      }, 600);
    }
  }

  function hideStatus() {
    statusSec.classList.remove('visible');
    progressWrap.classList.remove('visible');
    progressBar.style.width = '0%';
  }

  /* ── Progress Animation ─────────────────────────────── */
  let progressTimer = null;
  function animateProgress(from, to, durationMs) {
    if (progressTimer) clearInterval(progressTimer);
    progressBar.style.width = from + '%';
    const steps = 30;
    const stepTime = durationMs / steps;
    const stepSize = (to - from) / steps;
    let current = from;
    progressTimer = setInterval(() => {
      current += stepSize;
      if ((stepSize > 0 && current >= to) || (stepSize < 0 && current <= to)) {
        current = to;
        clearInterval(progressTimer);
      }
      progressBar.style.width = current + '%';
    }, stepTime);
  }

  /* ── Slider UI ──────────────────────────────────────── */
  function initSlider(id, displayId, formatter) {
    const el = document.getElementById(id);
    const disp = document.getElementById(displayId);
    if (!el || !disp) return;

    const update = () => {
      const pct = ((el.value - el.min) / (el.max - el.min)) * 100;
      el.style.setProperty('--pct', pct + '%');
      disp.textContent = formatter ? formatter(el.value) : el.value;
    };
    el.addEventListener('input', update);
    update();
  }

  /* ── Initialize Sliders ─────────────────────────────── */
  initSlider('threshold',     'threshold-val',     v => v);
  initSlider('blur-radius',   'blur-val',          v => v);
  initSlider('detail',        'detail-val',        v => (v / 10000).toFixed(4));
  initSlider('scale',         'scale-val',         v => parseFloat(v).toFixed(2) + 'x');
  initSlider('scale-xy',      'scale-xy-val',      v => parseFloat(v).toFixed(2));
  initSlider('scale-z',       'scale-z-val',       v => parseFloat(v).toFixed(1));
  initSlider('resolution',    'resolution-val',    v => v + 'px');
  initSlider('contour-levels','contour-levels-val',v => v);

  /* ── Utilities ──────────────────────────────────────── */
  function formatBytes(bytes) {
    if (bytes < 1024)       return bytes + ' B';
    if (bytes < 1024*1024)  return (bytes/1024).toFixed(1) + ' KB';
    return (bytes/(1024*1024)).toFixed(2) + ' MB';
  }

  /* ── Paste from clipboard ────────────────────────────── */
  document.addEventListener('paste', (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (const item of items) {
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) handleFile(file);
        break;
      }
    }
  });

  /* ── Init mode ───────────────────────────────────────── */
  setMode('2d');

})();
