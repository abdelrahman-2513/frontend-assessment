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

function getSeedData(fileName) {
  try {
    if (fileName === 'tasks.json') {
      return require('../../data/tasks.json');
    }

    if (fileName === 'activity.json') {
      return require('../../data/activity.json');
    }
  } catch {
    return [];
  }

  return [];
}

function getDataFilePath(fileName) {
  const dir = getDataDir();
  fs.mkdirSync(dir, { recursive: true });
  const target = path.join(dir, fileName);

  // On Vercel /tmp starts empty — copy bundled seed JSON once per cold start.
  if (!fs.existsSync(target)) {
    const seed = getSeedData(fileName);
    const payload = Array.isArray(seed) ? seed : [];
    fs.writeFileSync(target, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  }

  return target;
}

module.exports = {
  getDataDir,
  getDataFilePath,
};
