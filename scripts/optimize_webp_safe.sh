#!/bin/bash

# --- Configuration ---
QUALITY=80
BACKUP_DIR="images-safe"

# Check for ImageMagick
if ! command -v magick &> /dev/null; then
    echo "Error: ImageMagick (magick) is not installed."
    echo "Please install it using: brew install imagemagick"
    exit 1
fi

# Create the safe folder
mkdir -p "$BACKUP_DIR"
echo "--- Starting Safe WebP Conversion ---"
echo "Original files will be moved to: ./$BACKUP_DIR"

move_to_safe() {
    local file="$1"
    local dir_structure=$(dirname "$file")
    mkdir -p "$BACKUP_DIR/$dir_structure"
    mv "$file" "$BACKUP_DIR/$file"
}

# Convert PNGs
echo "Step 1: Converting PNGs..."
find . -path "./$BACKUP_DIR" -prune -o -type f -iname "*.png" -print | while read -r file; do
    filename="${file%.*}"
    if magick "$file" -quality $QUALITY -define webp:lossless=false "${filename}.webp"; then
        echo "Converted: $file -> ${filename}.webp"
        move_to_safe "$file"
    else
        echo "Failed to convert: $file"
    fi
done

# Convert JPEGs
echo "Step 2: Converting JPEGs..."
find . -path "./$BACKUP_DIR" -prune -o -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) -print | while read -r file; do
    filename="${file%.*}"
    if magick "$file" -quality $QUALITY "${filename}.webp"; then
        echo "Converted: $file -> ${filename}.webp"
        move_to_safe "$file"
    else
        echo "Failed to convert: $file"
    fi
done

echo "--- Done! ---"
