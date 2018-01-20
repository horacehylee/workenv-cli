import { get as getEmoji } from 'node-emoji';
import { CommandModule } from "yargs";
import { log, logPretty } from "./../index";

import * as inquirer from "inquirer";
import { join } from "path";
import { getPresetsByName, updatePreset } from "../../modules/workenv/daos/preset.dao";
import { getAllPrograms } from "../../modules/workenv/daos/program.dao";

export const EditCommaand: CommandModule = {
  command: "edit [name]",
  describe: "Edit preset",
  builder: {},
  handler: async argv => {
    const { name } = argv;

    const [preset] = await getPresetsByName([name]);
    const programs = await getAllPrograms();
    const programChoices = programs.map<inquirer.ChoiceType>(program => {
      const checked = preset.programs.includes(program.name);
      return {
        value: program.name,
        checked
      };
    });

    const questions: inquirer.Question[] = [
      {
        type: "checkbox",
        name: "presetOptions",
        message: "Edit your preset",
        choices: programChoices
      }
    ];
    const answers = await inquirer.prompt(questions);
    preset.programs = answers.presetOptions;
    logPretty(preset);

    const confirmQuestion: inquirer.Question = {
      type: "confirm",
      name: "confirm",
      default: false,
      message: `Are you sure to save this preset?`
    };
    const { confirm } = await inquirer.prompt(confirmQuestion);
    if (!confirm) {
      return;
    }
    await updatePreset(preset);
    log(`${getEmoji('heavy_check_mark')} Preset(${name}) is updated`);
  }
};
