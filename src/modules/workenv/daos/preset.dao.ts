import { Preset } from "../models/preset.model";

import {
  difference,
  filter,
  includes,
  isEmpty,
  isEqual,
  pick,
  uniq
} from "lodash";
import { getDb } from "../../../db";
import { toClassArray } from "../../class-transformer-util/index";
import { getProgramsByName } from "./program.dao";

const presetKey = "presets";

const existsPreset = async (name: string): Promise<boolean> => {
  const db = getDb();
  const exists =
    db
      .get(presetKey)
      .filter((program: Preset) => isEqual(program.name, name))
      .size()
      .value() > 0;
  return exists;
};

export const insertPreset = async (name: string): Promise<Preset> => {
  const db = getDb();

  const exists = await existsPreset(name);
  if (exists) {
    throw new Error(`Preset(${name}) already exists`);
  }

  const preset: Preset = new Preset();
  preset.name = name;
  preset.commands = [];
  preset.programs = [];

  const hasKey = db.has(presetKey).value();
  if (!hasKey) {
    db.set(presetKey, []).write();
  }
  db
    .get(presetKey)
    .push(preset)
    .write();
  return preset;
};

export const getAllPresets = async (): Promise<Preset[]> => {
  const db = getDb();
  const presetObjs = db.get(presetKey).value();
  const presets = await toClassArray(Preset)(presetObjs);
  if (!presets) {
    return [];
  }
  return presets;
};

export const getPresetsByName = async (names: string[]): Promise<Preset[]> => {
  const db = getDb();
  const query = db
    .get(presetKey)
    .filter(({ name }: Preset) => names.includes(name));

  const count = query.size().value();

  const presetObjs = query.value();
  const presets = await toClassArray(Preset)(presetObjs);

  if (count !== names.length) {
    const presetNames = presets.map(preset => preset.name);
    const diff = difference(names, presetNames);
    if (!isEmpty(diff)) {
      throw new Error(`Preset(${diff.join(", ")}) do not exist`);
    }
  }
  return presets;
};

const assertDuplicatePresetProgram = (programs: string[]) => {
  const diffLength = uniq(programs).length !== programs.length;
  if (diffLength) {
    const duplicates = filter(programs, (value, index, iteratee) =>
      includes(iteratee, value, index + 1)
    );
    throw new Error(`Program(${duplicates.join(", ")}) is already added`);
  }
};

export const updatePreset = async (preset: Preset) => {
  const db = getDb();

  if (!isEmpty(preset.programs)) {
    await getProgramsByName(preset.programs);
    assertDuplicatePresetProgram(preset.programs);
  }

  db
    .get(presetKey)
    .find({ name: preset.name })
    .assign(preset)
    .write();
};

export const removePresets = async (...presets: Preset[]) => {
  const db = getDb();
  const presetNames = presets.map(preset => preset.name);
  db
    .get(presetKey)
    .remove(({ name }: Preset) => presetNames.includes(name))
    .write();
};
