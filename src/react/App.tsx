import React, { useState } from 'react';
import { PreferencesRepo } from '../repos/preferences-repo';
import SelectSaveFile from './SelectSaveFile';

function App() {
  const [preferences, setPreferences] = useState(PreferencesRepo.fetch())
  const noSaveFile = preferences.saveFilePath == null
  return (
    <>
      {noSaveFile && <SelectSaveFile setPath={(path: string) => {
        const preferences = { saveFilePath: path }
        setPreferences(preferences)
        PreferencesRepo.save(preferences)
      }} />}
    </>
  );
}

export default App;
