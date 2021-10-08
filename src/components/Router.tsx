import {
    Switch,
    Route
} from 'react-router-dom';
import Main from './Main';
import Lego from './Lego';

const Router = () => {
    return (
        <Switch>
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