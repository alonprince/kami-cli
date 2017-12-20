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
const fs = require("fs-extra");
const path = require("path");
const index_1 = require("../ConfigModel/index");
class Bootstrap {
    static get Ins() {
        if (!this.bootstrapIns) {
            this.bootstrapIns = new Bootstrap();
        }
        return this.bootstrapIns;
    }
    pathExist(path) {
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
            });
        });
    }
    mkdir() {
        return new Promise((resolve, reject) => {
            fs.mkdir(index_1.default.Ins.path, (err) => {
                if (err) {
                    return reject(err);
                }
                return resolve(true);
            });
        });
    }
    copyDefaultConfig() {
        return new Promise((resolve, reject) => {
            const exampleFilePath = path.resolve(__dirname, '../../config.example.yaml');
            const targetFilePath = index_1.default.Ins.configFilePath;
            fs.copy(exampleFilePath, targetFilePath, (err) => {
                if (err) {
                    return reject(err);
                }
                return resolve(true);
            });
        });
    }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            const isDirExist = yield this.pathExist(index_1.default.Ins.path);
            if (!isDirExist) {
                console.log('kami folder is not exist, creating...');
                yield this.mkdir();
                console.log('done');
            }
            const isFileExist = yield this.pathExist(index_1.default.Ins.configFilePath);
            if (!isFileExist) {
                console.log('config file is not exist, creating...');
                yield this.copyDefaultConfig();
                console.log('done');
            }
        });
    }
}
exports.default = Bootstrap;
//# sourceMappingURL=index.js.map