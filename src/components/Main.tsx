import { Button, Card, CardBody, CardContent, Headline3, TextBox, TextBoxSubTitle, TextBoxTitle } from "@sberdevices/plasma-ui";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import api from "../api/api";
import { EventContext } from '../context/eventContext';
import TinderCard from "react-tinder-card";
import { IconClock } from "@sberdevices/plasma-icons";

const StyledCard = styled(Card)`
    width: 100%;
    height: 100%;
    position: relative;
    &:before {
        content: '',
        position: absolute;
        top: 0;
        left: 0;
        background: linear-gradient(180deg, rgba(8, 8, 8, 0) 0%, #080808 90.82%);
    }
`;

const StyledCardContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;

    .swipe {
        position: absolute;
    }

    .swipe,
    .swipe > div {
        height: 100%;
        width: 100%;
    }
`;

const iconStyles = 'vertical-align: middle; margin-right: 8px;';

const StyledIconClockFilled = styled(IconClock)`${iconStyles}`;

const StyledTextBoxSubTitle = styled(TextBoxSubTitle)`
    margin-top: 8px;
`;


declare type Direction = 'left' | 'right' | 'up' | 'down'


const Main = () => {
    const [items, setItems] = useState([] as Array<any>);
    const [index, setIndex] = useState(0);
    const { event, setEvent } = useContext<any>(EventContext);
    const [lastDirection, setLastDirection] = useState<Direction>();

    const swiped = (direction: Direction) => {
        setLastDirection(direction)
        console.log(direction);
    }

    const onCardLeftScreen = (direction: Direction, index: number) => {
        if (direction === 'left') {
            handlerSkip();
        } else {
            handlerChoose(index);
        }
    }

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

    const getGrowth = () => {
        api.get('api/stub/v1/pulse/my-growth')
            .then((resp) => {
                console.count('growth');
                console.log('growth', resp);

                setItems(() => [...items, ...resp.data]);
            })
            .catch((err) => {
                console.log('err', err);
            });
    }

    const handlerSkip = () => {
        console.log('handlerSkip');
        setIndex(index + 1);
        getLucky();
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

                // setItems(() => [...items, resp.data]);
            })
            .catch((err) => {
                console.log('err', err);
            });

        console.log('Lucky', event)
    };

    useEffect(() => {
        getGrowth();
    });

    const CardGrowth: React.FC<any> = ({ item, i }) => {
        return (
            <TinderCard className='swipe' onSwipe={(dir) => swiped(dir)} onCardLeftScreen={(dir) => onCardLeftScreen(dir, i)} key={item.name}>
                <StyledCard tabIndex={0} style={{ background: `url(${item.imageUrl}) center center / cover no-repeat` }}>
                    <CardBody>
                        <CardContent cover>
                            <TextBox>
                                <Headline3>{item.name}</Headline3>
                                <TextBoxSubTitle>{item.tags.map((el: string, i: number) => (`${el} ${i === (items.length - 1) ? '' : '• '}`))}</TextBoxSubTitle>
                                {item.duration > 0 &&
                                    <StyledTextBoxSubTitle><StyledIconClockFilled size='s' color="#09A552" />{item.duration} мин.</StyledTextBoxSubTitle>}
                                <TextBoxTitle>{((item.description).length > 103) ?
                                    (((item.description).substring(0, 103 - 3)) + '...') :
                                    item.description}
                                </TextBoxTitle>
                            </TextBox>
                            <Link to="/card">
                                <Button
                                    text="Ознакомиться"
                                    view="primary"
                                    size="s"
                                    scaleOnInteraction={false}
                                    outlined={false}
                                    stretch
                                    style={{ marginTop: '1em' }}
                                    tabIndex={-1} />
                            </Link>
                        </CardContent>
                    </CardBody>
                </StyledCard>
            </TinderCard>
        )
    }

    const CardLucky: React.FC<any> = ({ item, i }) => {
        return (
            <TinderCard className='swipe' onSwipe={(dir) => swiped(dir)} onCardLeftScreen={(dir) => onCardLeftScreen(dir, i)} key={item.name}>
                <StyledCard tabIndex={0} style={{ background: `url(${item}) center center / cover no-repeat` }}>
                    <CardBody>
                        <CardContent cover>
                            <TextBox>
                                <Headline3>{item.name}</Headline3>
                                <TextBoxSubTitle>{item.tags.map((el: string, i: number) => (`${el} ${i === (items.length - 1) ? '' : '• '}`))}</TextBoxSubTitle>
                                {item.duration > 0 &&
                                    <StyledTextBoxSubTitle><StyledIconClockFilled size='s' color="#09A552" />{item.duration} мин.</StyledTextBoxSubTitle>}
                                <TextBoxTitle>{((item.description).length > 103) ?
                                    (((item.description).substring(0, 103 - 3)) + '...') :
                                    item.description}
                                </TextBoxTitle>
                            </TextBox>
                            <Link to="/card">
                                <Button
                                    text="Ознакомиться"
                                    view="primary"
                                    size="s"
                                    scaleOnInteraction={false}
                                    outlined={false}
                                    stretch
                                    style={{ marginTop: '1em' }}
                                    tabIndex={-1} />
                            </Link>
                        </CardContent>
                    </CardBody>
                </StyledCard>
            </TinderCard>
        )
    }

    return (
        <StyledCardContainer className='cardContainer'>
            {items.length > 0 &&
                items.map((item: any, i: number) => {
                    switch (item?.type) {
                        case "growth":
                            return (<CardGrowth item={item} i={i} />);
                        default:
                            return (<CardLucky item={item} i={i} />);
                    }
                })
            }
        </StyledCardContainer>
    )
};

export default Main;