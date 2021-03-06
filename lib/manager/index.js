const managerList = [
  'bazel',
  'buildkite',
  'circleci',
  'docker',
  'docker-compose',
  'meteor',
  'npm',
  'nvm',
  'pip_requirements',
  'travis',
];
const managers = {};
for (const manager of managerList) {
  // eslint-disable-next-line global-require,import/no-dynamic-require
  managers[manager] = require(`./${manager}`);
}

const languageList = ['node', 'python'];

const get = (manager, name) => managers[manager][name];
const getLanguageList = () => languageList;
const getManagerList = () => managerList;

module.exports = {
  get,
  getLanguageList,
  getManagerList,
};

const managerFunctions = [
  'extractDependencies',
  'postExtract',
  'getPackageUpdates',
  'updateDependency',
  'supportsLockFileMaintenance',
];

for (const f of managerFunctions) {
  module.exports[f] = (manager, ...params) => {
    if (managers[manager][f]) {
      return managers[manager][f](...params);
    }
    return null;
  };
}
