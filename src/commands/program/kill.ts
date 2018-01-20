import { CommandModule } from "yargs";
import { log, pretty } from "./../index";

import { killProgram } from "../../modules/workenv/programs";

export const KillCommand: CommandModule = {
  command: "kill <name>",
  describe: "Kill a program",
  builder: {},
  handler: async argv => {
    const { name } = argv;
    await killProgram(name);
  }
};
