import React from "react";
import styled from "styled-components";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const StyledDiv = styled.div`
    min-height: 0;
`;

type data = {
    description: string;
}

const Random: React.FC = () => {

    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [data, setData] = useState<data>({} as data);

    useEffect(() => {
        setError(false);
        setLoading(true);

        axios.get('http://46.243.143.219/assistant/api/v1/lucky')
            .then(function (response) {
                // handle success
                console.log(response);
                setData(response.data);
                setLoading(false);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }, []);

    if (isError) return <h1>Error</h1>
    if (isLoading) return <h1>Loading</h1>
    return (
        <StyledDiv>
            <div>
                {data.description}
            </div>
        </StyledDiv>
    )
};

export default Random;