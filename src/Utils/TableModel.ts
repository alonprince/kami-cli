import * as Table from 'cli-table2'


export default class TableModel {
  private tableIns: Table.Table;
  constructor(options: Table.TableConstructorOptions) {
    this.tableIns = new Table(options);
  }

  /**
   * 绘制table
   * 
   * @param {array} data 
   * @memberof TableModel
   */
  draw(...data) {
    this.tableIns.push.apply(this.tableIns, data);
    console.log(this.tableIns.toString());
  }
}