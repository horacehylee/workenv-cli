import { CommandModule } from "yargs";
import { log, logPretty } from "./index";

import { AddCommand } from "./preset/add";
import { EditCommaand } from "./preset/edit";
import { ListCommand } from "./preset/list";
import { RemoveCommand } from "./preset/remove";
import { ViewCommand } from "./preset/view";

import { ExitCommand } from "./preset-usage/exit";
import { StartCommand } from "./preset-usage/start";

export const PresetCommand: CommandModule = {
  command: "*",
  describe: "Presets",
  builder: yargs => {
    yargs.command(ListCommand);
    yargs.command(AddCommand);
    yargs.command(ViewCommand);
    yargs.command(RemoveCommand);
    yargs.command(EditCommaand);

    yargs.command(StartCommand);
    yargs.command(ExitCommand);
    return yargs;
  },
  handler: argv => {
    StartCommand.handler(argv);
  }
};
