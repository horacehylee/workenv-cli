import { Argv } from "yargs";

import { TestCommand } from "./testCommand";

export const registerCommands = (argv: Argv) => {
    argv.command(TestCommand)
    return argv;
}

export const log = console.log;
export const pretty = (obj) => JSON.stringify(obj, null, 2);