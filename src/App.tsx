import { AppContext } from './context/context';
import { BrowserRouter } from 'react-router-dom';
import { DeviceThemeProvider } from '@sberdevices/plasma-ui';
import { AssistantContext } from './context/assistantContext';
import { EventContextProvider } from './context/eventContext';
import { createGlobalStyle } from 'styled-components';
import { sberBox } from '@sberdevices/plasma-tokens/typo';
import { darkEva, darkJoy, darkSber } from '@sberdevices/plasma-tokens';
import { text, background, gradient } from '@sberdevices/plasma-tokens';
import { useContext } from "react";
import Layout from './components/Layout';
import { useHistory } from 'react-router-dom';

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

    a {
      text-decoration: none;

      &:focus, &:hover, &:visited, &:link, &:active {
          text-decoration: none;
      }
    }
`;

const ThemeBackgroundEva = createGlobalStyle(darkEva);
const ThemeBackgroundSber = createGlobalStyle(darkSber);
const ThemeBackgroundJoy = createGlobalStyle(darkJoy);

const App = () => {
  const { data, character } = useContext(AssistantContext);

  const history = useHistory();

  if (data?.type === "smart_app_data") {
    console.log('app', data);

    switch (data?.action?.type) {
      case "go_to_search":
        history.push("/lucky");
        break;
      case "randomAction":
        history.push("/random");
        break;
      default:
        console.log("дефолт");
    }
  }

  return (
    <BrowserRouter>
      <AppContext.Provider value={{
        authenticated: true
      }}>
        <DeviceThemeProvider detectDeviceCallback={() => 'mobile'}>
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

          <EventContextProvider>
            <Layout />
          </EventContextProvider>
        </DeviceThemeProvider>
      </AppContext.Provider >
    </BrowserRouter>

  )
};

export default App;