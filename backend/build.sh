#!/bin/bash
# Build script for Render deployment
# This script removes the conflicting 'square' package and installs correct dependencies

set -e

echo "==> Removing conflicting packages..."
pip uninstall -y square 2>/dev/null || true

echo "==> Installing dependencies..."
pip install --no-cache-dir -r requirements.txt

echo "==> Build complete!"
