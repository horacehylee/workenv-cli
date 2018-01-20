import { CommandModule } from "yargs";
import { log, pretty } from "./../index";

import { removeProgram } from "../../modules/workenv/programs";

export const RemoveCommand: CommandModule = {
  command: "remove [name]",
  describe: "Remove a program",
  builder: {},
  handler: async argv => {
    const { name } = argv;
    await removeProgram(name);
    log(`Program(${name}) is removed`);
  }
};
