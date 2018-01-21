import { OAuth2Client } from "google-auth-library";
import * as google from "googleapis";
const drive = google.drive("v3");

import { createReadStream } from "fs";
import { isEmpty } from "lodash";
import * as mime from "mime-types";
import { basename } from "path";
import { googleDriveAuthorize } from "../../commands/backup";
import { STORAGE_FILE_PATH } from "../../config";

export interface IGoogleDriveFile {
  id: string;
  name: string;
  createdTime: Date;
  md5Checksum: string;
}

export interface IGoogleDriveListOptions {
  q?: string;
}

export const listFiles = (auth: OAuth2Client) => async (
  options?: IGoogleDriveListOptions
): Promise<IGoogleDriveFile[]> => {
  return new Promise<IGoogleDriveFile[]>((resolve, reject) => {
    drive.files.list(
      {
        spaces: "appDataFolder",
        fields: "nextPageToken, files(id, name, createdTime, md5Checksum)",
        pageSize: 100,
        q: options && options.q ? options.q : undefined,
        auth
      },
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.data.files);
        }
      }
    );
  });
};

export interface IInsertFileParam {
  filePath: string;
  uploadedName: string;
  customMimeType?: string;
}

export const insertFile = (auth: OAuth2Client) => async (
  param: IInsertFileParam
): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const { filePath, uploadedName, customMimeType } = param;

    let mimeType;
    if (customMimeType) {
      mimeType = customMimeType;
    } else {
      const mimeLookup = mime.lookup(filePath);
      if (!mimeLookup) {
        reject(
          new Error(`mimeType for file(${basename(filePath)}) cannot be found`)
        );
        return;
      }
      mimeType = mimeLookup;
    }

    const fileMetadata = {
      name: uploadedName,
      parents: ["appDataFolder"]
    };
    const media = {
      mimeType,
      body: createReadStream(filePath)
    };
    drive.files.create(
      {
        resource: fileMetadata,
        media,
        fields: "id",
        auth
      },
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.data.id);
        }
      }
    );
  });
};

export type GoogleDriveFileField = "id" | "md5Checksum" | "mimeType" | "name";

export const getFile = (auth: OAuth2Client) => (fileId: string) => async (
  fields: GoogleDriveFileField[]
): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (isEmpty(fields)) {
      reject(new Error("fields cannot be empty"));
    }
    const fieldString = fields.join(",");
    drive.files.get(
      {
        fileId,
        fields: fieldString,
        auth
      },
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.data);
        }
      }
    );
  });
};

export const deleteFile = (auth: OAuth2Client) => (
  fileId: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    drive.files.delete(
      {
        fileId,
        auth
      },
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};

export const replaceFile = (auth: OAuth2Client) => (fileId: string) => async (
  filePath: string
) => {
  const { name, mimeType } = await getFile(auth)(fileId)(["name", "mimeType"]);
  await deleteFile(auth)(fileId);
  await insertFile(auth)({
    customMimeType: mimeType,
    filePath,
    uploadedName: name
  });
};

// (async () => {
//   const auth = await googleDriveAuthorize();

//   const fileId = await insertFile(auth)(STORAGE_FILE_PATH);
//   console.log("inserted file: ", fileId);

//   const files = await listFiles(auth)();
//   files.forEach(({ name, id }) => {
//     console.log("Found file:", name, id);
//   });

//   const deletePromises = files.map(({ id }) => deleteFile(auth)(id));
//   await Promise.all(deletePromises);
//   console.log("=========");

//   const files2 = await listFiles(auth)();
//   files2.forEach(({ name, id }) => {
//     console.log("Found file:", name, id);
//   });

//   const fileId = "1A9Ow-HILnA2-TWmjy4pUGpvucTzXlVl0jZaPjykWFHgQGuoCqQ";
//   const fields: GoogleDriveFileField[] = ["id", "md5Checksum"];
//   const file: { id: string; md5Checksum: string } = await getFile(auth)(fileId)(
//     fields
//   );
//   console.log(file);
// })();
