import { connect, resetDb } from "../../../db";
import { Program } from "../models/program.model";
import * as programFunc from "./../programs";
import { testPrograms } from "./data/program.data.spec";

import { join } from "path";

describe("Program", () => {
  describe("Register program", () => {
    beforeAll(async () => {
      await connect({ testing: true });
    });

    it("should insert program", async () => {
      const program = await programFunc.registerProgram({
        name: "test",
        programPath: join("C:", "test", "test.exe")
      });
      expect(program).not.toBeNull();
      expect(program.name).toEqual("test");
      expect(program.executable).toEqual("test.exe");
      expect(program.location).toEqual(join("C:","test"));
    });

    it("should be rejected for invalid program path", async () => {
      await expect(
        programFunc.registerProgram({
          name: "test",
          programPath: join("C:", "test", "test")
        })
      ).rejects.toEqual(new Error("programPath is invalid"));
    });
  });

  describe("Remove program", () => {
    beforeAll(async () => {
      await connect({ testing: true });
    });

    beforeEach(async () => {
      await resetDb();
      await Program.bulkCreate(testPrograms);
    });

    it("should remove program by name", async () => {
      await programFunc.removeProgram("telegram");
      const programs = await programFunc.listProgram();
      expect(programs.length).toEqual(1);
    });

    it("should throw error if program of name does not exists", async () => {
      await expect(programFunc.removeProgram("unknownProgram")).rejects.toEqual(
        new Error("Programs(unknownProgram) do not exist")
      );
    });
  });
});
