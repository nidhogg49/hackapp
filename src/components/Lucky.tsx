import { Button } from "@sberdevices/plasma-ui";
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import api from "../api/api";
import { EventContext } from '../context/eventContext';
import { definitions } from '../api/typesAPI'

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
    const [items, setItems] = useState([] as Array<definitions['Event']>);
    const [index, setIndex] = useState(0);
    const { event, setEvent } = useContext<any>(EventContext);

    const refTikTokCarousel = useRef<HTMLDivElement>(null);

    const handlerSkip = () => {
        setIndex(index + 1);
    };

    const handlerChoose = (i: number) => {
        setEvent({ ...items[i] });

        api.post('api/v1/route')
            .then((resp) => {
                console.log('route', resp.data);

                const routeId: number = resp.data.id;

                api({
                    method: 'post',
                    url: 'api/v1/route-event',
                    data: { ...items[i] },
                    params: {
                        routeId: routeId
                    }
                })
                    .then((resp) => {
                        console.log('route-event', resp);

                        const getCurrentPositionSuccess = (location: any) => {
                            console.log(location);

                            api({
                                method: 'get',
                                url: 'api/v1/route/distance',
                                params: {
                                    currentLat: location.coords.latitude,
                                    currentLon: location.coords.longitude,
                                    routeId: routeId
                                }

                            })
                                .then((resp) => {
                                    console.log('asdadsadsadfewvrebgb', resp);
                                });
                        };

                        window.navigator.geolocation.getCurrentPosition((location) => { getCurrentPositionSuccess(location) }, (err) => { console.log('getCurrentPosition', err) });
                    })
                    .catch((err) => {
                        console.log('err', err);
                    });

                //setItems(() => [...items, resp.data]);
            })
            .catch((err) => {
                console.log('err', err);
            });

        console.log('Lucky', event)
    };

    const getLucky = () => {
        api.get('api/event/v1/lucky')
            .then((resp) => {
                console.count('lucky');
                console.log(resp);

                setItems(() => [...items, resp.data]);
            })
            .catch((err) => {
                console.log('err', err);
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
                        <TikTokCarouselItem style={{ backgroundImage: `url(${items[i].imageUrl})` }} key={i}>
                            <h4>{el.name}</h4>
                            <TikTokCarouselButtons>
                                <Button onClick={handlerSkip} size="s" view="secondary">Пропустить</Button>
                                {/* <Link to='/Card'> */}
                                <Button onClick={() => handlerChoose(i)} size="s" view="primary">Выбрать</Button>
                                {/* </Link> */}
                            </TikTokCarouselButtons>
                        </TikTokCarouselItem>)
                })
            }
        </TikTokCarousel>
    )
};

export default Lucky;