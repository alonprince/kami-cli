import * as fs from 'fs-extra'
import * as yaml from 'js-yaml'

import { ConfigType } from '../interface'

export default class ConfigModel {
  private static configIns: ConfigModel;
  private DIR_NAME = '.kami';
  private CONFIG_FILE = 'config.yaml';

  static get Ins() {
    if (!this.configIns) {
      this.configIns = new ConfigModel();
    }
    return this.configIns;
  }

  /**
   * 文件夹路径
   * 
   * @readonly
   * @memberof ConfigModel
   */
  get path() {
    const { HOME: home } = process.env;
    return`${home}/${this.DIR_NAME}`;
  }

  get configFilePath() {
    return `${this.path}/${this.CONFIG_FILE}`;
  }

  /**
   * 获取配置
   * 
   * @param {any} path 
   * @returns {PromiseLike<ConfigType>} 
   * @memberof ConfigModel
   */
  loadConfig(path): PromiseLike<ConfigType> {
    return new Promise((resolve, reject) => {
      fs.readFile(path, 'utf-8', (err, data) => {
        if (err) {
          return reject(err);
        }
        try {
          const config = yaml.safeLoad(data);
          return resolve(config);
        } catch (error) {
          return reject(error);
        }
      })
    })
  }

  /**
   * build 相关配置
   * 
   * @returns {Promise<object>} 
   * @memberof ConfigModel
   */
  async loadBuildConfig(): Promise<object> {
    const config = await this.loadConfig(this.configFilePath) || {};
    const { build = {} } = config;
    return build;
  }
}