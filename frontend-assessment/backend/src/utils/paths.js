const fs = require('node:fs');
const path = require('node:path');

function getDataDir() {
  if (process.env.DATA_DIR) {
    return process.env.DATA_DIR;
  }

  // Vercel serverless filesystem is read-only except /tmp.
  if (process.env.VERCEL) {
    return '/tmp/veeliion-data';
  }

  return path.join(process.cwd(), 'data');
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
