import React from "react";
import { Connection } from "typeorm";
import { IPreferences } from "../entities/preferences";
import { PreferencesRepo } from "../repos/preferences-repo";

export interface IAppState {
  preferences: IPreferences,
  connection: Connection | null
}

export const AppContext = React.createContext<IAppState>({
  preferences: PreferencesRepo.fetch(),
  connection: null,
})

AppContext.displayName = 'AppContext'
