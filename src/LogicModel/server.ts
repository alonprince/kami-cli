import * as Koa from 'koa'
import * as serve from 'koa-static'
import * as path from 'path'
import chalk from 'chalk'

const { bgYellow } = chalk;

const open = require('open')
import { setTimeout } from 'timers';
import router from './routes'

export default function start(options) {
  const app = new Koa();

  const folder = path.resolve(__dirname, '../../public');
  app.use(serve(folder))
    .use(router.routes())
    .use(router.allowedMethods())

  const port = options.port || process.env.PORT || 8000;

  app.listen(port, () => {
    const url = `http://localhost:${port}/`
    console.log(`server is start at:`)
    console.log(url);
    console.log();
    console.log(bgYellow(`Currently, We support JS file only`));
    setTimeout(() => {
      open(url)
    }, 1000);
  })
}