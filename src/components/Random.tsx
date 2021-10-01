import React from "react";
import styled from "styled-components";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const StyledDiv = styled.div`
    min-height: 0;
`;

const Random: React.FC = () => {

    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () =>{
            setError(false);
            setLoading(true);

            try{
                const response = await axios("http://46.243.143.219/assistant/api/v1/lucky");

                setData(response.data);
                console.log(JSON.stringify(response.data));
            } catch (error){
                console.log("error");
                setError(true);
            }
            setLoading(false);
        };
        fetchData();
    },[]);
    
    if (isError) return <h1>Error</h1>
    if (isLoading) return <h1>Loading</h1>
    return (
        <StyledDiv>
            <div>   
                {JSON.stringify(data)}
            </div>
        </StyledDiv>
    )
};

export default Random;