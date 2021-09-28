import Header from "./Header";
import { Container } from "@sberdevices/plasma-ui";
import styled from "styled-components";

const ContainerStyled = styled(Container)`
    height: calc(100vh - 144px);
    display: flex;
    flex-direction: column;
`;

const Layout: React.FC = (props) => {
    return (
        <ContainerStyled>
            <Header />
            {props.children}
        </ContainerStyled>
    )
};

export default Layout;