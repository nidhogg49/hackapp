import { Button } from "@sberdevices/plasma-ui";
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { PersonContext } from "../context/personContext";
import { eventData } from '../context/types';
import user from '../mocks/users';
import TinderCard from 'react-tinder-card';

declare type Direction = 'left' | 'right' | 'up' | 'down'

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


const RandomCoffee: React.FC = () => {
    const history = useHistory();
    const [lastDirection, setLastDirection] = useState<Direction>();
    const swiped = (direction: Direction) => {
        setLastDirection(direction)
        console.log(direction);
    }

    const [items, setItems] = useState([] as Array<eventData>);
    const [index, setIndex] = useState(0);
    const { setPerson } = useContext<any>(PersonContext);

    const refTikTokCarousel = useRef<HTMLDivElement>(null);

    const handlerSkip = () => {
        setIndex(index + 1);
    };

    const handlerChoose = (i: number) => {
        setPerson({ ...items[i] });
        history.push("/Person");
    };

    const getPerson = () => {
        const randomElement = user[Math.floor(Math.random() * user.length)];
        setItems(() => [...items, randomElement]);
    }

    useEffect(() => {
        getPerson();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index]);

    useLayoutEffect(() => {
        if (refTikTokCarousel.current) {
            refTikTokCarousel.current.style.scrollBehavior = 'smooth';
            refTikTokCarousel.current.scrollTop = refTikTokCarousel.current.scrollHeight;
        }
    });

    const onCardLeftScreen = (direction: Direction,index: number) => {
        if (direction == 'left')
            handlerSkip();
        else 
            handlerChoose(index);
    }

    return (
        <TikTokCarousel ref={refTikTokCarousel}>
            {
                items.map((el, i) => {
                    return (
                        <div className='cardContainer'>
                            <TinderCard onSwipe={(dir) => swiped(dir)} onCardLeftScreen={(dir) => onCardLeftScreen(dir,i)}  flickOnSwipe preventSwipe={["up","down"]}>
                                <TikTokCarouselItem style={{ backgroundImage: `url(${items[i].images[0].image})` }} key={i}>
                                    <h4>{el.title}</h4>
                                </TikTokCarouselItem>
                            </TinderCard>
                            <TinderCard onSwipe={(dir) => swiped(dir)} onCardLeftScreen={(dir) => onCardLeftScreen(dir,i)}  flickOnSwipe preventSwipe={["up","down"]}>
                                <TikTokCarouselItem style={{ backgroundImage: `url(${items[i].images[0].image})` }} key={i}>
                                    <h4>{el.title}</h4>
                                </TikTokCarouselItem>
                            </TinderCard>
                        </div>
                    )
                })
            }
        </TikTokCarousel>
        
    )
};

export default RandomCoffee;