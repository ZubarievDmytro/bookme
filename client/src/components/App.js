import React from 'react'
import { Container } from 'semantic-ui-react';
import MenuComponent from './layout/MenuComponent';
import history from '../history';
import UsersList from './user/UsersList';
import UserPage from './user/UserPage';
import Dashboard from './account/Dashboard';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import DashboardEdit from './account/DashboardEdit';
import SignUp from './auth/SignUp';
import SignIn from './auth/SignIn';

class App extends React.Component {
    render (){
        return (
            <Container>
                <Router history={history}>
                    <div>
                        <MenuComponent />
                        <Switch>
                            <Route path='/' exact component={UsersList} />
                            <Route path='/users/:id' component={UserPage} />
                            <Route path='/dashboard' exact component={Dashboard} />
                            <Route path='/dashboard/edit/:id' exact component={DashboardEdit} />
                            <Route path='/signup' exact component={SignUp} />
                            <Route path='/signin' exact component={SignIn} />
                        </Switch>
                    </div>
                </Router>
            </Container>
        )
    }
}

export default connect(null, null)(App);