import { app } from 'electron';
import * as fs from 'fs';

export interface Settings {
  Token: string;
  AutoStart: boolean;
  StartSize: { x: number; y: number };
}

const GetPath = (): string => {
  return `${app.getPath('appData')}/TwitchTrack-elctrn/`;
};

export const AssureFileExists = (file: string): void => {
  if (!fs.existsSync(GetPath() + file)) {
    fs.writeFileSync(GetPath() + file, '[]');
  }
};

export const AssureSettingsExists = (): void => {
  const settings: Settings = {
    Token: '',
    AutoStart: false,
    StartSize: { x: 400, y: 600 }
  };
  const json = JSON.stringify(settings);

  if (!fs.existsSync(`${GetPath()}settings.json`)) {
    fs.writeFileSync(`${GetPath()}settings.json`, json);
  }
};

export const LoadSettings = (): Settings => {
  return JSON.parse(fs.readFileSync(`${GetPath()}settings.json`, 'utf8'));
};

export const WriteToFile = (file: string, value: string): void => {
  fs.writeFileSync(GetPath() + file, value);
};

export const ReadFile = (file: string): string => {
  return fs.readFileSync(GetPath() + file, 'utf8');
};

export const CheckIfExists = (file: string): boolean => {
  if (!fs.existsSync(GetPath() + file)) {
    return false;
  }
  return true;
};
