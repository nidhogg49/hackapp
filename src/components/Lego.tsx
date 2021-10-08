import { Step, Stepper, StepLabel, StepContent } from '@material-ui/core';
import { IconBankCardAlt1, IconClock, IconLocation } from '@sberdevices/plasma-icons';
import { buttonSecondary } from '@sberdevices/plasma-tokens';
import { Card, CardBody, CardContent, CardMedia, TextBox, TextBoxSubTitle, Button, ActionButton, Headline3, Footnote1, TextBoxTitle } from '@sberdevices/plasma-ui';
import { Title } from '@sberdevices/plasma-ui/components/TextBox/TextBox';
import { useContext, useState } from 'react';
import styled from 'styled-components';
import { EventContext } from '../context/eventContext';
import img1 from '../img/320_320_0.jpeg'

const steps = [
    {
        label: 'Общее описание'
    },
    {
        label: 'Зачем мне это нужно'
    },
]

const steps2 = [0, 0, 1, 1];

const StyledCard = styled(Card)`
    width: 100%;
`;

const StyledCardMedia = styled(CardMedia)`
    height: 226px;
    overflow: hidden;
`;

const iconStyles = 'vertical-align: middle; margin-right: 8px;';

const StyledIconLocation = styled(IconLocation)`${iconStyles}`;
const StyledIconClockFilled = styled(IconClock)`${iconStyles}`;
const StyledIconTicket = styled(IconBankCardAlt1)`${iconStyles}`;

const StyledTextBoxSubTitle = styled(TextBoxSubTitle)`
    margin-top: 8px;
`;

const StyledStepper = styled(Stepper)`
    .MuiStepContent-root,
    .MuiStepConnector-root {
        margin-left: 15.5px;
    }

    .MuiStepContent-root,
    .MuiStepConnector-line {
        border-color: ${buttonSecondary};
    }

    .my-green-step .MuiStepLabel-iconContainer button {
        border: 1px solid #12A557;
    }

    .my-green-step .MuiStepContent-root,
    .my-green-step + .MuiStepConnector-root .MuiStepConnector-line {
        border-color: #12A557;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-around;
`;

const StyledTextBox = styled(TextBox)`
    margin-top: 8px;
`;

const timeIcon = (index: number) => (
    <ActionButton pin="circle-circle">
        {index}
    </ActionButton>
)

const Lego = () => {
    const [activeStep, setActiveStep] = useState(0);
    const { event, setEvent } = useContext<any>(EventContext);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handlerLabelClick = (index: number) => {
        setActiveStep(index);
    };

    const CardGrowth: React.FC<any> = () => {
        return (
            <StyledCard >
                <CardBody>
                    <StyledCardMedia
                        src={event.imageUrl}
                    >
                    </StyledCardMedia>
                    <CardContent cover={false}>
                        <TextBox>
                            <Headline3>{event.name}</Headline3>
                            <TextBoxSubTitle>{event.tags.map((el: string, i: number) => (`${el} ${i === (event.tags.length - 1) ? '' : '• '}`))}</TextBoxSubTitle>
                            {event.duration > 0 &&
                                <StyledTextBoxSubTitle><StyledIconClockFilled size='s' color="#09A552" />{event.duration} мин.</StyledTextBoxSubTitle>}
                            <TextBoxTitle>{((event.description).length > 103) ?
                                (((event.description).substring(0, 103 - 3)) + '...') :
                                event.description}
                            </TextBoxTitle>
                        </TextBox>
                        <StyledStepper activeStep={activeStep} orientation="vertical">
                            {steps.map((step, index: number) => (
                                <Step key={index} className={index <= activeStep ? 'my-green-step' : ''}>
                                    <StepLabel onClick={() => (handlerLabelClick(index))} StepIconComponent={() => (timeIcon(index + 1))}><Title>{step.label}</Title></StepLabel>

                                    <StepContent>
                                        <StyledTextBox>
                                            <Footnote1>{index === 0 ? event.description : event.knowledgeFor}</Footnote1>
                                        </StyledTextBox>

                                        <ButtonWrapper>
                                            {
                                                index !== 0 && <Button
                                                    text="Назад"
                                                    view="secondary"
                                                    size="s"
                                                    scaleOnInteraction={false}
                                                    outlined={false}
                                                    stretch
                                                    style={{ marginTop: '1em', marginRight: '1em' }}
                                                    tabIndex={-1}
                                                    onClick={handleBack}
                                                />
                                            }
                                            <Button
                                                text="Продолжить"
                                                view="primary"
                                                size="s"
                                                scaleOnInteraction={false}
                                                outlined={false}
                                                stretch
                                                style={{ marginTop: '1em' }}
                                                tabIndex={-1}
                                                onClick={handleNext}
                                            />
                                        </ButtonWrapper>
                                    </StepContent>
                                </Step>
                            ))}
                        </StyledStepper>
                        <Button
                            text="Перейти"
                            view="primary"
                            size="s"
                            scaleOnInteraction={false}
                            outlined={false}
                            stretch
                            style={{ marginTop: '1em' }}
                            tabIndex={-1}
                            onClick={handleNext}
                        />
                    </CardContent>
                </CardBody >
            </StyledCard >
        )
    }

    const CardLucky: React.FC<any> = () => {
        return (
            <StyledCard >
                < CardBody >
                    <StyledCardMedia
                        src={event.imageUrl}
                    >
                    </StyledCardMedia>
                    <CardContent cover={false}>
                        <TextBox>
                            <Headline3>{event.name}</Headline3>
                            <TextBoxSubTitle>{event.tags.map((el: string, i: number) => (`${el} ${i === (event.tags.length - 1) ? '' : '• '}`))}</TextBoxSubTitle>
                            {event.duration > 0 &&
                                <StyledTextBoxSubTitle><StyledIconClockFilled size='s' color="#09A552" />{event.duration} мин.</StyledTextBoxSubTitle>}
                            <TextBoxTitle>{((event.description).length > 103) ?
                                (((event.description).substring(0, 103 - 3)) + '...') :
                                event.description}
                            </TextBoxTitle>
                        </TextBox>
                        <StyledStepper activeStep={activeStep} orientation="vertical">
                            {steps.map((id, index: number) => (
                                <Step key={index} className={index <= activeStep ? 'my-green-step' : ''}>
                                    <StepLabel onClick={() => (handlerLabelClick(index))} StepIconComponent={() => (timeIcon(index + 1))}><Title>{event.name}</Title></StepLabel>

                                    <StepContent>
                                        <StyledTextBox>
                                            <TextBoxSubTitle>Откуда</TextBoxSubTitle>
                                            <Footnote1></Footnote1>
                                        </StyledTextBox>

                                        <StyledTextBox>
                                            <TextBoxSubTitle>Куда</TextBoxSubTitle>
                                            <Footnote1>{ }</Footnote1>
                                        </StyledTextBox>

                                        <StyledTextBox>
                                            <TextBoxSubTitle>Время в пути</TextBoxSubTitle>
                                            <Footnote1>{ }</Footnote1>
                                        </StyledTextBox>

                                        <StyledTextBox>
                                            <TextBoxSubTitle>Стоимость</TextBoxSubTitle>
                                            <Footnote1>{ }</Footnote1>
                                        </StyledTextBox>

                                        <ButtonWrapper>
                                            {
                                                index !== 0 && <Button
                                                    text="Назад"
                                                    view="secondary"
                                                    size="s"
                                                    scaleOnInteraction={false}
                                                    outlined={false}
                                                    stretch
                                                    style={{ marginTop: '1em', marginRight: '1em' }}
                                                    tabIndex={-1}
                                                    onClick={handleBack}
                                                />
                                            }
                                            <Button
                                                text="Продолжить"
                                                view="primary"
                                                size="s"
                                                scaleOnInteraction={false}
                                                outlined={false}
                                                stretch
                                                style={{ marginTop: '1em' }}
                                                tabIndex={-1}
                                                onClick={handleNext}
                                            />
                                        </ButtonWrapper>
                                    </StepContent>
                                </Step>
                            ))}
                        </StyledStepper>
                    </CardContent>
                </CardBody >
            </StyledCard >
        )
    }

    return (
        <div>
            {event && event.type === 'growth' ? <CardGrowth /> : <CardLucky />}
        </div>
    );
}

export default Lego