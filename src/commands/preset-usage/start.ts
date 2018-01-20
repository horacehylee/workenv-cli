import { CommandModule } from "yargs";
import { log, logPretty } from "./../index";

import { isEmpty } from "lodash";
import { getPresetsByName } from "../../modules/workenv/daos/preset.dao";
import { runProgram } from "../../modules/workenv/programs";

export const StartCommand: CommandModule = {
  command: "start [name..]",
  describe: "Start all preset programs",
  builder: {},
  handler: async argv => {
    const { name } = argv;
    logPretty(argv);
    // const [preset] = await getPresetsByName([name]);
    // if (isEmpty(preset.programs)) {
    //   log(
    //     `Preset(${name}) does not have any programs, please run "workenv edit ${name}" to add program`
    //   );
    //   return;
    // }

    // const runProgramPromises = preset.programs.map(programName =>
    //   runProgram(programName)
    // );
    // await Promise.all(runProgramPromises);
  }
};
