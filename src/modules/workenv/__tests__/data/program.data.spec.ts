import { Program } from "../../models/program.model";

import { join } from "path";

export const testPrograms = [
  {
    executable: "telegram.exe",
    location: join(
      "C:",
      "Users",
      "xxx",
      "AppData",
      "Roaming",
      "Telegram Desktop"
    ),
    name: "telegram"
  },
  {
    name: "trello",
    executable: "Trello.exe",
    location: join("C:", "Program Files", "WindowsApps", "xxx", "app")
  }
];

describe.skip("", () => {
  // tslint:disable-next-line:no-empty
  it("", () => {});
});
