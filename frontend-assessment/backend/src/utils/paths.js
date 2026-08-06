const fs = require('node:fs');
const path = require('node:path');

const DEFAULT_DATA_DIR = path.join(process.cwd(), 'data');

function getDataDir() {
  return process.env.DATA_DIR || DEFAULT_DATA_DIR;
}

function getDataFilePath(fileName) {
  const dir = getDataDir();
  fs.mkdirSync(dir, { recursive: true });
  return path.join(dir, fileName);
}

module.exports = {
  getDataDir,
  getDataFilePath,
};
