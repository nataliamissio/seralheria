import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const galleryDirectory = path.join(rootDirectory, 'src', 'assets', 'img', 'galeria');
const galleryFiles = (await readdir(galleryDirectory))
  .filter((file) => /^trabalho\d+\.webp$/.test(file));

for (const file of galleryFiles) {
  const input = path.join(galleryDirectory, file);
  const basename = path.basename(file, '.webp');

  for (const width of [360, 640]) {
    await sharp(input)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 74, effort: 6, smartSubsample: true })
      .toFile(path.join(galleryDirectory, `${basename}-${width}.webp`));
  }
}

const heroInput = path.join(rootDirectory, 'src', 'assets', 'img', 'serralheria.webp');
for (const width of [320, 600]) {
  await sharp(heroInput)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 78, effort: 6, smartSubsample: true })
    .toFile(path.join(rootDirectory, 'src', 'assets', 'img', `serralheria-${width}.webp`));
}

console.log(`Generated responsive variants for ${galleryFiles.length} gallery images and the hero image.`);