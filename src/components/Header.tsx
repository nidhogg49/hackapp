import { IconSearch } from "@sberdevices/plasma-icons";
import { ActionButton, HeaderBack, HeaderContent, HeaderRoot, HeaderSubtitle, HeaderTitle, HeaderTitleWrapper } from "@sberdevices/plasma-ui";
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
                <HeaderSubtitle>Салют,</HeaderSubtitle>
                <HeaderTitle>Чем займемся?</HeaderTitle>
            </HeaderTitleWrapper>
            <HeaderContent>
                <StyledLink to="/search">
                    <ActionButton pin="circle-circle">
                        <IconSearch />
                    </ActionButton>
                </StyledLink>
            </HeaderContent>
        </HeaderRoot >
    );
}

export default Header;
