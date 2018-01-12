import { connect } from "../../../db";
import { Program } from "../models/program.model";
import * as programFunc from "./../programs";

describe("Program", () => {
  describe("Register program", () => {
    beforeAll(async () => {
      await connect({ testing: true });
    });

    it("should insert program", async () => {
      const program = await programFunc.registerProgram({
        name: "test",
        programPath: "C:\\test\\test.exe"
      });
      expect(program).not.toBeNull();
      expect(program.name).toEqual("test");
      expect(program.executable).toEqual("test.exe");
      expect(program.location).toEqual("C:\\test");
    });

    it.only("should be rejected for invalid program path", async () => {
      await expect(
        programFunc.registerProgram({
          name: "test",
          programPath: "C:\\test\\test"
        })
      ).rejects.toEqual(new Error("programPath is invalid"));
    });
  });
});
