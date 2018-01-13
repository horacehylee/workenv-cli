import { Program } from "../models/program.model";

import { difference, isEmpty, pick } from "lodash";
import preferences = require("preferences");

export const getAllPrograms = async (): Promise<Program[]> => {
  const programs = await Program.findAll({
    where: {}
  });
  return programs;
};

export const getProgramsByName = async (
  names: string[]
): Promise<Program[]> => {
  const { count, rows: programs } = await Program.findAndCountAll({
    where: {
      name: names
    }
  });
  if (count !== names.length) {
    const programNames = programs.map(program => program.name);
    const diff = difference(names, programNames);
    if (!isEmpty(diff)) {
      throw new Error(`Programs(${diff.join(", ")}) do not exist`);
    }
  }
  return programs;
};

export const deletePrograms = async (...programs: Program[]) => {
  const deletePromises = programs.map(program => program.destroy());
  await Promise.all(deletePromises);
};
