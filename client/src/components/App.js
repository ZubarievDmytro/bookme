import React from 'react'
import { Container } from 'semantic-ui-react';
import MenuComponent from './layout/MenuComponent';
import history from '../history';
import UsersList from './user/UsersList';
import UserPage from './user/UserPage';
import Dashboard from './account/Dashboard';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import DashboardUpdate from './account/DashboardUpdate';

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
                            <Route path='/dashboard/edit' exact component={DashboardUpdate} />
                        </Switch>
                    </div>
                </Router>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, null)(App);