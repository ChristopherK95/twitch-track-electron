declare global {
  interface Window {
    // electron: {
    //   ipcRenderer: {
    //     send: (channel: string, ...args: any[]) => void;
    //   }
    // }
    api?: any;
  }
}
export {};
