import { CommandModule } from "yargs";
import { log, logPretty } from "./../index";

import { flatten, isEmpty, uniq } from "lodash";
import { getPresetsByName } from "../../modules/workenv/daos/preset.dao";
import { runProgram } from "../../modules/workenv/programs";

export const StartCommand: CommandModule = {
  command: "start [names..]",
  describe: "Start all preset programs",
  builder: {},
  handler: async argv => {
    const { names }: { names: string[] } = argv;
    if (!names || isEmpty(names)) {
      throw new Error("No preset name is inputted");
    }

    const presets = await getPresetsByName(names);
    presets.forEach(preset => {
      if (isEmpty(preset.programs)) {
        const { name } = preset;
        throw new Error(
          `Preset(${name}) does not have any programs, please run "workenv edit ${name}" to add program`
        );
      }
    });

    const programNames = uniq(flatten(presets.map(preset => preset.programs)));
    const runProgramPromises = programNames.map(programName =>
      runProgram(programName)
    );
    await Promise.all(runProgramPromises);
  }
};
