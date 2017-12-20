"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const _ = require("lodash");
const resolvePath = require("resolve-path");
const fs = require("fs-extra");
const FileScanModel_1 = require("../../Utils/FileScanModel");
function getTree(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const pathStr = ctx.request.query.path || '';
        const pwd = resolvePath(process.env.PWD, pathStr);
        const result = yield FileScanModel_1.default.Ins.scan(pwd);
        const files = _.filter(result.files, file => {
            const parseInfo = path.parse(file);
            return ~['.js'].indexOf(parseInfo.ext);
        });
        result.files = files;
        return ctx.body = { data: result, ec: 200, em: 'ok' };
    });
}
exports.getTree = getTree;
const readFile = (path) => new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, res) => {
        if (err) {
            return reject(err);
        }
        return resolve(res);
    });
});
function getFile(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        let filePath = ctx.request.query.path || '';
        filePath = resolvePath(process.env.PWD, filePath);
        let fileContent = yield readFile(filePath);
        return ctx.body = { data: fileContent, ec: 200, em: 'ok' };
    });
}
exports.getFile = getFile;
//# sourceMappingURL=FileTreeController.js.map