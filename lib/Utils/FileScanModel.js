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
const _ = require("lodash");
class FileScanModel {
    static get Ins() {
        if (!this.scanIns) {
            this.scanIns = new FileScanModel();
        }
        return this.scanIns;
    }
    isFolder(path) {
        return new Promise((resolve, reject) => {
            fs.stat(path, (err, res) => {
                if (err) {
                    return reject(err);
                }
                const result = res.isDirectory();
                return resolve(result);
            });
        });
    }
    readDir(path) {
        return new Promise((resolve, reject) => {
            fs.readdir(path, (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(res);
            });
        });
    }
    scanner(pwd) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield this.readDir(pwd);
            const filesIsFolder = _.map(files, (file) => this.isFolder(path.resolve(pwd, file)));
            const isFolderRes = yield Promise.all(filesIsFolder);
            const childDir = _.filter(files, (file, index) => isFolderRes[index]);
            const justFiles = _.filter(files, (file, index) => !isFolderRes[index]);
            return {
                folders: childDir,
                files: justFiles,
            };
        });
    }
    scan(path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.scanner(path);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
}
exports.default = FileScanModel;
//# sourceMappingURL=FileScanModel.js.map