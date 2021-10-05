import { Button, Card, CardBody, CardContent, CardMedia, Col, Row, TextBox, TextBoxBigTitle, TextBoxSubTitle } from "@sberdevices/plasma-ui";
import { Link } from "react-router-dom";
import styled from "styled-components";
import img1 from '../img/320_320_0.jpeg'
import img2 from '../img/320_320_2.jpeg'

const StyledCard = styled(Card)`
    width: 100%;
`;

const Main: React.FC = () => (
    <Row>
        <Col sizeS={6} sizeM={6} sizeL={6} sizeXL={6} type="rel">
            <StyledCard tabIndex={0}>
                <CardBody>
                    <CardMedia
                        src={img1}
                        placeholder={img1}
                        ratio="1 / 1"
                    />
                    <CardContent cover>
                        <TextBox>
                            <TextBoxBigTitle>Выбор случайного события</TextBoxBigTitle>
                            <TextBoxSubTitle>Испытай удачу</TextBoxSubTitle>
                        </TextBox>
                        <Link to="/lucky">
                            <Button
                                text="Мне повезет!"
                                view="primary"
                                size="s"
                                scaleOnInteraction={false}
                                outlined={false}
                                stretch
                                style={{ marginTop: '1em' }}
                                tabIndex={-1}
                            />
                        </Link>
                    </CardContent>
                </CardBody>
            </StyledCard>
        </Col>

        <Col sizeS={6} sizeM={6} sizeL={6} sizeXL={6} type="rel">
            <StyledCard>
                <CardBody>
                    <CardMedia
                        src={img2}
                        placeholder={img2}
                        ratio="1 / 1"
                    />
                    <CardContent cover>
                        <TextBox>
                            <TextBoxBigTitle>Чем заняться осенью?</TextBoxBigTitle>
                            <TextBoxSubTitle>События, места и т.д.</TextBoxSubTitle>
                        </TextBox>
                    </CardContent>
                </CardBody>
            </StyledCard>
        </Col>
    </Row>
);

export default Main;