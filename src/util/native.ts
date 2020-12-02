import TypeOrm, { Connection } from 'typeorm'
declare global {
  interface Window {
    electron: IElectronBindings
    typeorm: typeof TypeOrm
    migrationsPath: string
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

const connectionsMap: Map<string, Connection> = new Map()
export async function getConnection(path: string) {
  const { typeorm, migrationsPath } = window
  const maybeConnection = connectionsMap.get(path)
  if (maybeConnection != null) {
    return maybeConnection
  }
  console.debug(`DB|Loading migration files from: ${migrationsPath}`)
  const newConnection = await typeorm.createConnection({
    type: 'sqlite',
    database: path,
    migrations: [
      migrationsPath
    ],
  })
  connectionsMap.set(path, newConnection)
  return newConnection
}

