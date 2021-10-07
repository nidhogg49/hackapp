import {
    Switch,
    Route
} from 'react-router-dom';
import Layout from './Layout';
import Main from './Main';
import Random from './Random';
import Lucky from './Lucky';
import MyCard from './Card';
import RandomCoffee from './RandomCoffee';
import Person from './Person';
import { PersonContextProvider } from '../context/personContext';

const Router = () => (
    <Layout>
        <Switch>
            <Route path="/lucky">
                <Lucky />
            </Route>
            <Route path="/random">
                <Random />
            </Route>
            <Route path="/randomCoffee">
                <PersonContextProvider>
                    <RandomCoffee />
                </PersonContextProvider>
            </Route>            
            <Route path="/person">
                <PersonContextProvider>
                    <Person />
                </PersonContextProvider>
            </Route>
            <Route path="/card">
                <MyCard />
            </Route>
            <Route path="/">
                <Main />
            </Route>
        </Switch>
    </Layout>
);

export default Router;