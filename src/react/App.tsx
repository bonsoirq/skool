import React, { Component } from 'react';
import { PreferencesRepo } from '../repos/preferences-repo';
import { getConnection } from '../util/native';
import { AdvancementLevelsContainer } from './AdvancementLevelsContainer';
import { AdmissionCardsContainer } from './AdmissionCardsContainer';
import { AppContext, IAppState } from './AppContext';
import { Placeholder } from './Placeholder';
import { SelectSaveFile } from './SelectSaveFile';
import { StudentsContainer } from './StudentsContainer';
import { CoursesContainer } from './CoursesContainer';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Navigation } from './Navigation';
import { isEmptyArray } from '../util/array';
import { GroupsContainer } from './GroupsContainer';
import { CourseProvider } from './CourseProvider';
import { CourseContext } from './CourseContext';

class App extends Component<null, IAppState> {
  state = {
    preferences: PreferencesRepo.fetch(),
    connection: null,
  }

  componentDidMount() {
    if (this.saveFilePath != null) {
      this.loadDatabase(this.saveFilePath)
    }
  }

  render() {
    if (this.saveFilePath == null) {
      return <SelectSaveFile onSuccess={this.setDatabaseConnection} />
    }
    if (this.connectionReady) {
      return <AppContext.Provider value={this.state}>
        <Router>
          <Navigation />
          <Switch>
            <Route exact path='/'>
              <CoursesContainer />
            </Route>
            <Route exact path='/AdmissionCards'>
              <AdmissionCardsContainer />
            </Route>
            <CourseProvider>
              <CourseContext.Consumer>
                {({ course }) => <>
                  <Route exact path='/AdvancementLevels'>
                    <AdvancementLevelsContainer course={course!} />
                  </Route>
                </>}
              </CourseContext.Consumer>
              <Route exact path='/Students'>
                <StudentsContainer />
              </Route>
              <Route exact path='/Groups'>
                <GroupsContainer />
              </Route>
            </CourseProvider>
          </Switch>
        </Router>
      </AppContext.Provider>
    }
    return <Placeholder /> // TODO: Loading screen
  }

  get saveFilePath() {
    return this.state.preferences.saveFilePath
  }

  get connectionReady() {
    return this.state.connection != null
  }

  setDatabaseConnection = (path: string) => {
    const preferences = { saveFilePath: path }
    this.loadDatabase(preferences.saveFilePath)
    this.setState(() => ({ preferences }))
    PreferencesRepo.save(preferences)
  }

  loadDatabase(path: string) {
    console.debug(`DB|Loading file: ${path}`)
    getConnection(path)
      .then(async connection => {
        console.debug(`DB|Connection obtained`)
        const migrations = await connection.runMigrations()
        if (isEmptyArray(migrations)) {
          console.debug('DB|No pending migrations found')
        } else {
          console.debug('DB|Performed migrations')
          for (const migration of migrations) {
            console.debug(`DB|Migration|${migration.name}`)
          }
        }
        this.setState(() => ({ connection }))
      })
  }
}

export default App;
