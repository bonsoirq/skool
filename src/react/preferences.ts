const LAST_SAVE_FILE_KEY = 'lastSaveFile'

export class Preferences {
  get lastSaveFile () {
    return localStorage.getItem(LAST_SAVE_FILE_KEY)
  }

  setSaveFile(path: string) {
    localStorage.setItem(LAST_SAVE_FILE_KEY, path)
  }
}

