import {
    Switch,
    Route
} from 'react-router-dom';
import Main from './Main';
import Random from './Random';
import MyCard from './Card';
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