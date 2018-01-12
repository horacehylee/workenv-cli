import { getAllPrograms, getProgramsByName } from "./daos/program.dao";
import { Program } from "./models/program.model";

import { isEmpty } from "lodash";
import { basename, dirname, join } from "path";
import * as ps from "./../ps/ps";

const programPathRegex = /(\.exe)$/i;

export interface IRegisterProgramParam {
  name: string;
  programPath: string;
}

export const registerProgram = async (
  param: IRegisterProgramParam
): Promise<Program> => {
  const { name, programPath } = param;
  if (!programPathRegex.test(programPath)) {
    throw new Error("programPath is invalid");
  }
  const program = new Program({
    name,
    executable: basename(programPath),
    location: dirname(programPath)
  });
  return await program.save();
};

export const runProgram = async (name: string) => {
  const [program] = await getProgramsByName([name]);
  const running = await ps.isProcessRunning(program.executable);

  if (!running) {
    const exePath = join(program.location, program.executable);
    await ps.startProcess(exePath);
  }
};

export const listProgram = async (): Promise<Program[]> => {
  return getAllPrograms();
};

export const removeProgram = async (name: string) => {};
