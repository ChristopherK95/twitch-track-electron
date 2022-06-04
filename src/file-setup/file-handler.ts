import { app } from "electron";
import fs from "fs";
import { Platform } from "../interfaces/StreamerContext";
import path from "path";

export interface Settings {
  Token: string;
  AutoStart: boolean;
  StartSize: { x: number; y: number };
}

export const AssureFileExists = (fullPath: string, file: string): void => {
  if (!fs.existsSync(GetPath() + file)) {
    fs.writeFileSync(GetPath() + file, "[]");
  }
};

export const AssureSettingsExists = (): void => {
  const settings: Settings = {
    Token: "",
    AutoStart: false,
    StartSize: { x: 400, y: 600 },
  };
  const json = JSON.stringify(settings);

  if (!fs.existsSync(GetPath() + "settings.json")) {
    fs.writeFileSync(GetPath() + "settings.json", json);
  }
};

export const LoadSettings = (): Settings => {
  return JSON.parse(fs.readFileSync(GetPath() + "settings.json", "utf8"));
};

export const WriteToFile = (file: string, value: string): void => {
  fs.writeFileSync(GetPath() + file, value);
};

export const ReadFile = (file: string): string => {
  return fs.readFileSync(GetPath() + file, "utf8");
};

const GetPath = (): string => {
  if (process.platform === "linux") {
    return app.getPath("appData") + "/TwitchTrack-elctrn/";
  }
  if (process.platform === Platform.windows) {
    return path.join(process.env.APPDATA, "\\", "TwitchTrack-elctrn\\");
  }
};

export const CheckIfExists = (file: string): boolean => {
  if (!fs.existsSync(GetPath() + file)) {
    return false;
  }
  return true;
};
