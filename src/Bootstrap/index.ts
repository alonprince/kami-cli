import * as fs from 'fs-extra'
import * as path from 'path'
import ConfigModel from '../ConfigModel/index';


export default class Bootstrap {
  private static bootstrapIns: Bootstrap;

  static get Ins() {
    if (!this.bootstrapIns) {
      this.bootstrapIns = new Bootstrap();
    }
    return this.bootstrapIns;
  }

  private pathExist(path): PromiseLike<boolean> {
    return new Promise((resolve, reject) => {
      fs.access(path, (err) => {
        if (err) {
          if (err.code === 'ENOENT') {
            return resolve(false);
          }
          console.error(err);
          return reject(err);
        }
        return resolve(true);
      })
    })
  }

  private mkdir(): PromiseLike<boolean> {
    return new Promise((resolve, reject) => {
      fs.mkdir(ConfigModel.Ins.path, (err) => {
        if (err) {
          return reject(err);
        }
        return resolve(true);
      })
    })
  }

  private copyDefaultConfig(): PromiseLike<boolean> {
    return new Promise((resolve, reject) => {
      const exampleFilePath = path.resolve(__dirname, '../../config.example.yaml');
      const targetFilePath = ConfigModel.Ins.configFilePath;
      fs.copy(exampleFilePath, targetFilePath, (err) => {
        if (err) {
          return reject(err);
        }
        return resolve(true);
      })
    })
  }

  /**
   * 初始化.kami文件夹
   * 
   * @memberof Bootstrap
   */
  async setup() {
    // 判断文件夹
    const isDirExist = await this.pathExist(ConfigModel.Ins.path);
    if (!isDirExist) {
      console.log('kami folder is not exist, creating...')
      await this.mkdir();
      console.log('done')
    }
    // 判断配置文件
    const isFileExist = await this.pathExist(ConfigModel.Ins.configFilePath);
    if (!isFileExist) {
      console.log('config file is not exist, creating...')
      await this.copyDefaultConfig();
      console.log('done')
    }
  }
}