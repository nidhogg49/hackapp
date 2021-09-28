import Header from "./Header";
import { Container } from "@sberdevices/plasma-ui";
import styled from "styled-components";
// import { assistant } from "../assistant";

const ContainerStyled = styled(Container)`
    height: calc(100vh - 144px);
    display: flex;
    flex-direction: column;
`;

const Layout: React.FC = (props) => {
    // useEffect(() => {
    //     console.log(assistant);
    // }, []);

    return (
        <ContainerStyled>
            <Header />
            {props.children}
        </ContainerStyled>
    )
};

export default Layout;