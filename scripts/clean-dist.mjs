import { existsSync, lstatSync, readdirSync, unlinkSync, rmdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

// Only clean this project's generated dist directory. Do not follow symlinks.
// Avoid the recursive directory-removal path that crashes on this Windows setup.
const outputDirectory = fileURLToPath(new URL('../dist/', import.meta.url));

function removeEntry(path) {
  const entry = lstatSync(path);
  if (entry.isDirectory() && !entry.isSymbolicLink()) {
    for (const name of readdirSync(path)) removeEntry(join(path, name));
    rmdirSync(path);
  } else {
    unlinkSync(path);
  }
}

if (existsSync(outputDirectory)) removeEntry(outputDirectory);
