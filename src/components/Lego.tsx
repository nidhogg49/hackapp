import { Step, Stepper, StepLabel, StepContent } from '@material-ui/core';
import { IconClose } from '@sberdevices/plasma-icons';
import { Card, CardBody, CardContent, CardMedia, TextBox, TextBoxBigTitle, TextBoxSubTitle, Button, Footnote1, Caption } from '@sberdevices/plasma-ui';
import { spawn } from 'child_process';
import { useState } from 'react';
import { Link } from "react-router-dom";
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
];

const StyledCard = styled(Card)`
    width: 100%;
`;

const timeIcon = () => (<Caption>15:00</Caption>)

const Lego = () => {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
                <Step key={index}>
                    <StepLabel StepIconComponent={timeIcon}></StepLabel>
                    <StepContent>
                        <StyledCard tabIndex={0}>
                            <CardBody>
                                <CardMedia
                                    src={img1}
                                    placeholder={img1}
                                    ratio="1 / 1"
                                />
                                <CardContent cover>
                                    <TextBox>
                                        <TextBoxSubTitle>Испытай удачу</TextBoxSubTitle>
                                    </TextBox>
                                    <Link to="/lucky">
                                        <Button
                                            text="Мне повезет!"
                                            view="overlay"
                                            size="s"
                                            outlined={false}
                                            stretch
                                            style={{ marginTop: '8px' }}
                                            tabIndex={-1}
                                        />
                                    </Link>
                                </CardContent>
                            </CardBody>
                        </StyledCard>
                        <Button
                            text="Назад"
                            view="secondary"
                            size="s"
                            scaleOnInteraction={false}
                            outlined={false}
                            stretch
                            style={{ marginTop: '1em' }}
                            tabIndex={-1}
                            onClick={handleBack}
                        />
                        <Button
                            text="Вперед"
                            view="primary"
                            size="s"
                            scaleOnInteraction={false}
                            outlined={false}
                            stretch
                            style={{ marginTop: '1em' }}
                            tabIndex={-1}
                            onClick={handleNext}
                        />
                    </StepContent>
                </Step>
            ))}
        </Stepper>
    );
}

export default Lego