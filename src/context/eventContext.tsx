import React, { createContext, useState } from "react";

interface contextType {
    event: any | null;
    setEvent: void
}

export const EventContext = createContext<contextType>({
    event: null,
    setEvent: undefined
});

export const EventContextProvider: React.FC = ({ children }) => {

    const setLanguage = (event: object) => {
        setState({ ...state, event: event });
    }

    const [state, setState] = useState<any>({
        event: null,
        setEvent: setLanguage
    });

    return (
        <EventContext.Provider value={state}>
            {children}
        </EventContext.Provider>
    )
}
