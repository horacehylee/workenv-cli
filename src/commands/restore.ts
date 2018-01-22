import { CommandModule } from "yargs";
import { log, logPretty } from "./index";

import { BACKUP_NAME, STORAGE_FILE_PATH } from "../config";
import { restoreFile } from "../modules/google-drive-backup/index";
import { googleDriveAuthorize } from "./backup";

export const RestoreCommand: CommandModule = {
  command: "restore",
  describe: "Restore workenv config",
  builder: {},
  handler: async argv => {
    const auth = await googleDriveAuthorize();
    await restoreFile(auth)({
      filePath: STORAGE_FILE_PATH,
      uploadedName: BACKUP_NAME
    });
    log(`Backup restored and saved at "${STORAGE_FILE_PATH}"`);
  }
};
