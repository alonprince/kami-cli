import * as program from 'commander'
import chalk from 'chalk'

const {
  yellow,
  blue,
  magenta,
  cyan,
} = chalk;

import BuildModel from './BuildModel/index';
import { BuildOptions } from './interface';
import BookModel from './BookModel/index';
import LogicModel from './LogicModel/index';

// program
//   .version('0.1.0')
//   .usage('[options] <file ...>')
//   .option('-i, --integer <n>', 'An integer argument', parseInt)
//   .option('-f, --float <n>', 'A float argument', parseFloat)
//   .option('-r, --range <a>..<b>', 'A range', range)
//   .option('-l, --list <items>', 'A list', list)
//   .option('-o, --optional [value]', 'An optional value')
//   .option('-c, --collect [value]', 'A repeatable value', collect, [])
//   .option('-v, --verbose [value]', 'A value that can be increased', increaseVerbosity, 0)
//   .parse(process.argv);

program
  .version(yellow('Version: 0.0.1'))
  .usage(`${yellow('[options]')} ${blue('<command>')} ${magenta('<type>')}`)

// build
program
  .command('build [type]')
  .description('build a project with existing git repo')
  .option('-n, --dir-name [name]', 'folder name')
  .option('-r, --registry [url]', 'git repo url')
  .option('-b, --branch [branch]', 'branch name')
  .option('-l, --list', 'the list of support types')
  .option('--ssh', 'use ssh instead of https')
  .action((type: string, options: BuildOptions) => {
    BuildModel.Ins.action(type, options);
  })
  .on('--help', () => {
    console.log(`${cyan('Example:')}`);
    console.log();
    console.log(`     $ kami ${yellow('-n node-start-project')} ${blue('build')} ${magenta('node')}`);
  });

// book
program
  .command('book [alias]')
  .description('this record everything you what to know')
  .option('--alias [alias]', 'record command as alias in book')
  .option('-l, --list', 'check the content of the book')
  .option('-a, --add [command...]', 'record command in book')
  .option('--history', 'add command from history')
  .action((alias: string, options) => {
    BookModel.Ins.action(alias, options);
  })

program
  .command('logic')
  .description(`kami will tell you your code's logic`)
  .option('-p, --port [port]', 'set custom port')
  .action((options) => {
    LogicModel.Ins.action(options);
  })


program
  .parse(process.argv);
