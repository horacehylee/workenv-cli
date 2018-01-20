import { get as getEmoji } from 'node-emoji';
import { CommandModule } from "yargs";
import { log, pretty } from "./../index";

import { addPreset } from "../../modules/workenv/preset-mgmt";

export const AddCommand: CommandModule = {
  command: "add <name>",
  describe: "Add a preset",
  builder: {},
  handler: async argv => {
    const { name } = argv;
    await addPreset(name);
    log(`${getEmoji('heavy_check_mark')} Preset(${name}) is added`);
  }
};
