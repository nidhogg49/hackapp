import { createSmartappDebugger } from "@sberdevices/assistant-client";
import React, { createContext, useEffect, useState, useRef } from "react";

const state = {};
const assistantInstance = createSmartappDebugger({
    token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlYTE5OTY0NzdkMTM4ZTZiMmM5YTI5ZTM4ZjY5OTgzNzkxYzQ3NjRkYmNmYmJiNzUzYzcxNGI0MThlMTE0NmM4NTM5YmU5MjcwMDQyNjI5OCIsImF1ZCI6IlZQUyIsImV4cCI6MTYzMzc1ODIyMywiaWF0IjoxNjMzNjcxODEzLCJpc3MiOiJLRVlNQVNURVIiLCJ0eXBlIjoiQmVhcmVyIiwianRpIjoiMTY2ZGIyMjAtOTA5NC00NzM4LWE0YmMtODlmMDhhMTQ0YTViIiwic2lkIjoiMzY4MDI3NjMtN2QyOS00OGM2LWEwOTEtMGVmZGZhZWZmMmI0In0.SV6KWVe3Z4WxLE-pVlEz8ObGF2A5I44J8YOYKs9oLrMoNbYGtPXvGw2E9bjShSA_lw7snxtFg3lCgO_U69Rz2Y_4ueF0MAqVTa3dHGIj-QTGU097_OVM5XRnZhtUYSvPnc9Zrl5GOd7ih1GoibJ0w0BOAopWY-D3esZv5TftGBrcVMffQN6e_UgtW-S4r8gnOBS-KSiLXp0GH8FphtimdbVx7eTXFvQCFu-iXSDZamj0FQBw7LdYeoCmLdl4IEqhsXUZKhI1AwcU92qePczW3mFJUdgYNY7fyqqvwCNwxOKRQKKfiUshHoDVGg2rJ9WjTNRTzpgcFtSX8tmxarAr1y7EddmvQPa6M5UBykgizfRnyJtbat4L7GA6TOsC1VHa1CxzalgKMNoPWXfr7iX1zcTwZ6Yi6xNxCsX5PI6g7Hm9Ben9rPBtuBgukb0gGPiBAwZHFN3ncSGvtShJTHOVmPoJXkgtJo8dQRHd6EHCFOlf5nCYa_H4D9Qf3L81iXKrxHRlAaUZ_ifCRVguypbj07Ly1JMekShyxNdDYhOv_cbvKpiPZbGgaRYCgJ3KcLtChJsNcUMVp1Uu_6gtSL0tRC6zoJeDeIAKnQ3MZBf8-NEeg13IxhomC3RUrDIKpQGPqUVa6YQtQ9ryOxz4_o0pO-xXdUowkDHENdZ1fniQ0UI',
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
