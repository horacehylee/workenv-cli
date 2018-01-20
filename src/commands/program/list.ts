import { CommandModule } from "yargs";
import { logPretty } from "./../index";

import { listPrograms } from "../../modules/workenv/programs";

export const ListCommand: CommandModule = {
  command: "list",
  aliases: "ls",
  describe: "List all programs",
  builder: {},
  handler: async argv => {
    const programs = await listPrograms();
    logPretty(programs);
  }
};
