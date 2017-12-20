"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const serve = require("koa-static");
const path = require("path");
const chalk_1 = require("chalk");
const { bgYellow } = chalk_1.default;
const open = require('open');
const timers_1 = require("timers");
const routes_1 = require("./routes");
function start(options) {
    const app = new Koa();
    const folder = path.resolve(__dirname, '../../public');
    app.use(serve(folder))
        .use(routes_1.default.routes())
        .use(routes_1.default.allowedMethods());
    const port = options.port || process.env.PORT || 8000;
    app.listen(port, () => {
        const url = `http://localhost:${port}/`;
        console.log(`server is start at:`);
        console.log(url);
        console.log();
        console.log(bgYellow(`Currently, We support JS file only`));
        timers_1.setTimeout(() => {
            open(url);
        }, 1000);
    });
}
exports.default = start;
//# sourceMappingURL=server.js.map