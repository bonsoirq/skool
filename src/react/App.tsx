import React, { useState } from 'react';
import { Connection } from 'typeorm';
import { PreferencesRepo } from '../repos/preferences-repo';
import { getConnection } from '../util/native';
import SelectSaveFile from './SelectSaveFile';

function App() {
  const [preferences, setPreferences] = useState(PreferencesRepo.fetch())
  const [_databaseConnection, setDatabaseConnection] = useState<Connection | null>(null)
  const noSaveFile = preferences.saveFilePath == null

  if (preferences.saveFilePath != null) {
    getConnection(preferences.saveFilePath)
      .then(setDatabaseConnection)
  }

  return (
    <>
      {noSaveFile && <SelectSaveFile setPath={async (path: string) => {
        const preferences = { saveFilePath: path }
        setPreferences(preferences)
        PreferencesRepo.save(preferences)
        getConnection(preferences.saveFilePath)
          .then(setDatabaseConnection)
      }} />}
    </>
  );
}

export default App;
