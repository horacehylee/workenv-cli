import { CommandModule } from "yargs";
import { log, pretty } from "./index";

import { AddCommand } from "./program/add";
import { ListCommand } from "./program/list";
import { RemoveCommand } from "./program/remove";
import { RunCommand } from "./program/run";

export const ProgramCommand: CommandModule = {
  command: "program",
  aliases: "p",
  describe: "Programs",
  builder: yargs => {
    yargs.command(AddCommand);
    yargs.command(ListCommand);
    yargs.command(RemoveCommand);
    yargs.command(RunCommand);
    return yargs;
  },
  handler: ListCommand.handler
};
