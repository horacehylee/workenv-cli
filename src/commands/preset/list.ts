import { CommandModule } from "yargs";
import { log, logPretty } from "./../index";

import { listPresets } from "../../modules/workenv/preset-mgmt";

export const ListCommand: CommandModule = {
  command: "list",
  aliases: "ls",
  describe: "List all presets",
  builder: {},
  handler: async argv => {
    const presets = await listPresets();
    logPretty({ presets });
  }
};
