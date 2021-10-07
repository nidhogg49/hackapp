import React, { createContext, useState } from "react";
import { eventData } from './types'

interface contextType {
    person: eventData | null;
    setPerson: void
}

export const PersonContext = createContext<contextType>({
    person: null,
    setPerson: undefined
});

export const PersonContextProvider: React.FC = ({ children }) => {
    const setPerson = (person:any) => {
        setState({ ...state, person: person });
    }

    const [state, setState] = useState<any>({
        person: null,
        setPerson: setPerson
    });



    return (
        <PersonContext.Provider value={state}>
            {children}
        </PersonContext.Provider>
    )
}
