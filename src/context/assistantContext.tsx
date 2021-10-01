import { createSmartappDebugger } from "@sberdevices/assistant-client";
import React, { createContext, useEffect, useState, useRef } from "react";

const state = {};
const assistantInstance = createSmartappDebugger({
    token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlYTE5OTY0NzdkMTM4ZTZiMmM5YTI5ZTM4ZjY5OTgzNzkxYzQ3NjRkYmNmYmJiNzUzYzcxNGI0MThlMTE0NmM4NTM5YmU5MjcwMDQyNjI5OCIsImF1ZCI6IlZQUyIsImV4cCI6MTYzMzEyNDg1NiwiaWF0IjoxNjMzMDM4NDQ2LCJpc3MiOiJLRVlNQVNURVIiLCJ0eXBlIjoiQmVhcmVyIiwianRpIjoiMmI2MDUzNzAtNjhjMS00N2M0LTgwODMtZGVjZTNlYTljYWZmIiwic2lkIjoiM2FiMThlMTctOWZhNy00OTdmLWE2ODAtMDNlOWU5OTZlNDI0In0.eIVpMJWKejIQTLcI9qmVS3Mwqd9_r5oR10_Z4B_lDQU2SwrtFDi-RwSYaGneYsN2mwqJWxYBWLgcft5iHW8i0Bs8VcO9ZV7muAA23jtPofJGh2f9K8OEtzNndnaGkzXegWMzn7g4wpG9QxuaHRr6X5gINEtY013GrZfd7boElMR_Z-ZMHTWJegWYdgxkwjXPZuql8DsLs7YSQfhy90U8pafYM6A610vSrVskZBQKcxeXVaofK2_QI_5-9p4uhb1ZBt1_RFcgsBDRR3SCRygCSSV3CPEa-fzAPChZ2oX9mLIhguANRD1s_EOzYWIqL_Y3PW4TfJqXXogZeVuCokWrrCcENE1S7zp1hkV-wPb6dB-Uje99pa6bLawR5nmCam0cQFyb7wcLXQjdlQhIFlM5C_AcYzQFyVVij229w8645xjmjoejLVI5wjG87e0s6x_INd14fYvUcV2e5R-o3b6G3rvY2mk700y3uCjuCOwTzIYtX03tm6N82a3TOUhSG-Osbh7KAEMN3SyHKClS9dQW7HTabc821Y83EZUpghvKu7bOhy5n-ItMYMrbfJM6L3IYyPCcyK3wIepoVLdZRQZ2m-fTUZ0bBPnqe070y9jhalgfgvr7QrkrCbWk3aqgOMrhCNeM4XCauogTYfH-k3Xf_zLMEETF6lt8wrslQCVMf44',
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
