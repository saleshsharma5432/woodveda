"""
Flask server for Image-to-DXF Converter
"""

import os
import traceback
from flask import Flask, request, jsonify, send_file, render_template, send_from_directory
from converter.image2d import convert_2d
from converter.image3d import convert_3d
import io

app = Flask(__name__, template_folder="templates", static_folder="static")
app.config["MAX_CONTENT_LENGTH"] = 50 * 1024 * 1024  # 50 MB max upload

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "bmp", "tiff", "tif", "webp", "gif"}


def allowed_file(filename: str) -> bool:
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/convert", methods=["POST"])
def convert():
    # --- Validate file ---
    if "image" not in request.files:
        return jsonify({"error": "No image file provided."}), 400

    file = request.files["image"]
    if file.filename == "":
        return jsonify({"error": "No file selected."}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": f"File type not supported. Allowed: {', '.join(ALLOWED_EXTENSIONS)}"}), 400

    image_bytes = file.read()

    # --- Parse settings ---
    mode = request.form.get("mode", "2d").lower()

    settings = {
        # Common
        "dxf_version": request.form.get("dxf_version", "R2010"),
        "invert":      request.form.get("invert", "false").lower() == "true",
        "blur_radius": int(request.form.get("blur_radius", 3)),
        "scale":       float(request.form.get("scale", 1.0)),

        # 2D specific
        "threshold":     int(request.form.get("threshold", 128)),
        "epsilon_factor": float(request.form.get("epsilon_factor", 0.002)),
        "use_canny":     request.form.get("use_canny", "false").lower() == "true",
        "layer_mode":    request.form.get("layer_mode", "hierarchy"),

        # 3D specific
        "scale_xy":       float(request.form.get("scale", 1.0)),
        "scale_z":        float(request.form.get("scale_z", 50.0)),
        "resolution":     int(request.form.get("resolution", 128)),
        "output_type":    request.form.get("output_type", "mesh"),
        "contour_levels": int(request.form.get("contour_levels", 10)),
    }

    # --- Run conversion ---
    try:
        if mode == "2d":
            dxf_bytes = convert_2d(image_bytes, settings)
            filename = "output_2d.dxf"
        elif mode == "3d":
            dxf_bytes = convert_3d(image_bytes, settings)
            filename = "output_3d.dxf"
        else:
            return jsonify({"error": "Invalid mode. Use '2d' or '3d'."}), 400

    except ValueError as ve:
        return jsonify({"error": str(ve)}), 422
    except Exception:
        traceback.print_exc()
        return jsonify({"error": "Conversion failed. Please check your image and settings."}), 500

    # --- Return DXF file ---
    buffer = io.BytesIO(dxf_bytes)
    buffer.seek(0)
    return send_file(
        buffer,
        as_attachment=True,
        download_name=filename,
        mimetype="application/dxf",
    )


@app.route("/health")
def health():
    return jsonify({"status": "ok", "version": "1.0.0"})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"\n[*] Image-to-DXF Converter running at http://localhost:{port}\n")
    app.run(debug=True, host="0.0.0.0", port=port)
