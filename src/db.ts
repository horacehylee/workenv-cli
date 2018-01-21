import { existsSync, mkdirSync } from "fs";
import { join } from "path";

import * as low from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";
import * as Memory from "lowdb/adapters/Memory";

import { STORAGE_DIR, STORAGE_FILE_PATH } from "./config";

let db: low.Lowdb<
  {} & {
    readonly "@@reference"?: {
      readonly "@@reference": {};
    };
  },
  low.AdapterSync<any>
>;

const dataDirectoryPath = STORAGE_DIR;
const dataFilePath = STORAGE_FILE_PATH;

export interface IConnectOptions {
  testing?: boolean;
}

export const connect = async (options?: IConnectOptions): Promise<void> => {
  if (!options) {
    options = {};
  }
  const { testing } = options;

  let adapter: low.AdapterSync<any>;
  if (testing) {
    adapter = new Memory(dataFilePath);
  } else {
    if (!existsSync(dataDirectoryPath)) {
      mkdirSync(dataDirectoryPath);
    }
    adapter = new FileSync(dataFilePath);
  }
  db = low(adapter);

  if (testing) {
    await resetDb();
  }
};

export const getDb = () => {
  if (!db) {
    throw new Error(
      "database is not initialized, please call connect() first!"
    );
  }
  return db;
};

export const resetDb = async () => {
  db.setState({}).write();
};
