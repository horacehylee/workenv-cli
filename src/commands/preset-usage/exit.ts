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

    let killProgramNames: string[] = preset.programs;
    if (
      preset.except &&
      preset.except.teardown &&
      !isEmpty(preset.except.teardown)
    ) {
      killProgramNames = killProgramNames.filter(
        programName => !preset.except.teardown.includes(programName)
      );
    }

    const killProgramPromises = killProgramNames.map(programName =>
      killProgram(programName)
    );
    await Promise.all(killProgramPromises);
  }
};
