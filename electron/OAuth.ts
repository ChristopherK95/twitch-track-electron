import { BrowserWindow } from 'electron';
import { loadTokens, getAuthenticationURL } from './auth-service';

export async function OAuth(): Promise<string> {
  const win = new BrowserWindow({
    width: 400,
    height: 600,
    useContentSize: true,
    frame: true,
    resizable: true,
    webPreferences: {
      nodeIntegration: false
    }
  });

  win.removeMenu();

  win.loadURL(getAuthenticationURL());
  const {
    session: { webRequest }
  } = win.webContents;

  const filter = {
    urls: ['https://streamtrack-authentication.firebaseapp.com/']
  };

  const destroyAuthWindow = async () => {
    if (!win) return;
    win.close();
  };

  const getToken = async (): Promise<string> => {
    const abc: string = await new Promise((resolve) => {
      webRequest.onBeforeRequest(filter, async ({ url }) => {
        const token = await loadTokens(url);
        resolve(token);
      });
    });
    destroyAuthWindow();
    return abc;
  };

  const AuthToken = await getToken();

  return AuthToken;
}
