import {
    Switch,
    Route
} from 'react-router-dom';
import Layout from './Layout';
import Main from './Main';
import Search from './Search';
import Random from './Random';

const Router = () => (
    <Layout>
        <Switch>
            <Route path="/search">
                <Search />
            </Route>
            <Route path="/random">
                <Random />
            </Route>
            <Route path="/">
                <Main />
            </Route>
        </Switch>
    </Layout>
);

export default Router;