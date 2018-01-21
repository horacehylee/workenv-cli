import { promisify } from "bluebird";
import chalk from "chalk";
import { exists, mkdir, readFile, writeFile } from "fs";
import { OAuth2Client } from "google-auth-library";
import { Credentials } from "google-auth-library/build/src/auth/credentials";
import * as google from "googleapis";
import * as inquirer from "inquirer";
import * as opn from "opn";
import { dirname } from "path";

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);
const mkdirAsync = promisify(mkdir);
const existsAsync = promisify(function exists2(path, exists2callback) {
  exists(path, existed => {
    exists2callback(null, existed);
  });
});

const log = console.log;

export interface IAuthorizeParams {
  oauth2Loader: IOAuth2Loader;
  tokenStorage: ITokenStorage;
}

export const authorize = (param: IAuthorizeParams) => (
  scopes: string[]
) => async (): Promise<OAuth2Client> => {
  const { oauth2Loader, tokenStorage } = param;
  const { clientId, clientSecret, redirectUrl } = await oauth2Loader();
  const oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUrl);
  let tokens: Credentials;
  try {
    tokens = await tokenStorage.get();
  } catch (e) {
    tokens = await fetchToken(tokenStorage)(oauth2Client)(scopes);
  }
  oauth2Client.setCredentials(tokens);
  return oauth2Client;
};

export type IOAuth2Loader = () => Promise<IOAuth2Param>;
export interface IOAuth2Param {
  clientId: string;
  clientSecret: string;
  redirectUrl: string;
}

export const Oauth2ClientFileLoader = (
  clientSecretFilePath: string
): IOAuth2Loader => {
  return async () => {
    const contentBuffer = await readFileAsync(clientSecretFilePath);
    const content = JSON.parse(contentBuffer.toString("utf8")).installed;
    const oauth2Param: IOAuth2Param = {
      clientId: content.client_id,
      clientSecret: content.client_secret,
      redirectUrl: content.redirect_uris[0]
    };
    return oauth2Param;
  };
};

const fetchToken = (tokenStorage: ITokenStorage) => (
  oauth2Client: OAuth2Client
) => async (scopes: string[]) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes
  });
  log(
    `Authorize this app by visiting this url:\n${chalk.greenBright(authUrl)}`
  );
  opn(authUrl);
  const question: inquirer.Question = {
    type: "input",
    message: "Enter the code from that page here:",
    name: "code"
  };
  const { code } = await inquirer.prompt(question);
  try {
    const { tokens } = await oauth2Client.getToken(code);
    await tokenStorage.store(tokens);
    return tokens;
  } catch (err) {
    log("Error while trying to retrieve access token", err);
    throw err;
  }
};

export interface ITokenStorage {
  store(tokens: any): Promise<void>;
  get(): Promise<any>;
}

export const TokenFileStorage = (tokenPath: string): ITokenStorage => {
  const fileStorage: ITokenStorage = {
    async store(tokens: any): Promise<void> {
      const directoryPath = dirname(tokenPath);
      const directoryExists = await existsAsync(directoryPath);
      if (!directoryExists) {
        await mkdirAsync(directoryPath);
      }
      await writeFileAsync(tokenPath, JSON.stringify(tokens));
    },

    async get(): Promise<any> {
      const tokenString = await readFileAsync(tokenPath);
      return JSON.parse(tokenString.toString("utf8"));
    }
  };
  return fileStorage;
};
