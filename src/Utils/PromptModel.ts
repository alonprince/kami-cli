import * as inquirer from 'inquirer'

export default class Prompt {
  private static promptIns: Prompt;

  static get Ins() {
    if (!this.promptIns) {
      this.promptIns = new Prompt();
    }
    return this.promptIns;
  }

  async ask(choices: inquirer.Questions) {
    return await inquirer.prompt(choices)
  }
}