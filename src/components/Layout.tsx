import Header from "./Header";
import { Container } from "@sberdevices/plasma-ui";
import { body1 } from "@sberdevices/plasma-tokens";
import styled from "styled-components";

const ContainerStyled = styled(Container)`
    ${body1}
`;

const Layout: React.FC = (props) => (
    <ContainerStyled>
        <Header />
        {props.children}
    </ContainerStyled>
);

export default Layout;