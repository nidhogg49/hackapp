import Header from "./Header";
import { Container } from "@sberdevices/plasma-ui";
import styled from "styled-components";
import Router from './Router';
import { AppContext } from "../context/context";

const ContainerStyled = styled(Container)`
    height: calc(100vh - 144px);
    display: flex;
    flex-direction: column;
`;

const Layout = () => {
    return (
        <ContainerStyled>
            <Header />
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
        </ContainerStyled>
    )
};

export default Layout;