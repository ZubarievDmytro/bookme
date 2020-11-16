import React from 'react';
import { Container } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './features/header';
import Catalog from './features/catalog';
import User from './features/user';
import Dashboard from './features/dashboard';
import DashboardEdit from './features/dashboardEdit';
import SignUp from './features/signUp';
import SignIn from './features/signIn';
import history from '../history';

function App() {
  return (
    <Container>
      <Router history={history}>
        <Header />
        <Switch>
          <Route path="/" exact component={Catalog} />
          <Route path="/users/:id" component={User} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/dashboard/edit/:id" exact component={DashboardEdit} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/signin" exact component={SignIn} />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
