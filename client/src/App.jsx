import React from 'react';
import { Container } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './app/features/header';
import Catalog from './app/features/catalog';
import User from './app/features/user';
import Dashboard from './app/features/dashboard';
import DashboardEdit from './app/features/dashboardEdit';
import SignUp from './app/features/signUp';
import SignIn from './app/features/signIn';
import history from './history';

const App = () => {
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
};

export default App;
