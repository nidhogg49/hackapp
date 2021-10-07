import {
    Switch,
    Route
} from 'react-router-dom';
import Main from './Main';
import Random from './Random';
import MyCard from './Card';
import RandomCoffee from './RandomCoffee';
import Person from './Person';
import { PersonContextProvider } from '../context/personContext';
import Lego from './Lego';

const Router = () => {
    return (
        <Switch>
            <Route path="/lucky">
                <Lego />
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
            <Route path="/lego">
                <Lego />
            </Route>
            <Route path="/">
                <Main />
            </Route>
        </Switch>
    )
};

export default Router;