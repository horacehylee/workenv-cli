import { Preset } from "../models/preset.model";

import { difference, isEmpty, pick } from "lodash";

const presetDb: { [key: string]: Preset } = {
  dev: {
    name: "dev",
    programs: ["telegram"]
  },
  api: {
    name: "api",
    programs: []
  }
};

export const getAllPresets = (): Promise<Preset[]> => {
  return Promise.resolve(Object.values(presetDb));
};

export const getPresetsByName = (names: string[]): Promise<Preset[]> => {
  const diff = difference(names, Object.keys(presetDb));
  if (!isEmpty(diff)) {
    throw new Error(`Presets(${diff.join(", ")}) do not exist`);
  }
  const presets = Object.values(pick(presetDb, names));
  return Promise.resolve(presets);
};
