import React, { useState, useContext } from 'react';
import { AppContext } from './context/context'
import { createGlobalStyle } from 'styled-components';
import { sberBox } from '@sberdevices/plasma-tokens/typo';
import { darkEva, darkJoy, darkSber } from '@sberdevices/plasma-tokens';
import { text, background, gradient } from '@sberdevices/plasma-tokens';
import { DeviceThemeProvider } from '@sberdevices/plasma-ui';
import Router from './components/Router';
import { useHistory } from "react-router-dom";
import { AssistantContext } from './context/assistantContext';

const TypoScale = createGlobalStyle(sberBox);

const DocStyles = createGlobalStyle`
    html {
        color: ${text};
        background-color: ${background};
        background-image: ${gradient};
        height: 100%;
    }

    body {
      height: 100%;
    }
`;

const ThemeBackgroundEva = createGlobalStyle(darkEva);
const ThemeBackgroundSber = createGlobalStyle(darkSber);
const ThemeBackgroundJoy = createGlobalStyle(darkJoy);

const App: React.FC = () => {
  const [character] = useState('sber');

  const { data } = useContext(AssistantContext);

  console.log('data: ', data);

  const history = useHistory();

  if (data?.type === "smart_app_data" && data?.action?.type === "go_to_search") {
    history.push("/search");
  }

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