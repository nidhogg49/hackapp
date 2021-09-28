import { Button, Carousel, CarouselItem } from "@sberdevices/plasma-ui";
import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
    min-height: 0;
`;

const StyledCarouselItem = styled(CarouselItem)`
    background: red;
    display: flex;
    flex-direction: column;
    justify-content: end;
`;

const items = ['item', 'item', 'item', 'item', 'item', 'item'];

const Search: React.FC = () => {
    const [index, setIndex] = React.useState(0);
    console.log(index);

    const handlerSkip = () => {
        if (index < items.length - 1) {
            setIndex(index + 1);
        } else {
            setIndex(0);
        }
    };

    return (
        <StyledDiv>
            <Carousel
                axis="y"
                index={index}
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
                                <Button onClick={handlerSkip} size="s" view="secondary">Пропустить</Button>
                                <Button onClick={handlerSkip} size="s" view="primary">Выбрать</Button>
                            </StyledCarouselItem>
                        )
                    })
                }
            </Carousel>
        </StyledDiv>
    )
};

export default Search;