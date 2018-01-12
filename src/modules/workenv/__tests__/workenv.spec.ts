import { promisify } from "bluebird";
import * as opn from "opn";

import * as delay from "delay";
import * as fkill from "fkill";
import * as tasklist from "tasklist";

const log = console.log;

const testApp = "trello.exe";
const processName = "trello.exe";
const openAppPath =
  "C:\\Program Files\\WindowsApps\\45273LiamForsyth.PawsforTrello_2.10.1.0_x64__7pb5ddty8z1pa\\app\\trello.exe";

describe("WorkEnv", () => {
  it("should start process", async () => {
    await opn(openAppPath, { wait: false });
    await delay(2000);
  });

  it.only("should list any processes with filter", async () => {
    const processes = await tasklist({
      filter: [`ImageName eq ${processName}`]
    });
    log(processes);
  });

  it.skip("should kill process", async () => {
    await fkill(testApp, { force: true });
  });
});
