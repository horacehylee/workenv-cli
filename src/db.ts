import { Sequelize } from "sequelize-typescript";
import { Program } from "./modules/workenv/models/program.model";

import { homedir } from "os";
import { join } from "path";

let _sequelize: Sequelize;

export interface IConnectOptions {
  testing?: boolean;
}

export const connect = async (options?: IConnectOptions): Promise<void> => {
  const { testing } = options;

  let storagePath = "";
  if (testing) {
    storagePath = ":memory:";
  } else {
    storagePath = join(homedir(), "workenv", "workenv.sqlite");
  }

  const sequelize = new Sequelize({
    database: "workenv_db",
    dialect: "sqlite",
    username: "root",
    password: "",
    operatorsAliases: Sequelize.Op,
    storage: storagePath,
    logging: false
  } as any);

  sequelize.addModels([Program]);
  // sequelize.addModels([__dirname + "/**/*.model.ts"]);

  let syncOptions = {};
  if (testing) {
    syncOptions = {
      force: true
    };
  }
  await sequelize.sync(syncOptions);
  _sequelize = sequelize;
};

export const resetDb = async () => {
  await _sequelize.sync({ force: true });
};
