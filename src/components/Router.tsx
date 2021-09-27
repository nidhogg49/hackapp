import {
    Switch,
    Route
} from 'react-router-dom';
import Layout from './Layout';
import Main from './Main';
import Search from './Search';

const Router: React.FC = () => (
    <Layout>
        <Switch>
            <Route path="/search">
                <Search />
            </Route>
            <Route path="/">
                <Main />
            </Route>
        </Switch>
    </Layout>
);

export default Router;