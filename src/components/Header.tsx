import { HeaderBack, HeaderRoot, HeaderTitle, HeaderTitleWrapper } from "@sberdevices/plasma-ui";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const Header: React.FC = function () {
    return (
        <HeaderRoot>
            <StyledLink to="/">
                <HeaderBack />
            </StyledLink>
            <HeaderTitleWrapper>
                <HeaderTitle>Чем займемся?</HeaderTitle>
            </HeaderTitleWrapper>
        </HeaderRoot >
    );
}

export default Header;
