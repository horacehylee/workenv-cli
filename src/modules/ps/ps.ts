import * as delay from "delay";
import * as fkill from "fkill";
import { isEmpty } from "lodash";
import * as opn from "opn";
import * as tasklist from "tasklist";

export const startProcess = async (exePath: string) => {
  await opn(exePath, { wait: false });
  await delay(1000);
  process.exit();
};

export const isProcessRunning = async (
  processName: string
): Promise<boolean> => {
  const processes = await tasklist({
    filter: [`ImageName eq ${processName}`]
  });
  return !isEmpty(processes);
};

export const killProcess = async (processName: string) => {
  await fkill(processName, { force: true });
};
