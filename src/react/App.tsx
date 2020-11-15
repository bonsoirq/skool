import React, { Component } from 'react';
import { Connection } from 'typeorm';
import { IPreferences } from '../entities/preferences';
import { PreferencesRepo } from '../repos/preferences-repo';
import { getConnection } from '../util/native';
import SelectSaveFile from './SelectSaveFile';

interface IAppState {
  preferences: IPreferences,
  connection: Connection | null
}

class App extends Component<{}, IAppState> {
  state = {
    preferences: PreferencesRepo.fetch(),
    connection: null,
  }

  render () {
    if (!this.saveFileSelected) {
      return <SelectSaveFile onSuccess={this.setDatabaseConnection} />
    }
  }

  get saveFileSelected () {
    return this.state.preferences.saveFilePath != null
  }

  setDatabaseConnection = (path: string) => {
    const preferences = { saveFilePath: path }
    this.setState(() => ({ preferences }))
    PreferencesRepo.save(preferences)
    getConnection(preferences.saveFilePath)
      .then(connection => this.setState(() => ({ connection })))
  }
}

export default App;
