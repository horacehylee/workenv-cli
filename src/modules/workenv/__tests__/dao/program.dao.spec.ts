import { connect, resetDb } from "../../../../db";
import { getAllPrograms, getProgramsByName } from "../../daos/program.dao";
import { Program } from "../../models/program.model";

describe("Program Dao", () => {
  beforeAll(async () => {
    await connect({ testing: true });
  });

  describe("Get All Programs", () => {
    beforeAll(async () => {
      await resetDb();
      await Program.bulkCreate([
        {
          executable: "telegram.exe",
          location: "C:\\Users\\xxx\\AppData\\Roaming\\Telegram Desktop",
          name: "telegram"
        },
        {
          name: "trello",
          executable: "Trello.exe",
          location: "C:\\Program Files\\WindowsApps\\xxx\\app"
        }
      ]);
    });

    it("should return a list of programs", async () => {
      const programs = await getAllPrograms();
      expect(programs.length).toEqual(2);
      expect(programs[0].location).toEqual(
        "C:\\Users\\xxx\\AppData\\Roaming\\Telegram Desktop"
      );
      expect(programs[1].location).toEqual(
        "C:\\Program Files\\WindowsApps\\xxx\\app"
      );
    });
  });

  describe("Get Programs By Name", () => {
    beforeAll(async () => {
      await resetDb();
      await Program.bulkCreate([
        {
          executable: "telegram.exe",
          location: "C:\\Users\\xxx\\AppData\\Roaming\\Telegram Desktop",
          name: "telegram"
        }
      ]);
    });

    it("should return all named programs", async () => {
      const [program] = await getProgramsByName(["telegram"]);
      expect(program).not.toBeNull();
      expect(program.executable).toEqual("telegram.exe");
      expect(program.location).toEqual(
        "C:\\Users\\xxx\\AppData\\Roaming\\Telegram Desktop"
      );
      expect(program.name).toEqual("telegram");
    });

    it("should throw error if named program does not exists", async () => {
      await expect(
        getProgramsByName(["telegram", "unknownProgram"])
      ).rejects.toEqual(new Error("Programs(unknownProgram) do not exist"));
    });
  });
});
