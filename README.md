Hans Ravit & Associates — Local dev & optimization notes

Quick start

1. Serve the site locally:

```bash
python3 -m http.server 5500
# then open http://localhost:5500
```

Performance & image optimization

- Convert images to WebP for modern browsers. Example using cwebp:

```bash
# install libwebp / cwebp on macOS (Homebrew)
brew install webp

# convert images in-place (keep original)
cwebp -q 80 "image copy 8.png" -o "image copy 8.webp"
```

- Generate responsive sizes (examples):

```bash
cwebp -q 80 -resize 1600 0 "image copy 8.png" -o hero-1600.webp
cwebp -q 80 -resize 800 0 "image copy 8.png" -o hero-800.webp
```

Server caching (example nginx config)

```
server {
  listen 80;
  server_name example.com;
  root /var/www/your-site;

  location / {
    try_files $uri $uri/ =404;
  }

  # Serve static assets with long cache
  location ~* \.(?:css|js|woff2?|ttf|ico)$ {
    add_header Cache-Control "public, max-age=31536000, immutable";
  }

  location ~* \.(?:png|jpg|jpeg|webp|avif)$ {
    add_header Cache-Control "public, max-age=604800";
  }

  # Enable gzip (or brotli)
  gzip on;
  gzip_types text/css application/javascript image/svg+xml text/plain application/json;
}
```

SEO & Social

- Add Open Graph/Twitter meta (already added).
- Consider adding exact `url` and `address` values in JSON-LD.

Next steps I can take for you

- Generate WebP/AVIF versions of images and responsive srcset files (I can create the commands or run them if you provide images).
- Add Open Graph `url` and full address in JSON-LD if you provide them.
- Minify CSS/JS and produce production-ready assets.
