import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendPublicDir = path.resolve(__dirname, '..', 'public');
const apiPublicDir = path.resolve(__dirname, '..', '..', 'cms-site-ilungi-api', 'public');

const ROOTS = [frontendPublicDir, apiPublicDir];
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const MAX_DIMENSION = 2200;
const MIN_REDUCTION_RATIO = 0.02;

const walk = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
      continue;
    }

    if (IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
};

const roundKb = (bytes) => Math.round((bytes / 1024) * 10) / 10;

const optimizeBuffer = async (inputBuffer, filePath, metadata) => {
  const extension = path.extname(filePath).toLowerCase();
  const shouldResize =
    (metadata.width || 0) > MAX_DIMENSION || (metadata.height || 0) > MAX_DIMENSION;

  let pipeline = sharp(inputBuffer, { animated: false }).rotate();
  if (shouldResize) {
    pipeline = pipeline.resize({
      width: MAX_DIMENSION,
      height: MAX_DIMENSION,
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  if (extension === '.jpg' || extension === '.jpeg') {
    return pipeline
      .jpeg({
        quality: 80,
        mozjpeg: true,
        progressive: true,
      })
      .toBuffer();
  }

  if (extension === '.png') {
    const usePalette = (metadata.width || 0) <= 1800 && (metadata.height || 0) <= 1800;
    return pipeline
      .png({
        compressionLevel: 9,
        effort: 10,
        palette: usePalette,
        quality: usePalette ? 85 : undefined,
      })
      .toBuffer();
  }

  return pipeline
    .webp({
      quality: 82,
      effort: 6,
    })
    .toBuffer();
};

const optimizeFile = async (filePath) => {
  const inputBuffer = await fs.readFile(filePath);
  const before = inputBuffer.length;
  const metadata = await sharp(inputBuffer, { animated: false }).metadata();

  if (!metadata.width || !metadata.height) {
    return { filePath, before, after: before, changed: false };
  }

  const output = await optimizeBuffer(inputBuffer, filePath, metadata);
  const after = output.length;
  const changed = after < before * (1 - MIN_REDUCTION_RATIO);

  if (changed) {
    await fs.writeFile(filePath, output);
  }

  return { filePath, before, after: changed ? after : before, changed };
};

const main = async () => {
  const rootFiles = await Promise.all(ROOTS.map((root) => walk(root)));
  const imageFiles = rootFiles.flat();
  const results = [];

  for (const imageFile of imageFiles) {
    results.push(await optimizeFile(imageFile));
  }

  const changed = results.filter((entry) => entry.changed);
  const beforeTotal = results.reduce((sum, entry) => sum + entry.before, 0);
  const afterTotal = results.reduce((sum, entry) => sum + entry.after, 0);

  console.log(
    `[IMAGE OPTIMIZE] ${changed.length}/${results.length} ficheiros otimizados. ` +
      `${roundKb(beforeTotal)} KB -> ${roundKb(afterTotal)} KB`
  );

  const topSavings = changed
    .map((entry) => ({
      ...entry,
      saved: entry.before - entry.after,
    }))
    .sort((a, b) => b.saved - a.saved)
    .slice(0, 10);

  for (const entry of topSavings) {
    console.log(
      `[IMAGE OPTIMIZE] ${path.relative(path.resolve(__dirname, '..', '..'), entry.filePath)} ` +
        `${roundKb(entry.before)} KB -> ${roundKb(entry.after)} KB`
    );
  }
};

main().catch((error) => {
  console.error('[IMAGE OPTIMIZE] Falha ao otimizar imagens.', error);
  process.exitCode = 1;
});
