'use strict';

const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

module.exports = {
    help: () => {
        console.log(chalk.green('Usage :'));
        console.log();
        console.log(chalk.green('1. create-moy-app init            Generate best practices'));
        console.log(chalk.green('2. create-moy-app -h              Help'));
        console.log(chalk.green('3. create-moy-app -v              Version'));
        console.log();
    },
    version: () => {
        console.log();
        console.log(chalk.green('Version : ' + require('../package.json').version));
        console.log();
        process.exit();
    },
    info: (msg) => {
        // console.log();
        console.log(chalk.cyan("Info : " + msg));
        // console.log();
    },
    error: (msg) => {
        // console.log();
        console.log(chalk.red("Error : " + msg));
        // console.log();
    }
}
