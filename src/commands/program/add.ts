import chalk from "chalk";
import { get as getEmoji } from 'node-emoji';
import { CommandModule } from "yargs";
import { log, logPretty } from "../index";

import * as inquirer from "inquirer";
import { defaults } from "lodash";
import { basename } from "path";
import { isExecutablePath } from "../../modules/workenv/fns/isExecutable";
import { registerProgram } from "../../modules/workenv/programs";

export const AddCommand: CommandModule = {
  command: "add [path]",
  aliases: "a",
  describe: "Add new program",
  builder: yargs => {
    yargs.positional("path", {
      describe: "Path for the executable"
    });
    return yargs;
  },
  handler: async argv => {
    const { path } = argv;
    if (path) {
      if (!isExecutablePath(path)) {
        throw new Error(
          "Path is not an executable, please enter path with valid executable"
        );
      }
    }

    const questions: inquirer.Question[] = [
      {
        type: "input",
        message: "What do you want to call the program?",
        name: "name",
        default: path ? basename(path, ".exe") : undefined
      }
    ];
    if (!path) {
      questions.push({
        type: "input",
        message: "What is the program path?",
        name: "programPath"
      });
    }
    const answers = await inquirer.prompt(questions);
    const name = answers.name;
    const programPath = path ? path : answers.programPath;
    logPretty({
      name,
      programPath
    });
    const confirmQuestion: inquirer.Question = {
      type: "confirm",
      name: "confirm",
      default: false,
      message: `Are you sure to add this program?`
    };
    const { confirm } = await inquirer.prompt(confirmQuestion);
    if (!confirm) {
      return;
    }
    await registerProgram({
      name,
      programPath
    });
    log(`${getEmoji('heavy_check_mark')} Program is added`);
  }
};
