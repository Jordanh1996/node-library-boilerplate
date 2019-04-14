const fs = require('fs');
const shell = require('shelljs');
const inquirer = require('inquirer');
const packageJson = require('./package.json');

const main = () => {
  getVersion().then((version) => {
    handleVersion(version);
  });
};

const getVersion = () => {
  return new Promise((resolve) => {
    console.log(`The current version is ${packageJson.version}`);
    inquirer.prompt([
      {
        type: 'list',
        name: 'ver',
        message: 'Please choose update type',
        choices: ['Major', 'Minor', 'Patch', 'Don\'t change version']
      }
    ]).then((answers) => {
      resolve(answers.ver);
    });
  });
};

const handleVersion = (version) => {
  switch (version) {
    case 'Major':
      version = getNewVersion(0);
      break;
    case 'Minor':
      version = getNewVersion(1);
      break;
    case 'Patch':
      version = getNewVersion(2);
      break;
    default:
      break;
  }

  updateVersion(version).then(() => {
    shell.exec('npm publish');
  });
};

const getNewVersion = (index) => {
  let { version } = packageJson;

  version = version.split('.');
  version[index]++;

  for (let i = index + 1; i < version.length; i++) {
    version[i] = 0;
  }

  return version.join('.');
};

const updateVersion = (version) => {
  return new Promise((resolve) => {
    fs.writeFile('./package.json', JSON.stringify(Object.assign({}, packageJson, { version }), null, 2), 'utf8', (err) => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
      resolve();
    });
  });
};

main();
