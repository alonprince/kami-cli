import chalk from 'chalk'
import * as _ from 'lodash'
import { exec } from 'shelljs'
import * as didyoumean from 'didyoumean'

import Bootstrap from "../Bootstrap/index";
import ConfigModel from "../ConfigModel";
import { BuildOptions, RepoType } from "../interface";
import TableModel from '../Utils/TableModel';
import Prompt from '../Utils/PromptModel';

const { 
  bgRed,
  yellow
} = chalk;

export default class BuildModel {
  private static buildIns: BuildModel;

  static get Ins() {
    if (!this.buildIns) {
      this.buildIns = new BuildModel();
    }
    return this.buildIns;
  }

  private wrongType(type) {
    console.log(bgRed(`Unexpected type: ${type}`));
    console.log()
    console.log(`   You should add this type with command:`)
    console.log(`   $ kami set build <type> <https-registry>`)
    console.log()
    console.log(`   If you want to show the list of supported:`)
    console.log(`   $ kami build -l`)
  }

  /**
   * 初始化项目
   * 
   * @private
   * @param {string} url 
   * @param {string} [name] 
   * @param {string} [branch] 
   * @returns {PromiseLike<string>} 
   * @memberof BuildModel
   */
  private initProject(url:string, name?:string, branch?: string): PromiseLike<string> {
    return new Promise((resolve, reject) => {
      let command = `git clone ${url}`;
      if (name) {
        command += ` ${name}`
      }
      if (branch) {
        command += ` -b ${branch}`
      }
      const result = exec(command);
      if (result.code !== 0) {
        return reject(result.stderr);
      }
      return resolve(result.stdout);
    })
  }

  /**
   * 提示用户输入
   * 
   * @private
   * @param {any} list 
   * @returns 
   * @memberof BuildModel
   */
  private async prompt(list) {
    const choices = {
      type: 'list',
      name: 'type',
      message: 'Which type do you want to build?',
      choices: list,
    }
    const choice = await Prompt.Ins.ask(choices);
    const type = choice.type;
    return type;
  }

  /**
   * 展示当前的type列表
   * 
   * @memberof BuildModel
   */
  async list(config) {
    const table = new TableModel({
      head: ['type', 'https', 'ssh']
    });
    const tableData = _.mapValues(config, item => _.values(item));
    console.log('These are all of types we supported now:');
    console.log();
    table.draw(tableData);
  }

  /**
   * 执行生成操作
   * 
   * @param {string} type 
   * @param {any} config 
   * @param {BuildOptions} options 
   * @returns 
   * @memberof BuildModel
   */
  async do(type: string, config, options: BuildOptions) {
    if (!type || !(type in config)) {
      this.wrongType(type);
      const mean = didyoumean(type, Object.keys(config))
      if (mean) {
        console.log('\nDo you mean:');
        console.log(`  - ${mean}`);
      }
      return;
    }
    let url;
    if (!options.registry) {
      // 获取配置
      const repo: RepoType = config[type];
      const { https, ssh } = repo;
      url = options.ssh ? ssh : https;
    } else {
      url = options.registry;
    }
    console.log(`start to init project: ${yellow(type)}`);
    console.log('registry url is: ' + yellow(url));
    const stdout = await this.initProject(url, options.dirName, options.branch);
    console.log(stdout);
    console.log(yellow('Done'));
    console.log(yellow('Enjoy your code'));
  }

  /**
   * 主入口
   * 
   * TODO:
   * - [x]添加/删除type
   * 
   * @param {string} type 
   * @param {BuildOptions} options 
   * @returns 
   * @memberof BuildModel
   */
  async action(type: string, options: BuildOptions) {
    try {
      // 初始化
      await Bootstrap.Ins.setup();
      // 获取config
      const config = await ConfigModel.Ins.loadBuildConfig();
      const types = Object.keys(config);

      if (options.list) {
        // -l 仅展示list
        return await this.list(config);
      } else if (!type) {
        // 没指定type，展示，然后用inquirer要求用户输入
        await this.list(config);
        type = await this.prompt(types);
      }
      await this.do(type, config, options);
    } catch (error) {
      console.log(bgRed('Error'));
      console.error(error);
    }
  }
}