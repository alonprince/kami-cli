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
const yaml = require("js-yaml");
class ConfigModel {
    constructor() {
        this.DIR_NAME = '.kami';
        this.CONFIG_FILE = 'config.yaml';
    }
    static get Ins() {
        if (!this.configIns) {
            this.configIns = new ConfigModel();
        }
        return this.configIns;
    }
    get path() {
        const { HOME: home } = process.env;
        return `${home}/${this.DIR_NAME}`;
    }
    get configFilePath() {
        return `${this.path}/${this.CONFIG_FILE}`;
    }
    loadConfig(path) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, 'utf-8', (err, data) => {
                if (err) {
                    return reject(err);
                }
                try {
                    const config = yaml.safeLoad(data);
                    return resolve(config);
                }
                catch (error) {
                    return reject(error);
                }
            });
        });
    }
    loadBuildConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            const config = (yield this.loadConfig(this.configFilePath)) || {};
            const { build = {} } = config;
            return build;
        });
    }
}
exports.default = ConfigModel;
//# sourceMappingURL=index.js.map