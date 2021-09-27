import React, { useRef, useEffect, useState } from 'react';
import { AppContext } from './context/context'
import { createGlobalStyle } from 'styled-components';
import { sberBox } from '@sberdevices/plasma-tokens/typo';
import { darkEva, darkJoy, darkSber } from '@sberdevices/plasma-tokens';
import { text, background, gradient } from '@sberdevices/plasma-tokens';
import { createAssistant, createSmartappDebugger, AssistantAppState } from '@sberdevices/assistant-client';
import { DeviceThemeProvider } from '@sberdevices/plasma-ui';
import Router from './components/Router';
import { useHistory } from "react-router-dom";

const initializeAssistant = (getState: any) => {
  return createSmartappDebugger({
    token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4MzY0MGY0MjQwY2NhZDc3ODZjYmFkYjUzN2NjMTJjY2NmMzQ4NjcwZGNkYjQ1OTY2MWNkYjIyMDcyZDk1YzQyNTM5YmU5MjcwMDQyNjI5OCIsImF1ZCI6IlZQUyIsImV4cCI6MTYzMjgxMjcwMSwiaWF0IjoxNjMyNzI2MjkxLCJpc3MiOiJLRVlNQVNURVIiLCJ0eXBlIjoiQmVhcmVyIiwianRpIjoiNzFmNTNiMzgtY2QzMS00MmU0LWFkN2QtNzgxNDFlNGFiZjQ0Iiwic2lkIjoiZTllYTI1OTAtMmMyZi00NTQ2LTg5MTgtZGYxMmMwZmNmNGZhIn0.cwrXADMgxkNUIojDJCXoZpnOf1NrD3LZ_8-EK01opsEfmwxi-zF3U2gWZ5tioxZTK1bWANehjY3rYShF7c7itRr9ekKoBUCw5TtbZtbPfEQRIV_aoxGaLtDuPD4iOibJoarZ9dSgs912ZroZMWZrF8S7jBnMnSQyTLgzpWc40qKszFYQguhiAk7FcA0lORnr46OH5GinMCJXcAzHhQR0sL5jtMMDr_IrwjuYKvbkd2jpwFe_y2YPhEEYIFBuk7zL3ZYLw4iYRCiMctcXw41DY6WaXtBvLlJUlnHxDM3zdpmZsXglEUR4-W-mhN_G9TdUj2VXgnebbwM46PipZkOxo4wbWYHocM5zw2uSX_MCcX30uxEwV0O7PJkgC-g57jecGFeP8CyjZC9L_40mF3Xs3T4rv4BV2cZU7R4J40w3dzLl_TCSbU4MrRniXJ0pCKuJRRBx3w9RBIyI88E18_m5dpMXZ4XF4nf9kUpXPB0gi0jRnEzeYTGszDEWlqtYqSJRkrGAHBiB7uAr-F2W6lhiewWOw__I2aUwuh6F9niQJKnJRrP62-DzXllJHcgvWjHOA7DNWNhS4P68t7cGtyuQ6fugeEaab3sVouU3sMM-jhLEOR96szQdrEnyyDhbDAXH0EhEz7n3F1FOv_PHmmRvq2yiiYtOZ9IZPkXjb134Ipw',
    initPhrase: `Запусти Чем заняться?`,
    getState,
  });
};

const TypoScale = createGlobalStyle(sberBox);

const DocStyles = createGlobalStyle`
    html {
        color: ${text};
        background-color: ${background};
        background-image: ${gradient};
        min-height: 100vh;
    }
`;

const ThemeBackgroundEva = createGlobalStyle(darkEva);
const ThemeBackgroundSber = createGlobalStyle(darkSber);
const ThemeBackgroundJoy = createGlobalStyle(darkJoy);

const App: React.FC = () => {
  const [character, setCharacter] = useState('sber');

  const assistantStateRef = useRef<AssistantAppState>();
  const assistantRef = useRef<ReturnType<typeof createAssistant>>();

  const history = useHistory();

  useEffect(() => {
    assistantRef.current = initializeAssistant(() => assistantStateRef.current);

    assistantRef.current.on('data', (command) => {
      console.log('data', command);
      switch (command.type) {
        case 'character':
          setCharacter(command.character.id);
          break;
        case 'navigation':
          break;
        case 'smart_app_data':
          history.push("/search");
          console.log('history');
          break;
        default:
          return;
      }
    });
  }, [history]);

  return (
    <AppContext.Provider value={{
      authenticated: true,
      lang: 'en',
      theme: 'dark'
    }}>
      <DeviceThemeProvider /*detectDeviceCallback={() => 'sberBox'}*/>
        <TypoScale />
        <DocStyles />
        {(() => {
          switch (character) {
            case 'sber':
              return <ThemeBackgroundSber />;
            case 'eva':
              return <ThemeBackgroundEva />;
            case 'joy':
              return <ThemeBackgroundJoy />;
            default:
              return;
          }
        })()}

        <AppContext.Consumer>
          {
            ({ authenticated, lang }) => {
              if (authenticated) {
                return <Router />
              }
              return <h1>Необходимо войти с систему</h1>
            }
          }
        </AppContext.Consumer>
      </DeviceThemeProvider>
    </AppContext.Provider>
  );
};

export default App;