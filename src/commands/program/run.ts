import { CommandModule } from "yargs";
import { log, pretty } from "./../index";

export const RunCommand: CommandModule = {
  command: "run",
  describe: "Run a program",
  builder: {},
  handler: async argv => {
    log("Just for testing");
    log(`Here are the argv`);
    log(`${pretty(argv)}`);
  }
};
