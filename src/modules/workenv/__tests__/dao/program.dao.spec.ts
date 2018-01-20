import { connect, resetDb } from "../../../../db";
import {
  addProgram,
  deletePrograms,
  getAllPrograms,
  getProgramsByName
} from "../../daos/program.dao";
import { Program } from "../../models/program.model";

export const addTestPrograms = () =>
  Promise.all([
    addProgram(
      "telegram",
      "C:\\Users\\xxx\\AppData\\Roaming\\Telegram Desktop\\telegram.exe"
    ),
    addProgram("trello", "C:\\Program Files\\WindowsApps\\xxx\\app\\Trello.exe")
  ]);

describe("Program Dao", () => {
  beforeAll(async () => {
    await connect({ testing: true });
  });

  beforeEach(async () => {
    await resetDb();
    await addTestPrograms();
  });

  describe("Add Program", () => {
    it("should be able to add program", async () => {
      await addProgram("test", "C:\\test\\test.exe");
      const programs = await getAllPrograms();
      expect(programs.length).toEqual(3);
    });

    it("should throw error if name already exists", async () => {
      await expect(
        addProgram("telegram", "C:\\test\\telegram.exe")
      ).rejects.toEqual(new Error("Program(telegram) already exists"));
    });

    it("should be rejected for invalid program path", async () => {
      await expect(addProgram("test", "C:\\test\\test")).rejects.toEqual(
        new Error("programPath is invalid")
      );
    });
  });

  describe("Get All Programs", () => {
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

  describe("Delete program", () => {
    it("should delete all programs", async () => {
      const programs = await getAllPrograms();
      await deletePrograms(...programs);
      const programsAfter = await getAllPrograms();
      expect(programsAfter).toEqual([]);
    });
  });
});
