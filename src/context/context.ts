import React from 'react';
import { AppContextInterface } from './types';

export const AppContext = React.createContext<AppContextInterface>({} as AppContextInterface);