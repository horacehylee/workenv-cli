import { CommandModule } from "yargs";
import { log, pretty } from "./index";

import { AddCommand } from "./program/add";
import { KillCommand } from "./program/kill";
import { ListCommand } from "./program/list";
import { RemoveCommand } from "./program/remove";
import { RunCommand } from "./program/run";

export const ProgramCommand: CommandModule = {
  command: "program",
  describe: "Programs",
  builder: yargs => {
    yargs.command(AddCommand);
    yargs.command(ListCommand);
    yargs.command(RemoveCommand);
    yargs.command(RunCommand);
    yargs.command(KillCommand);
    return yargs;
  },
  handler: ListCommand.handler
};
