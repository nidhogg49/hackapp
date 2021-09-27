import { Carousel, CarouselItem } from "@sberdevices/plasma-ui";
import styled from "styled-components";

const StyledDiv = styled.div`
    height: calc(100vh - 96px);
`;

const StyledCarouselItem = styled(CarouselItem)`
    height: calc(100vh - 96px);
    background: red;
    border: 2px solid black;
    box-sizing: border-box;
`;

const items = ['item', 'item', 'item', 'item', 'item', 'item'];

const Search: React.FC = () => (
    <StyledDiv>
        <Carousel
            axis="y"
            index={0}
            scrollAlign="center"
            scrollSnapType="mandatory"
            detectActive
            detectThreshold={0.5}
        >
            {
                items.map((el, i) => {
                    return (
                        <StyledCarouselItem
                            key={i}
                            className="special"
                            scrollSnapAlign="center"
                        >
                            {el + i}
                        </StyledCarouselItem>
                    )
                })
            }
        </Carousel>
    </StyledDiv>
);

export default Search;