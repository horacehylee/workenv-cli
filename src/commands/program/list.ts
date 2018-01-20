import { CommandModule } from "yargs";
import { log, logPretty } from "./../index";

import Table = require("cli-table2");
import { isEmpty } from "lodash";
import { join } from "path";

import { listPrograms } from "../../modules/workenv/programs";

export const ListCommand: CommandModule = {
  command: "list",
  aliases: "ls",
  describe: "List all programs",
  builder: {},
  handler: async argv => {
    const programs = await listPrograms();
    if (isEmpty(programs)) {
      log(`No programs, please add programs by running "workenv program add"`);
      return;
    }
    const table = new Table({
      head: ["Name", "Path"]
    });
    programs.forEach(program => {
      table.push([program.name, join(program.location, program.executable)]);
    });
    log(table.toString());
  }
};
