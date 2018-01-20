import { CommandModule } from "yargs";
import { log, pretty } from "./../index";

export const RemoveCommand: CommandModule = {
  command: "remove",
  aliases: "r",
  describe: "Remove a program",
  builder: {},
  handler: async argv => {
    log("Just for testing");
    log(`Here are the argv`);
    log(`${pretty(argv)}`);
  }
};
