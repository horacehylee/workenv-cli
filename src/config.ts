import { homedir } from "os";
import { join } from "path";
import { IOAuth2Param } from "./modules/google-oauth2/google-oauth2";

export const STORAGE_DIR = join(homedir(), "workenv");
export const STORAGE_FILE_PATH = join(STORAGE_DIR, "workenv.json");
export const STORAGE_TOKEN_PATH = join(STORAGE_DIR, "storage_api_token.json");

export const BACKUP_NAME = "workenv.json";

export const GOOGLE_AUTH: IOAuth2Param = {
  clientId:
    "448569614725-p60akbsqaq551be5nlqmps9iu3ioadhd.apps.googleusercontent.com",
  clientSecret: "rH0R4TacIwB2pRu-xO4nHk5y",
  redirectUrl: "urn:ietf:wg:oauth:2.0:oob"
};
