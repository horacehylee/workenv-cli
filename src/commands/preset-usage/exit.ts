import { CommandModule } from "yargs";
import { log, logPretty } from "./../index";

import { isEmpty } from "lodash";
import { getPresetsByName } from "../../modules/workenv/daos/preset.dao";
import { killProgram } from "../../modules/workenv/programs";

export const ExitCommand: CommandModule = {
  command: "exit <name>",
  describe: "Close all preset programs",
  builder: {},
  handler: async argv => {
    const { name } = argv;
    const [preset] = await getPresetsByName([name]);
    if (isEmpty(preset.programs)) {
      log(
        `Preset(${name}) does not have any programs, please run "workenv edit ${name}" to add program`
      );
      return;
    }

    const killProgramPromises = preset.programs.map(programName =>
      killProgram(programName)
    );
    await Promise.all(killProgramPromises);
  }
};
