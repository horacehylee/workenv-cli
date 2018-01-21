import { CommandModule } from "yargs";
import { log, logPretty } from "./index";

export const RestoreCommand: CommandModule = {
  command: "restore",
  describe: "Restore workenv config",
  builder: {},
  handler: async argv => {
    logPretty(argv);
  }
};
