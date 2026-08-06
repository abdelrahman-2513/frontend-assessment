const { readJsonArray } = require('../../../utils/jsonStore');
const { getDataFilePath } = require('../../../utils/paths');

async function getTasksSummary() {
  const [tasks, activities] = await Promise.all([
    readJsonArray(getDataFilePath('tasks.json')),
    readJsonArray(getDataFilePath('activity.json')),
  ]);

  const total = tasks.length;

  const byStatus = {
    todo: tasks.filter((t) => !t.completed).length,
    'in-progress': 0,
    done: tasks.filter((t) => t.completed).length,
  };

  const recentActivityCount = activities.length;

  return {
    total,
    byStatus,
    recentActivityCount,
  };
}

module.exports = {
  getTasksSummary,
};
