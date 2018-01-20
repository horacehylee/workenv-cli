import {
  addProgram,
  deletePrograms,
  getAllPrograms,
  getProgramsByName
} from "./daos/program.dao";
import { Program } from "./models/program.model";

import { isEmpty } from "lodash";
import { join } from "path";
import * as ps from "./../ps/ps";

export interface IRegisterProgramParam {
  name: string;
  programPath: string;
}

export const registerProgram = async (
  param: IRegisterProgramParam
): Promise<Program> => {
  const { name, programPath } = param;
  const program = await addProgram(name, programPath);
  return program;
};

export const runProgram = async (name: string) => {
  const [program] = await getProgramsByName([name]);
  const running = await ps.isProcessRunning(program.executable);

  if (!running) {
    const exePath = join(program.location, program.executable);
    await ps.startProcess(exePath);
  }
};

export const killProgram = async (name: string) => {
  const [program] = await getProgramsByName([name]);
  const processName = program.executable;
  const running = await ps.isProcessRunning(processName);

  if (running) {
    await ps.killProcess(processName);
  }
};

export const listPrograms = async (): Promise<Program[]> => {
  return getAllPrograms();
};

export const removeProgram = async (name: string) => {
  const [program] = await getProgramsByName([name]);
  await deletePrograms(program);
};
