

export default class BookModel {
  private static bookIns: BookModel;

  static get Ins() {
    if (!this.bookIns) {
      this.bookIns = new BookModel();
    }
    return this.bookIns;
  }

  async action(alias, options) {

  }
}