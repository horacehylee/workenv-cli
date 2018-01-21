import { OAuth2Client } from "google-auth-library";
import * as md5File from "md5-file/promise";
import {
  deleteFile,
  getFile,
  insertFile,
  listFiles,
  replaceFile
} from "./../google-drive";

export interface IBackupFileParam {
  filePath: string;
  uploadedName: string;
}

export interface IBackupFileOptions {
  createBackup?: () => void;
  replaceBackup?: () => void;
  skipBackup?: () => void;
}

export const backupFile = (auth: OAuth2Client) => (
  param: IBackupFileParam
) => async (options?: IBackupFileOptions) => {
  const { filePath, uploadedName } = param;
  const [file] = await listFiles(auth)({
    q: `name='${uploadedName}'`
  });
  if (!file) {
    await insertFile(auth)({
      filePath,
      uploadedName
    });
    if (options && options.createBackup) {
      options.createBackup();
    }
    return;
  }

  const fileHash = await md5File(filePath);
  if (fileHash !== file.md5Checksum) {
    await replaceFile(auth)(file.id)(filePath);
    if (options && options.replaceBackup) {
      options.replaceBackup();
    }
    return;
  }

  if (options && options.skipBackup) {
    options.skipBackup();
  }
};

export interface IRestoreFileParam {
  uploadName: string;
  filePath: string;
}

export const restoreFile = (param: IRestoreFileParam) => {};
