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
const chalk_1 = require("chalk");
const _ = require("lodash");
const shelljs_1 = require("shelljs");
const didyoumean = require("didyoumean");
const index_1 = require("../Bootstrap/index");
const ConfigModel_1 = require("../ConfigModel");
const TableModel_1 = require("../Utils/TableModel");
const PromptModel_1 = require("../Utils/PromptModel");
const { bgRed, yellow } = chalk_1.default;
class BuildModel {
    static get Ins() {
        if (!this.buildIns) {
            this.buildIns = new BuildModel();
        }
        return this.buildIns;
    }
    wrongType(type) {
        console.log(bgRed(`Unexpected type: ${type}`));
        console.log();
        console.log(`   You should add this type with command:`);
        console.log(`   $ kami set build <type> <https-registry>`);
        console.log();
        console.log(`   If you want to show the list of supported:`);
        console.log(`   $ kami build -l`);
    }
    initProject(url, name, branch) {
        return new Promise((resolve, reject) => {
            let command = `git clone ${url}`;
            if (name) {
                command += ` ${name}`;
            }
            if (branch) {
                command += ` -b ${branch}`;
            }
            const result = shelljs_1.exec(command);
            if (result.code !== 0) {
                return reject(result.stderr);
            }
            return resolve(result.stdout);
        });
    }
    prompt(list) {
        return __awaiter(this, void 0, void 0, function* () {
            const choices = {
                type: 'list',
                name: 'type',
                message: 'Which type do you want to build?',
                choices: list,
            };
            const choice = yield PromptModel_1.default.Ins.ask(choices);
            const type = choice.type;
            return type;
        });
    }
    list(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const table = new TableModel_1.default({
                head: ['type', 'https', 'ssh']
            });
            const tableData = _.mapValues(config, item => _.values(item));
            console.log('These are all of types we supported now:');
            console.log();
            table.draw(tableData);
        });
    }
    do(type, config, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!type || !(type in config)) {
                this.wrongType(type);
                const mean = didyoumean(type, Object.keys(config));
                if (mean) {
                    console.log('\nDo you mean:');
                    console.log(`  - ${mean}`);
                }
                return;
            }
            let url;
            if (!options.registry) {
                const repo = config[type];
                const { https, ssh } = repo;
                url = options.ssh ? ssh : https;
            }
            else {
                url = options.registry;
            }
            console.log(`start to init project: ${yellow(type)}`);
            console.log('registry url is: ' + yellow(url));
            const stdout = yield this.initProject(url, options.dirName, options.branch);
            console.log(stdout);
            console.log(yellow('Done'));
            console.log(yellow('Enjoy your code'));
        });
    }
    action(type, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield index_1.default.Ins.setup();
                const config = yield ConfigModel_1.default.Ins.loadBuildConfig();
                const types = Object.keys(config);
                if (options.list) {
                    return yield this.list(config);
                }
                else if (!type) {
                    yield this.list(config);
                    type = yield this.prompt(types);
                }
                yield this.do(type, config, options);
            }
            catch (error) {
                console.log(bgRed('Error'));
                console.error(error);
            }
        });
    }
}
exports.default = BuildModel;
//# sourceMappingURL=index.js.map