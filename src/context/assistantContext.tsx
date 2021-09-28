import { createSmartappDebugger } from "@sberdevices/assistant-client";
import React, { createContext, useEffect, useState, useRef } from "react";

const state = {};
const assistantInstance = createSmartappDebugger({
    token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4MzY0MGY0MjQwY2NhZDc3ODZjYmFkYjUzN2NjMTJjY2NmMzQ4NjcwZGNkYjQ1OTY2MWNkYjIyMDcyZDk1YzQyNTM5YmU5MjcwMDQyNjI5OCIsImF1ZCI6IlZQUyIsImV4cCI6MTYzMjkwMDc3MCwiaWF0IjoxNjMyODE0MzYwLCJpc3MiOiJLRVlNQVNURVIiLCJ0eXBlIjoiQmVhcmVyIiwianRpIjoiMTI0OWM0YjAtYjNkMS00OTU5LThmNGMtNjMzZDg3MjJlNjcwIiwic2lkIjoiNGZkMTA3NjYtZDgxZS00NGE2LThhZmQtZmQzZjk5YmYwYWRjIn0.LDCTtudE89AG-L9RWf7YbU8MTriXmlIFs85Y1I10f1MqCNhU_ncWeOW-sLbFi1LIc6ACDCY3kXrKkyzNUJJ0vH3x7gcR9nn7Ky27vA1d8JT4zNd0cEr-G2m-IF7_bH-ux8t5JkB90fIL4oCqCfdsBlXqUMOTIwLAK9q2ZeTo_dVbP3tDfjt_SnbxUH_T6bCa8xwIB6Sr0a86ezBP8Qlk1mC6yCaqY76dWPkJ8ihlJCEn_29V1WXuVQHJ23XZgUIA7obqwrqRjBGhWYUNnoqgyESatoatbhItuZd51cq_NQkkb_gO3REirw3gPPmndyeEW2RiP63pwuQJrrLEHDg6QH0JQq1I8K9rooBEq5NOlcp-Arl876Z6n2ueBItbOjEIPXgsdnPP0dbqMzYI4ERJufgxn3jOp_ZXohzl1D2kTt3rr7eTI5xNeLNiWvJwQF93zAJRJLcbbRGRq4y8nBeppIVxcE_3VB3u_taeZWbWv3mkly7JtQEDaaQzCzKhwWDJXgoNpB-A6fF9dox1T6PtVhI7pHmoLuMA0ZljCn_SyVNw2MD-n_gEkRA1UroJmU4GsVD1Mb1BZLfKjt2LQLBf4-JLC3eEa2bM9jHiVwvxhLV7WbSZL917ye6Zfz2K55A6hTcE1Z3aYmxcRc42hqFb86vL38N78e2at2tr1lBMS4A',
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
