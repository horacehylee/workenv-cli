import * as delay from "delay";
import * as ps from "./ps";

const processName = "trello.exe";
const exePath =
  "C:\\Program Files\\WindowsApps\\45273LiamForsyth.PawsforTrello_2.10.1.0_x64__7pb5ddty8z1pa\\app\\trello.exe";

describe("ps", () => {
  it.skip("should start process", async () => {
    await ps.startProcess(exePath);
    await delay(2000);
  });

  it.skip("should return true if process is running", async () => {
    const running = await ps.isProcessRunning(processName);
    expect(running).toBe(true);
  });

  it.skip("should kill process", async () => {
    await ps.killProcess(processName);
  });
});
