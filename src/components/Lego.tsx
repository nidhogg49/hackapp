import { Step, Stepper, StepLabel, StepContent } from '@material-ui/core';
import { IconBankCardAlt1, IconClock, IconLocation } from '@sberdevices/plasma-icons';
import { buttonPrimary, buttonSecondary } from '@sberdevices/plasma-tokens';
import { Card, CardBody, CardContent, CardMedia, TextBox, TextBoxSubTitle, Button, ActionButton, Headline3, TextBoxTitle, Footnote1 } from '@sberdevices/plasma-ui';
import { Title } from '@sberdevices/plasma-ui/components/TextBox/TextBox';
import { useState } from 'react';
import styled from 'styled-components';
import img1 from '../img/320_320_0.jpeg'

const steps = [
    {
        label: 'Select campaign settings',
        description: `For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.`,
    },
    {
        label: 'Create an ad group',
        description:
            'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
        label: 'Create an ad',
        description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
    },
    {
        label: 'Create an ad',
        description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
    },
    {
        label: 'Create an ad',
        description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
    },
];

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

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handlerLabelClick = (index: number) => {
        setActiveStep(index);
    };

    return (
        <div>
            <StyledCard tabIndex={0}>
                <CardBody>
                    <StyledCardMedia
                        src={img1}
                        placeholder={img1}
                    >
                    </StyledCardMedia>
                    <CardContent cover={false}>
                        <TextBox>
                            <Headline3>Шоу “ВСЕ БУДЕТ ХОРОШО!”</Headline3>
                            <TextBoxSubTitle>Цирк • Шоу • Для детей</TextBoxSubTitle>
                            <StyledTextBoxSubTitle><StyledIconLocation size='s' color="#09A552" />от 1 500 ₽</StyledTextBoxSubTitle>
                            <StyledTextBoxSubTitle><StyledIconClockFilled size='s' color="#09A552" />Суббота, 9 октября, 14:00</StyledTextBoxSubTitle>
                            <StyledTextBoxSubTitle><StyledIconTicket size='s' color="#09A552" />от 1 500 ₽</StyledTextBoxSubTitle>
                        </TextBox>
                        <StyledStepper activeStep={activeStep} orientation="vertical">
                            {steps.map((step, index: number) => (
                                <Step key={index} className={index <= activeStep ? 'my-green-step' : ''}>
                                    <StepLabel onClick={() => (handlerLabelClick(index))} StepIconComponent={() => (timeIcon(index + 1))}><Title>{step.label}</Title></StepLabel>

                                    <StepContent>
                                        <StyledTextBox>
                                            <TextBoxSubTitle>Откуда</TextBoxSubTitle>
                                            <Footnote1>{step.label}</Footnote1>
                                        </StyledTextBox>

                                        <StyledTextBox>
                                            <TextBoxSubTitle>Куда</TextBoxSubTitle>
                                            <Footnote1>{step.label}</Footnote1>
                                        </StyledTextBox>

                                        <StyledTextBox>
                                            <TextBoxSubTitle>Время в пути</TextBoxSubTitle>
                                            <Footnote1>{step.label}</Footnote1>
                                        </StyledTextBox>

                                        <StyledTextBox>
                                            <TextBoxSubTitle>Стоимость</TextBoxSubTitle>
                                            <Footnote1>{step.label}</Footnote1>
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
                </CardBody>
            </StyledCard>
        </div>
    );
}

export default Lego