import { createSmartappDebugger } from "@sberdevices/assistant-client";
import React, { createContext, useEffect, useState, useRef } from "react";

const state = {};
const assistantInstance = createSmartappDebugger({
    token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4MzY0MGY0MjQwY2NhZDc3ODZjYmFkYjUzN2NjMTJjY2NmMzQ4NjcwZGNkYjQ1OTY2MWNkYjIyMDcyZDk1YzQyNTM5YmU5MjcwMDQyNjI5OCIsImF1ZCI6IlZQUyIsImV4cCI6MTYzMzY4MzA3MywiaWF0IjoxNjMzNTk2NjYzLCJpc3MiOiJLRVlNQVNURVIiLCJ0eXBlIjoiQmVhcmVyIiwianRpIjoiNWE4YmM0OTUtMjFmMy00M2JkLWE0MTItYjEyMzkwYzE4MWIyIiwic2lkIjoiZmIwNGNhOWItZmQwMi00ZTNkLThiNDItNWQ4ZGNjZmNkZWYwIn0.cLJMWAvpZmWzBEilOuSsk8l_w5HTJeI5RgL0wUKUdoGrnI9nqN0C71Sm1DwS-KsiejSlUQSTkchD9MTQOLLWI8xW1Dh3VtC3-d73LXbi4-zdu3yWxyNlx2WKPP8SkYGDIk_VklBxOeqEJmEO7-OKdGyE590DYNLsHOBs_tanwZAJhLXLvtYh-VhUaCUIXZkucZN-C8Q5pkL5AvKt4xWnrxRhRS_W_uAH7LAtKCLeVw57PmPItb4Du4EfVqQO0Fb32oWTIz38fzap6-bNtGb5ryrcel3LXbae_hNE7_dgoEUkOUf73Ejtun8lMfKrWubo7PvZ4Xzp7sEDUTm1f8bATkyNKVLdYm3Zsiiar5hnhgH9cENIvcDOJNYKtjtS8oW-INjCqUVrrimyAL-LfrYPQQhEZE3RHgQMvxTSM3ddBCMHcz6n7YUVFtOGJlbDWUj80qeP4zb7IfCarNvHHUGDL9P55NevO9iMemod5s6cYmiY41I1ANsGzcqn62ywpCZ2mV8zZtIhtgMUtYMhlV_JtdcwaXjmROazCl6QUXDk_aefnlaV90UIBng2asc3k45USWQtj3TAwM3NtWC7QPGmBlspV_bAlMGDBvZbTIJB7JS6Z9opWusVL9dqqI0IWbJ3RFaTCca7QWbq4tutaT_MEwKHe51rHdSksB-itmdLkq0',
    initPhrase: `Запусти Чем заняться?`,
    getState: () => state
});
export const AssistantContext = createContext<{
    instance: any;
    data: any | null;
    character: string;
}>({
    instance: assistantInstance,
    data: null,
    character: 'sber'
});

export const AssistantProvider: React.FC = ({ children }) => {
    const assistant = useRef(assistantInstance);

    const [data, setData] = useState<any | null>(null);
    const [character, setCharacter] = useState('sber');

    useEffect(() => {
        assistant.current.on('data', (data) => {
            console.log('Assistant', data);
            setData(data);

            if (data?.type === "character") {
                setCharacter(data.character.id);
            }
        });
    }, []);

    return (
        <AssistantContext.Provider value={{
            instance: assistant,
            data,
            character
        }}>
            {children}
        </AssistantContext.Provider>
    );
};
