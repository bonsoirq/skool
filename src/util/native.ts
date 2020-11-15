import TypeOrm, { Connection } from 'typeorm'
declare global {
  interface Window {
    electron: IElectronBindings
    typeorm: typeof TypeOrm
  }
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

const typeorm = window.typeorm
const connectionsMap: Map<string, Connection> = new Map()
let connectionLock = false
export async function getConnection(path: string) {
  const maybeConnection = connectionsMap.get(path)
  while (connectionLock) {
    continue
  }
  if (maybeConnection != null) {
    return maybeConnection
  }
  connectionLock = true
  const newConnection = await typeorm.createConnection({
    type: 'sqlite',
    database: path,
  })
  connectionsMap.set(path, newConnection)
  connectionLock = false
  return newConnection
}

