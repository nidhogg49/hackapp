import { createSmartappDebugger } from "@sberdevices/assistant-client";
import React, { createContext, useEffect, useState, useRef } from "react";

const state = {};
const assistantInstance = createSmartappDebugger({
    token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4MzY0MGY0MjQwY2NhZDc3ODZjYmFkYjUzN2NjMTJjY2NmMzQ4NjcwZGNkYjQ1OTY2MWNkYjIyMDcyZDk1YzQyNTM5YmU5MjcwMDQyNjI5OCIsImF1ZCI6IlZQUyIsImV4cCI6MTYzMzE1OTgzNywiaWF0IjoxNjMzMDczNDI3LCJpc3MiOiJLRVlNQVNURVIiLCJ0eXBlIjoiQmVhcmVyIiwianRpIjoiZDU3ZDQ4OGUtOTIwNy00NTc3LWIwZjctMzUxMzNhODg0ZjE1Iiwic2lkIjoiZjJmZDg0ODMtNDEwZS00ZThlLWE4Y2QtMjhkYWEyNThlYWVlIn0.c7Sc9HsVKigr3ugUB-anDsFdPe3Z1BO2qxyvYmtu9F12a8VSI5vob5nOTlNlRf2-Q6hVLFmXyV562-zIdC9qVzat4ILK3DEFEmNgKWHTUWHSF_WD3Ew8PmNJl-zb8YOtDE8SvfRwM3ZPM4tQhSvl-JPq1BeRLCu1mWSNMcahvNpcT3hMsvZGIZqLBB-fXDjwWDteVDxZWoHeW7yIFwszYgmXD3UVxeJFWaWIZ3psa3VwcWyu1mRV1fxjLeOO2_Sila_Cb5gJmoYQuxtZxFNo4T4QQS7NA5tkwP-o8jZ1smJlZ9NUOgFrI3pK_lIMt8mW7oQ6syJ-p_4-oeH97mCSX1Cw-Pct7fr_xlf_hPWZMilOqteBa6-ZkR2yYY1Us1P-5__krZczvESSOFdSdmKzNNF-AJLmvCnKOoKBwOT-0ykytE4VgqBUwFGauvsKH4WSbOMfU3ZjJOUuho8FjCnU2g4squEiVY8eF9cV0R5UcczL9N57wrPhcZ1VtcWgeQGtMOKszRvWMFxXmmk9bGj6ThFRGnfDk-OnwR42Fc4xNSgxTyWF6s7NLDvpOl8zCrwlay8AcfeqKRXzAikoWMlrCSa0Aju3cqcou-kdOOF358nBtqKrt5ZXwdnHshgmN5L6Zjb3iASlZY6O8wjd7S9PreuLw2q89fS5pnR5CLec3Mc',
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
