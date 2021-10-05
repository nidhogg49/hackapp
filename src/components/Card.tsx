import { Card, CardBody, CardContent, CardMedia, CardParagraph1, Col, TextBox, TextBoxBigTitle, TextBoxSubTitle } from "@sberdevices/plasma-ui";
import { EventContext } from "../context/eventContext";

const MyCard = () => {
    return (
        <EventContext.Consumer>
            {
                ({ event }) => {
                    if (event) {
                        return (<Col sizeS={4} sizeM={6} sizeL={8} sizeXL={8}>
                            <Card>
                                <CardBody>
                                    <CardMedia
                                        src={event.images[0].image || ''}
                                        placeholder={event.images[0].image || ''}
                                        ratio="1 / 1"
                                    />
                                    <CardContent cover>
                                        <TextBox>
                                            <TextBoxBigTitle>{event.title}</TextBoxBigTitle>
                                            <TextBoxSubTitle>{event.price}</TextBoxSubTitle>
                                            <CardParagraph1 mt="6x" lines={4}>
                                                {event.description}
                                            </CardParagraph1>
                                            <TextBoxSubTitle>с {new Date(parseFloat(event.dates[0].start) * 1000).toString()} по {new Date(parseFloat(event.dates[0].end) * 1000).toString()}</TextBoxSubTitle>
                                        </TextBox>
                                    </CardContent>
                                </CardBody>
                            </Card>
                        </Col>)
                    }
                    return <h1>Loading</h1>
                }
            }
        </EventContext.Consumer>
    );
}

export default MyCard;