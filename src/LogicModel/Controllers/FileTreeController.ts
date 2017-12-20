import * as Koa from 'koa'
import * as path from 'path'
import * as _ from 'lodash'
import * as resolvePath from 'resolve-path';
import * as fs from 'fs-extra'
import FileScanModel from '../../Utils/FileScanModel';

/**
 * 获得当前path的所有文件信息
 * 
 * @export
 * @param {Koa.Context} ctx 
 * @returns 
 */
export async function getTree(ctx: Koa.Context) {
  const pathStr = ctx.request.query.path || '';
  const pwd = resolvePath(process.env.PWD, pathStr);
  const result = await FileScanModel.Ins.scan(pwd);
  const files = _.filter(result.files, file => {
    const parseInfo = path.parse(file);
    return ~['.js'].indexOf(parseInfo.ext)
  })
  result.files = files;
  return ctx.body = {data: result, ec: 200, em: 'ok'};
}

/**
 * 读取文件
 * @param path 文件路径
 */
const readFile = (path) => new Promise((resolve, reject) => {
  fs.readFile(path, 'utf-8', (err, res) => {
    if (err) {
      return reject(err);
    }
    return resolve(res);
  })
})

/**
 * 获取文件内容
 * 
 * @export
 * @param {Koa.Context} ctx 
 * @returns 
 */
export async function getFile(ctx: Koa.Context) {
  let filePath = ctx.request.query.path || '';
  filePath = resolvePath(process.env.PWD, filePath);
  let fileContent = await readFile(filePath);
  return ctx.body = {data: fileContent, ec: 200, em: 'ok'};
}