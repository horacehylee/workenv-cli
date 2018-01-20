import { Argv } from "yargs";
import { connect } from "../db";

import { ProgramCommand } from "./program";
import { TestCommand } from "./testCommand";

export const registerCommands = (argv: Argv) => {
  (async () => {
    await connect();
  })();
  argv.command(ProgramCommand);
  return argv;
};

export const log = console.log;
export const pretty = obj => JSON.stringify(obj, null, 2);
export const logPretty = (obj: any) => log(pretty(obj));
