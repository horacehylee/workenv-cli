import { CommandModule } from "yargs";
import { log, pretty } from "./index";

export const TestCommand: CommandModule = {
  command: "test",
  aliases: "t",
  describe: "Just for testing",
  builder: {
    number: {
      alias: "n",
      describe: "a number",
      type: "number"
    }
  },
  handler: async argv => {
    log("Just for testing");
    log(`Here are the argv`);
    log(`${pretty(argv)}`);
  }
};
