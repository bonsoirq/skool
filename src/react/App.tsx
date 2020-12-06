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
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Navigation } from './Navigation';
import { isEmptyArray } from '../util/array';
import { GroupsContainer } from './GroupsContainer';
import { CourseProvider } from './CourseProvider';
import { CourseContext } from './CourseContext';
import { LessonsContainer } from './LessonsContainer';
import { PresenceContainer } from './PresenceContainer';
import 'normalize.css'
import './App.css'
import { HeaderLayout } from './components/HeaderLayout';

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
      return <div className="app">
        <AppContext.Provider value={this.state}>
          <Router>
            <aside>
              <Navigation />
            </aside>
            <main>
              <Switch>
                <Route exact path='/'>
                  <HeaderLayout>
                    <Redirect to="/Courses" />
                  </HeaderLayout>
                </Route>
                <Route exact path='/Courses'>
                  <HeaderLayout>
                    <CoursesContainer />
                  </HeaderLayout>
                </Route>
                <Route exact path='/AdmissionCards'>
                  <HeaderLayout>
                    <AdmissionCardsContainer />
                  </HeaderLayout>
                </Route>
                <Route exact path='/Students'>
                  <HeaderLayout>
                    <StudentsContainer />
                  </HeaderLayout>
                </Route>
                <CourseProvider>
                  <CourseContext.Consumer>
                    {({ course }) => <>
                      <Route exact path='/AdvancementLevels'>
                        <AdvancementLevelsContainer course={course!} />
                      </Route>
                      <Route exact path='/Groups'>
                        <GroupsContainer course={course!} />
                      </Route>
                      <Route exact path='/Lessons'>
                        <LessonsContainer course={course!} />
                      </Route>
                      <Route exact path='/Lessons/:id/Presence'>
                        <PresenceContainer course={course!} />
                      </Route>
                    </>}
                  </CourseContext.Consumer>
                </CourseProvider>
              </Switch>
            </main>
          </Router>
        </AppContext.Provider>
      </div>
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
