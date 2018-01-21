import { CommandModule } from "yargs";
import { log, logPretty } from "./index";

import { OAuth2Client } from "google-auth-library";
import {
  BACKUP_NAME,
  GOOGLE_AUTH,
  STORAGE_FILE_PATH,
  STORAGE_TOKEN_PATH
} from "../config";
import { backupFile, restoreFile } from "./../modules/google-drive-backup";
import {
  authorize,
  TokenFileStorage
} from "./../modules/google-oauth2/google-oauth2";

export const googleDriveAuthorize = authorize({
  oauth2Loader: () => Promise.resolve(GOOGLE_AUTH),
  tokenStorage: TokenFileStorage(STORAGE_TOKEN_PATH)
})(["https://www.googleapis.com/auth/drive.appdata"]);

export const BackupCommand: CommandModule = {
  command: "backup",
  describe: "Backup workenv config",
  builder: {},
  handler: async argv => {
    const auth = await googleDriveAuthorize();
    await backupFile(auth)({
      filePath: STORAGE_FILE_PATH,
      uploadedName: BACKUP_NAME
    })({
      createBackup: () => {
        log("Created new backup");
      },
      replaceBackup: () => {
        log("Backup is outdated, updated backup");
      },
      skipBackup: () => {
        log("Backup is up-to-date");
      }
    });
  }
};
