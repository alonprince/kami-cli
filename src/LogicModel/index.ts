import server from './server'

export default class LogicModel {
  private static logicIns: LogicModel;

  static get Ins() {
    if (!this.logicIns) {
      this.logicIns = new LogicModel();
    }
    return this.logicIns;
  }

  async action(options) {
    await server(options);
  }
}