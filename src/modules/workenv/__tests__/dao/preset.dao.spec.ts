import { connect, getDb, resetDb } from "../../../../db";
import { Preset } from "./../../models/preset.model";
import { addTestPrograms } from "./program.dao.spec";

import {
  insertPreset,
  getAllPresets,
  getPresetsByName,
  removePresets,
  updatePreset
} from "./../../daos/preset.dao";

export const addTestPresets = async () => {
  const testPresets: Preset[] = [
    {
      name: "dev",
      programs: ["telegram"]
    }
  ];
  const db = getDb();
  db.set("presets", testPresets).write();
};

describe("Preset DAO", () => {
  beforeAll(async () => {
    await connect({ testing: true });
  });

  beforeEach(async () => {
    await resetDb();
    await addTestPrograms();
    await addTestPresets();
  });

  describe("Add Preset", () => {
    it("should add preset only by name", async () => {
      await insertPreset("dev2");
      const presets = await getAllPresets();
      expect(presets.length).toEqual(2);
      expect(presets[1].name).toEqual("dev2");
    });

    it("should throw error for duplicate name", async () => {
      await expect(insertPreset("dev")).rejects.toEqual(
        new Error(`Preset(dev) already exists`)
      );
    });
  });

  describe("Get All Preset", () => {
    it("should return a list of programs", async () => {
      const presets = await getAllPresets();
      expect(presets.length).toEqual(1);
      expect(presets[0].name).toEqual("dev");
    });

    it("should return empty array when null", async () => {
      await resetDb();
      const presets = await getAllPresets();
      expect(presets).toEqual([]);
    });
  });

  describe("Get Preset by name", () => {
    it("should return preset by name", async () => {
      const [preset] = await getPresetsByName(["dev"]);
      expect(preset.name).toEqual("dev");
    });

    it("should throw error for unknown name only", async () => {
      await expect(getPresetsByName(["unknownName"])).rejects.toEqual(
        new Error("Preset(unknownName) do not exist")
      );
    });

    it("should throw error for unknown name mixed with valid name", async () => {
      await expect(getPresetsByName(["unknownName", "dev"])).rejects.toEqual(
        new Error("Preset(unknownName) do not exist")
      );
    });
  });

  describe("Update preset", () => {
    it("should update preset", async () => {
      const [preset] = await getPresetsByName(["dev"]);
      preset.programs.push("trello");
      await updatePreset(preset);
      const [updatedPreset] = await getPresetsByName(["dev"]);
      expect(updatedPreset.programs).toEqual(["telegram", "trello"]);
    });

    it("should throw error for adding unknown program", async () => {
      const [preset] = await getPresetsByName(["dev"]);
      preset.programs.push("unknownName");
      await expect(updatePreset(preset)).rejects.toEqual(
        new Error("Programs(unknownName) do not exist")
      );
    });

    it("should throw error for adding dupliate program", async () => {
      const [preset] = await getPresetsByName(["dev"]);
      preset.programs.push("telegram");
      await expect(updatePreset(preset)).rejects.toEqual(
        new Error("Program(telegram) is already added")
      );
    });
  });

  describe("Remove preset", () => {
    it("should remove preset by name", async () => {
      const [preset] = await getPresetsByName(["dev"]);
      await removePresets(preset);
      const presets = await getAllPresets();
      expect(presets.length).toEqual(0);
    });
  });
});
