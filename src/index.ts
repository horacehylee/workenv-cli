// tslint:disable-next-line:no-var-requires
const pkg = require("./../package.json");
import * as updateNotifier from "update-notifier";
updateNotifier({ pkg }).notify();

const scriptName = "workenv";

const MAIN_JS_REGEX = new RegExp("(main.js)$");
const INDEX_MAX = 1;
for (let i = 0; i <= INDEX_MAX; i++) {
  if (MAIN_JS_REGEX.test(process.argv[i])) {
    process.argv[i] = scriptName;
  }
}

import * as yargs from "yargs";
import { registerCommands } from "./commands";

const argv = registerCommands(yargs);
const args = argv
  .demandCommand(1, "You need at least one command before moving on")
  .help().argv;
