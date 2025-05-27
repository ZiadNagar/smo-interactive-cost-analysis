# Favicon Generation Instructions

This directory contains the favicon configuration files. To complete the favicon setup, you need to generate the actual image files from the `favicon.svg` file.

## Required Files to Generate:

1. **favicon.ico** (16x16, 32x32, 48x48 multi-size ICO file)
2. **favicon-16x16.png** (16x16 PNG)
3. **favicon-32x32.png** (32x32 PNG)
4. **apple-touch-icon.png** (180x180 PNG)
5. **android-chrome-192x192.png** (192x192 PNG)
6. **android-chrome-512x512.png** (512x512 PNG)
7. **mstile-150x150.png** (150x150 PNG)
8. **safari-pinned-tab.svg** (Monochrome SVG)

## How to Generate:

### Option 1: Use Online Favicon Generator

1. Go to https://realfavicongenerator.net/
2. Upload the `favicon.svg` file
3. Configure settings (keep theme color as #3b82f6)
4. Download and extract files to this directory

### Option 2: Use Command Line Tools

```bash
# Install ImageMagick
# Convert SVG to different sizes
convert favicon.svg -resize 16x16 favicon-16x16.png
convert favicon.svg -resize 32x32 favicon-32x32.png
convert favicon.svg -resize 180x180 apple-touch-icon.png
convert favicon.svg -resize 192x192 android-chrome-192x192.png
convert favicon.svg -resize 512x512 android-chrome-512x512.png
convert favicon.svg -resize 150x150 mstile-150x150.png

# Create ICO file with multiple sizes
convert favicon.svg -resize 16x16 -colors 256 favicon-16.ico
convert favicon.svg -resize 32x32 -colors 256 favicon-32.ico
convert favicon-16.ico favicon-32.ico favicon.ico
```

### Option 3: Use Design Software

- Open `favicon.svg` in Figma, Sketch, or Adobe Illustrator
- Export to the required sizes and formats
- Ensure PNG files have transparent backgrounds

## Files Included:

- ✅ `favicon.svg` - Source SVG file
- ✅ `site.webmanifest` - Web app manifest
- ✅ `browserconfig.xml` - Windows tile configuration
- ❌ Image files (need to be generated)

## Theme Colors:

- Primary: #3b82f6 (Blue)
- Background: #f9fafb (Light Gray)

The favicon represents a spinning mill gear/cog which is appropriate for the textile engineering theme of the application.
