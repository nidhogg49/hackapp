import Header from "./Header";
import { Container } from "@sberdevices/plasma-ui";
import styled from "styled-components";
import Router from './Router';
import { AppContext } from "../context/context";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ContainerStyled = styled(Container)`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const WrapperStyled = styled.div`
    height: calc(100vh - 144px);
    overflow-y: auto;
    overflow-x: hidden;
    flex-grow: 1;
    padding-bottom: 144px;
        &::-webkit-scrollbar {
            display: none;
        }
  
`;

const Layout = () => {
    const { pathname } = useLocation();
    const WrapperStyledRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    useEffect(() => {
        WrapperStyledRef.current.scrollTo(0, 0);
        console.log('WrapperStyledRef', WrapperStyledRef);
    }, [pathname]);

    return (
        <ContainerStyled>
            {window.location.pathname !== '/' && <Header />}
            <WrapperStyled ref={WrapperStyledRef}>
                <AppContext.Consumer>
                    {
                        ({ authenticated }) => {
                            if (authenticated) {
                                return <Router />
                            }
                            return <h1>Необходимо войти с систему</h1>
                        }
                    }
                </AppContext.Consumer>
            </WrapperStyled>
        </ContainerStyled>
    )
};

export default Layout;
