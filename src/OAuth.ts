import { BrowserWindow } from "electron";
import { loadTokens, getAuthenticationURL } from "./auth-service";

export async function OAuth(): Promise<string> {
  const win = new BrowserWindow({
    width: 400,
    height: 600,
    frame: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: false,
    },
  });

  win.loadURL(getAuthenticationURL());
  const {
    session: { webRequest },
  } = win.webContents;

  const filter = {
    urls: ["https://streamtrack-authentication.firebaseapp.com/"],
  };

  const AuthToken = await getToken();

  async function getToken(): Promise<string> {
    const abc: string = await new Promise((resolve, reject) => {
      webRequest.onBeforeRequest(filter, async ({ url }) => {
        const token = await loadTokens(url);
        resolve(token);
      });
    });
    destroyAuthWindow();
    return abc;
  }

  function destroyAuthWindow() {
    if (!win) return;
    win.close();
  }

  return AuthToken;
}
