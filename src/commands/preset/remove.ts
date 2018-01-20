import { get as getEmoji } from 'node-emoji';
import { CommandModule } from "yargs";
import { log, logPretty } from "./../index";

import { removePreset } from "../../modules/workenv/preset-mgmt";

export const RemoveCommand: CommandModule = {
  command: "remove [name]",
  aliases: "rm",
  describe: "Remove preset",
  builder: {},
  handler: async argv => {
    const { name } = argv;
    await removePreset(name);
    log(`${getEmoji('heavy_check_mark')} Preset(${name}) is removed`);
  }
};
