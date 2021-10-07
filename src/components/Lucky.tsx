import { Button } from "@sberdevices/plasma-ui";
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import api from "../api/api";
import { EventContext } from '../context/eventContext';
import { eventData } from '../context/types'

const TikTokCarousel = styled.div`
    height: 100%;
    box-sizing: content-box;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
    scroll-snap-stop: always;
    &::-webkit-scrollbar {
        display: none;
      }
`;

const TikTokCarouselItem = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    scroll-snap-align: start;
    background-repeat: no-repeat;
    background-size: cover;
    justify-content: space-between;
    padding: 24px;
    box-sizing: border-box;
`;

const TikTokCarouselButtons = styled.div`
    display: flex;
    justify-content: space-around;
    
`;

const Lucky = () => {
    const [items, setItems] = useState([] as Array<eventData>);
    const [index, setIndex] = useState(0);
    const { event, setEvent } = useContext<any>(EventContext);

    const refTikTokCarousel = useRef<HTMLDivElement>(null);

    const handlerSkip = () => {
        setIndex(index + 1);
    };

    const handlerChoose = (i: number) => {
        setEvent({ ...items[i] });
        console.log('Lucky', event)
    };

    const getLucky = () => {
        api.get('event/lucky')
            .then((resp) => {
                console.count('lucky');
                console.log(resp);

                setItems(() => [...items, resp.data]);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        getLucky();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index]);

    useLayoutEffect(() => {
        if (refTikTokCarousel.current) {
            refTikTokCarousel.current.style.scrollBehavior = 'smooth';
            refTikTokCarousel.current.scrollTop = refTikTokCarousel.current.scrollHeight;
        }
    });

    return (
        <TikTokCarousel ref={refTikTokCarousel}>
            {
                items.map((el, i) => {
                    return (
                        <TikTokCarouselItem style={{ backgroundImage: `url(${items[i].images[0].image})` }} key={i}>
                            <h4>{el.title}</h4>
                            <TikTokCarouselButtons>
                                <Button onClick={handlerSkip} size="s" view="secondary">Пропустить</Button>
                                <Link to='/Card'>
                                    <Button onClick={() => handlerChoose(i)} size="s" view="primary">Выбрать</Button>
                                </Link>
                            </TikTokCarouselButtons>
                        </TikTokCarouselItem>)
                })
            }
        </TikTokCarousel>
    )
};

export default Lucky;