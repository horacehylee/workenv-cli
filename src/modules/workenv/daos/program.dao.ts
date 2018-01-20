import { Program } from "../models/program.model";
import { getDb } from "./../../../db";

import { difference, isEmpty, isEqual, pick } from "lodash";
import { basename, dirname } from "path";
import { toClassArray } from "../../class-transformer-util/index";

const programKey = "programs";
const programPathRegex = /(\.exe)$/i;


const existsProgram = async (name: string): Promise<boolean> => {
  const db = getDb();
  const exists =
    db
      .get(programKey)
      .filter((program: Program) => isEqual(program.name, name))
      .size()
      .value() > 0;
  return exists;
};

export const addProgram = async (
  name: string,
  programPath: string
): Promise<Program> => {
  const db = getDb();

  const exists = await existsProgram(name);
  if (exists) {
    throw new Error(`Program(${name}) already exists`);
  }

  if (!programPathRegex.test(programPath)) {
    throw new Error("programPath is invalid");
  }

  const program = new Program();
  program.name = name;
  program.location = dirname(programPath);
  program.executable = basename(programPath);

  const hasKey = db.has(programKey).value();
  if (!hasKey) {
    db.set(programKey, []).write();
  }
  db
    .get(programKey)
    .push(program)
    .write();
  return program;
};

export const getAllPrograms = async (): Promise<Program[]> => {
  const db = getDb();
  const programObjs = db.get(programKey).value();
  const programs = await toClassArray(Program)(programObjs);
  return programs;
};

export const getProgramsByName = async (
  names: string[]
): Promise<Program[]> => {
  const db = getDb();
  const query = db
    .get(programKey)
    .filter(({ name }: Program) => names.includes(name));

  const count = query.size().value();

  const programObjs = query.value();
  const programs = await toClassArray(Program)(programObjs);

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
  const db = getDb();
  const programNames = programs.map(program => program.name);
  db
    .get(programKey)
    .remove(({ name }: Program) => programNames.includes(name))
    .write();
};
