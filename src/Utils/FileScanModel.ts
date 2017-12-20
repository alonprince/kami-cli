import * as fs from 'fs-extra'
import * as path from 'path'
import * as _ from 'lodash'

import { ScanResult } from '../interface'

/**
 * 扫描文件
 * 
 * @export
 * @class FileScanModel
 */
export default class FileScanModel {
  private static scanIns: FileScanModel;

  static get Ins() {
    if (!this.scanIns) {
      this.scanIns = new FileScanModel();
    }
    return this.scanIns;
  }

  /**
   * 是否是文件夹
   * 
   * @private
   * @param {any} path 
   * @returns {PromiseLike<boolean>} 
   * @memberof FileScanModel
   */
  private isFolder(path): PromiseLike<boolean> {
    return new Promise((resolve, reject) => {
      fs.stat(path, (err, res) => {
        if (err) {
          return reject(err);
        }
        const result = res.isDirectory();
        return resolve(result);
      })
    })
  }

  /**
   * 读取一个目录下的所有文件
   * 
   * @private
   * @param {any} path 
   * @returns {PromiseLike<string[]>} 
   * @memberof FileScanModel
   */
  private readDir(path): PromiseLike<string[]> {
    return new Promise((resolve, reject) => {
      fs.readdir(path, (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      })
    })
  }

  private async scanner(pwd): Promise<ScanResult> {
    const files = await this.readDir(pwd);
    const filesIsFolder = _.map(files, (file) => this.isFolder(path.resolve(pwd, file)))
    const isFolderRes = await Promise.all(filesIsFolder);
    const childDir = _.filter(files, (file, index) => isFolderRes[index]);
    const justFiles = _.filter(files, (file, index) => !isFolderRes[index]);
    return {
      folders: childDir,
      files: justFiles,
    }
  }

  /**
   * 扫描path下的文件和文件夹
   * 
   * @param {any} path 
   * @returns {Promise<ScanResult>} 
   * @memberof FileScanModel
   */
  async scan(path): Promise<ScanResult> {
    try {
      return await this.scanner(path);
    } catch (error) {
      console.error(error);
    }
  }
}