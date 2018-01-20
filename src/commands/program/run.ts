import { CommandModule } from "yargs";
import { log, pretty } from "./../index";

import { runProgram } from "../../modules/workenv/programs";

export const RunCommand: CommandModule = {
  command: "run [name]",
  describe: "Run a program",
  builder: {},
  handler: async argv => {
    const { name } = argv;
    await runProgram(name);
  }
};
