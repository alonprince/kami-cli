"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Table = require("cli-table2");
class TableModel {
    constructor(options) {
        this.tableIns = new Table(options);
    }
    draw(...data) {
        this.tableIns.push.apply(this.tableIns, data);
        console.log(this.tableIns.toString());
    }
}
exports.default = TableModel;
//# sourceMappingURL=TableModel.js.map