import { createSmartappDebugger } from "@sberdevices/assistant-client";
import React, { createContext, useEffect, useState, useRef } from "react";

const state = {};
const assistantInstance = createSmartappDebugger({
    token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4MzY0MGY0MjQwY2NhZDc3ODZjYmFkYjUzN2NjMTJjY2NmMzQ4NjcwZGNkYjQ1OTY2MWNkYjIyMDcyZDk1YzQyNTM5YmU5MjcwMDQyNjI5OCIsImF1ZCI6IlZQUyIsImV4cCI6MTYzMzUwNDIzOCwiaWF0IjoxNjMzNDE3ODI4LCJpc3MiOiJLRVlNQVNURVIiLCJ0eXBlIjoiQmVhcmVyIiwianRpIjoiY2IyZmI1OWYtMWY3OS00NTllLWI3MDctODYzZTQ0OWFjOWFmIiwic2lkIjoiYmE1NmM0YzAtMDY5ZC00YTA4LTg0MzQtZGNmMGQ0ZWYzNTg1In0.ErheEFZ_ckDMSikaUTSW2MwTl41gIorlaPEbWSRdp_umCIqCt200PANbT5mBX02KrAxnCywbF9SjGqot8BrZzvNPdjcFacV2I9FllTKiRI6Al0H_tBKZ7PTYMxSP4uap1XtxR1yD0MwRvwU1KO0grWJ3dNZLas1eQOug1rObLkiv7FGYF8DMgt6MSqMjd55oUprSglbOcnLbBc9EIAM3FctIldT9NUq6RK0kfJMuWpyors6GuA7pDgO2VbkKTHbNNV0ThnPbEE2j2ZnNfjLGY8v-3FLm_wBQPXYcTuuIvTDPpBU3MG-REhgGz-MIEig5O-c6hBlmnG2p8sW0mcXrZGjVsofio3pqYko07UBnVjRg2e22jtVQimUWqbv5ZobjIK-c9N06GuySSf62ZgcQbKT7oxTxPHgtjQJ3ais2MjFkAnZ6YITo6J3TBsimgTrqrcPE4S3NNf0cEvmuqlr_yTT5xL8OPLmTAmCc--CPcIz5W2KZ3CphDMM7xJ1GeK0Ae72c4_KIz1ZbBtGrKLNJhQIQeE9eMFkmg1A8iCEZhe3dvi--aOlvq3rseUFclzPcUg1YdzfOcfmBVAJvpyNWlLnlCG957M4ykKQ8vluVBpaSfWnUvJgruWw1Mxai9bWB75Ky7HlaUUBUcX1pyDAMKkhJs5KyKOfK9fOpxVumExA',
    initPhrase: `Запусти Чем заняться?`,
    getState: () => state
});
export const AssistantContext = createContext<{
    instance: any;
    data: any | null;
}>({
    instance: assistantInstance,
    data: null
});

export const AssistantProvider: React.FC = ({ children }) => {
    const assistant = useRef(assistantInstance);
    const [data, setData] = useState<any | null>(null);

    useEffect(() => {
        assistant.current.on('data', (data) => {
            setData(data);
        });
    }, []);

    return (
        <AssistantContext.Provider value={{
            instance: assistant,
            data
        }}>
            {children}
        </AssistantContext.Provider>
    );
};
