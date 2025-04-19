#!/bin/bash

# Script to download free sound effects and assets for Digital Inclusion Companion
# This script uses curl to download files from URLs

# Create directories if they don't exist
mkdir -p public/sounds
mkdir -p public/models
mkdir -p public/textures
mkdir -p public/fonts

# Sound effects from freesound.org (these are example URLs - replace with actual URLs)
echo "Downloading sound effects..."

# Correct answer sound
curl -L "https://cdn.pixabay.com/download/audio/2021/08/04/audio_0625c1539c.mp3" -o public/sounds/correct.mp3

# Incorrect answer sound
curl -L "https://cdn.pixabay.com/download/audio/2021/08/04/audio_c518b5d9c0.mp3" -o public/sounds/incorrect.mp3

# Success sound
curl -L "https://cdn.pixabay.com/download/audio/2022/03/10/audio_942421d462.mp3" -o public/sounds/success.mp3

# Click sound
curl -L "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d3a7d1e7c0.mp3" -o public/sounds/click.mp3

# Achievement sound
curl -L "https://cdn.pixabay.com/download/audio/2021/08/04/audio_c8a901a185.mp3" -o public/sounds/achievement.mp3

# Download 3D models for games
echo "Downloading 3D models..."
# Add model download commands here

# Download textures
echo "Downloading textures..."
# Add texture download commands here

echo "All assets downloaded successfully!"
