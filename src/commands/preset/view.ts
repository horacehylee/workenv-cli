import { CommandModule } from "yargs";
import { log, logPretty } from "./../index";

import { viewPreset } from "../../modules/workenv/preset-mgmt";

export const ViewCommand: CommandModule = {
  command: "view <name>",
  aliases: "v",
  describe: "View preset",
  builder: {},
  handler: async argv => {
    const { name } = argv;
    const preset = await viewPreset(name);
    logPretty(preset);
  }
};
