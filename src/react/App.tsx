import React, { useState } from 'react';
import { Preferences } from './preferences';
import SelectSaveFile from './SelectSaveFile';

function App() {
  const [preferences, setPreferences] = useState(new Preferences())
  const noSaveFile = preferences.lastSaveFile == null
  return (
    <>
      {noSaveFile && <SelectSaveFile setPath={(path: string) => {
        const preferences = new Preferences()
        preferences.setSaveFile(path)
        setPreferences(preferences)
      }} />}
    </>
  );
}

export default App;
