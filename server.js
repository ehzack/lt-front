#!/usr/bin/env node
const express = require('express');
const path = require('path');
const fs = require('fs');
const os = require('os');

const PORT = Number(process.env.PORT || 80);

const app = express();

const snapshotBuildPath = path.join(__dirname, 'build');

function copyRecursiveSync(source, destination) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const sourcePath = path.join(source, entry.name);
    const destinationPath = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      copyRecursiveSync(sourcePath, destinationPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(sourcePath, destinationPath);
    }
  }
}

function prepareStaticDirectory() {
  if (!fs.existsSync(snapshotBuildPath)) {
    throw new Error('Build assets are missing. Please ensure the React build has been generated.');
  }

  if (process.pkg) {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'lt-front-build-'));
    copyRecursiveSync(snapshotBuildPath, tempDir);
    return tempDir;
  }

  return snapshotBuildPath;
}

const staticDir = prepareStaticDirectory();

app.use(express.static(staticDir, {
  index: 'index.html',
  extensions: ['html']
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Lumières et Technologie frontend available at http://localhost:${PORT}`);
});
