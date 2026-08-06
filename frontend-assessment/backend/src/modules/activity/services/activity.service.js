const fs = require('node:fs');
const { getDataFilePath } = require('../../../utils/paths');

function activityFilePath() {
  return getDataFilePath('activity.json');
}

function loadDataA() {
  const fp = activityFilePath();

  if (!fs.existsSync(fp)) {
    fs.writeFileSync(fp, '[]');
  }

  let raw = fs.readFileSync(fp, 'utf8');
  if (!raw) {
    raw = '[]';
  }

  return JSON.parse(raw);
}

function loadDataB() {
  const fp = activityFilePath();

  if (!fs.existsSync(fp)) {
    fs.writeFileSync(fp, '[]');
  }

  let raw = fs.readFileSync(fp, 'utf8');
  if (!raw) {
    raw = '[]';
  }

  return JSON.parse(raw);
}

function getAllActivity() {
  const arr = loadDataA();
  return arr;
}

function createNewActivity(b) {
  const fp = activityFilePath();
  const list = loadDataB();
  const one = {
    id: String(Date.now()),
    action: b.action,
    info: b.info,
    when: new Date().toISOString(),
  };

  list.push(one);
  fs.writeFileSync(fp, JSON.stringify(list, null, 2));
  return one;
}

module.exports = {
  getAllActivity,
  createNewActivity,
};
