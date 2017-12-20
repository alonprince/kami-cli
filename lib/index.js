"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const chalk_1 = require("chalk");
const { yellow, blue, magenta, cyan, } = chalk_1.default;
const index_1 = require("./BuildModel/index");
const index_2 = require("./BookModel/index");
const index_3 = require("./LogicModel/index");
program
    .version(yellow('Version: 0.0.1'))
    .usage(`${yellow('[options]')} ${blue('<command>')} ${magenta('<type>')}`);
program
    .command('build [type]')
    .description('build a project with existing git repo')
    .option('-n, --dir-name [name]', 'folder name')
    .option('-r, --registry [url]', 'git repo url')
    .option('-b, --branch [branch]', 'branch name')
    .option('-l, --list', 'the list of support types')
    .option('--ssh', 'use ssh instead of https')
    .action((type, options) => {
    index_1.default.Ins.action(type, options);
})
    .on('--help', () => {
    console.log(`${cyan('Example:')}`);
    console.log();
    console.log(`     $ kami ${yellow('-n node-start-project')} ${blue('build')} ${magenta('node')}`);
});
program
    .command('book [alias]')
    .description('this record everything you what to know')
    .option('--alias [alias]', 'record command as alias in book')
    .option('-l, --list', 'check the content of the book')
    .option('-a, --add [command...]', 'record command in book')
    .option('--history', 'add command from history')
    .action((alias, options) => {
    index_2.default.Ins.action(alias, options);
});
program
    .command('logic')
    .description(`kami will tell you your code's logic`)
    .option('-p, --port [port]', 'set custom port')
    .action((options) => {
    index_3.default.Ins.action(options);
});
program
    .parse(process.argv);
//# sourceMappingURL=index.js.map