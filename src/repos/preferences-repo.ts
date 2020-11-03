import { IPreferences } from "../entities/preferences";

const LAST_SAVE_FILE_KEY = 'lastSaveFile'

export class PreferencesRepo {
  static fetch (): IPreferences {
    return {
      saveFilePath: localStorage.getItem(LAST_SAVE_FILE_KEY)
    }
  }

  static save (preferences: IPreferences) {
    const { saveFilePath } = preferences
    if (saveFilePath != null) {
      localStorage.setItem(LAST_SAVE_FILE_KEY, saveFilePath)
    }
  }
}
