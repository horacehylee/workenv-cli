import {
  getAllPresets,
  getPresetsByName,
  insertPreset,
  removePresets
} from "./daos/preset.dao";
import { Preset } from "./models/preset.model";

export const addPreset = async (name: string) => {
  const preset = await insertPreset(name);
  return preset;
};

export const editPreset = async () => {};

export const listPresets = async () => {
  const presets = await getAllPresets();
  return presets;
};

export const viewPreset = async (name: string) => {
  const [preset] = await getPresetsByName([name]);
  return preset;
};

export const removePreset = async (name: string) => {
  const [preset] = await getPresetsByName([name]);
  await removePresets(preset);
};
