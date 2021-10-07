import { Card, CardBody, CardContent, CardMedia, CardParagraph1, Col, TextBox, TextBoxBigTitle, TextBoxSubTitle } from "@sberdevices/plasma-ui";
import { PersonContext } from "../context/personContext";

const Person = () => {
    return (
        <PersonContext.Consumer>
            {
                ({ person }) => {
                    if (person) {
                        return (<Col sizeS={4} sizeM={6} sizeL={8} sizeXL={8}>
                            <Card>
                                <CardBody>
                                    <CardMedia
                                        src={person.images[0].image || ''}
                                        placeholder={person.images[0].image || ''}
                                        ratio="1 / 1"
                                    />
                                    <CardContent cover>
                                        <TextBox>
                                            <TextBoxBigTitle>{person.title}</TextBoxBigTitle>
                                            <TextBoxSubTitle>{person.price}</TextBoxSubTitle>
                                            <CardParagraph1 mt="6x" lines={4}>
                                                {person.description}
                                            </CardParagraph1>
                                            <TextBoxSubTitle>с {new Date(parseFloat(person.dates[0].start) * 1000).toString()} по {new Date(parseFloat(person.dates[0].end) * 1000).toString()}</TextBoxSubTitle>
                                        </TextBox>
                                    </CardContent>
                                </CardBody>
                            </Card>
                        </Col>)
                    }
                    return <h1>Loading</h1>
                }
            }
        </PersonContext.Consumer>
    );
}

export default Person;