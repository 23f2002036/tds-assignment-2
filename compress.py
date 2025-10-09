from PIL import Image
from pathlib import Path

def compress_image(input_path: Path, output_path: Path):
    with Image.open(input_path) as img:
        if img.mode == 'RGBA':
            img = img.convert('RGB')  # Convert to RGB if needed
        img.save(output_path, 'WEBP', quality=100, lossless=True)

# Insert your image filename here
input_image = Path("download.png")  # Replace with your actual image name
output_image = Path("compressed.webp")

compress_image(input_image, output_image)
