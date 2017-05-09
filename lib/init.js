'use strict';


const chalk = require('chalk');
const help = require('./help');
const inquirer = require('inquirer');
const path = require('path');
const pathExists = require('path-exists');
const fs = require('fs');
const download = require('download-git-repo');
const spawn = require('cross-spawn');


module.exports = () => {
    console.log();
    var questions = [{
        type: 'input',
        name: 'moyName',
        message: 'Moy project name?',
        default: function() {
            return 'moy-manage'
        }
    }];
    inquirer.prompt(questions).then(function(answers) {
        var root = path.resolve(answers.moyName);
        if (!pathExists.sync(answers.moyName)) {
            fs.mkdirSync(root);
        } else {
            help.error(`directory ${answers.moyName} already exists.`);
            process.exit(0);
        }
        help.info(`Downloading \'Moy\' please wait.`);
        //下载项目
        download("uba-templates/uba-boilerplate-manage-init", `${answers.moyName}`, function(err) {
            if (!err) {
                help.info(`Moy ${answers.moyName} done.`);
                inquirer.prompt([{
                    type: 'confirm',
                    message: 'Automatically install NPM dependent packages?',
                    name: 'ok'
                }]).then(function(res) {
                    var npmInstallChdir = path.resolve('.', answers.moyName);
                    if (res.ok) {
                        help.info(`Install NPM dependent packages,please wait.`);
                        //选择自动安装
                        process.chdir(npmInstallChdir);
                        var args = ['install'].filter(function(e) {
                            return e;
                        });
                        var proc = spawn('npm', args, {
                            stdio: 'inherit'
                        });
                        proc.on('close', function(code) {
                            if (code !== 0) {
                                console.error('`npm ' + args.join(' ') + '` failed');
                                return;
                            }
                            help.info(`NPM package installed. cd ${answers.moyName} && npm start`);
                        });

                    } else {
                        help.info(`Cancel the installation of NPM dependent package.\nPlease run \'cd ${answers.moyName} && npm install\' manually.`);
                    }

                });
            } else {
                console.error(requestBody.message);
            }
        });
    });

}
