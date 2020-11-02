declare global {
  interface Window { electron: IElectronBindings; }
}

interface IElectronBindings {
  remote: {
    dialog: {
      showOpenDialog(): Promise<{ cancelled: boolean, filePaths: string[] }>
      showSaveDialog(): Promise<{ cancelled: boolean, filePath: string | null }>
    }
  }
}

const electron = window.electron

export function openFileDialog() {
  return electron.remote.dialog.showOpenDialog()
}

export function saveFileDialog() {
  return electron.remote.dialog.showSaveDialog()
}
