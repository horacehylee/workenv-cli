import { Argv } from "yargs";
import { connect } from "../db";

import { PresetCommand } from "./preset";
import { ProgramCommand } from "./program";

export const registerCommands = (argv: Argv) => {
  (async () => {
    await connect();
  })();
  argv.command(ProgramCommand);
  argv.command(PresetCommand);
  return argv;
};

export const log = console.log;
export const pretty = obj => JSON.stringify(obj, null, 2);
export const logPretty = (obj: any) => log(pretty(obj));
