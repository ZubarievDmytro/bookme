import React from 'react'
import { Container } from 'semantic-ui-react';
import MenuComponent from './layout/MenuComponent';
import history from '../history';
import OrganisationsList from './organisation/OrganisationsList';
import OrganisationPage from './organisation/OrganisationPage';
import Dashboard from './account/Dashboard';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import DashboardCreate from '../components/account/DashboardCreate';

class App extends React.Component {
    render (){
        return (
            <Container>
                <Router history={history}>
                    <div>
                        <MenuComponent />
                        <Switch>
                            <Route path='/' exact component={OrganisationsList} />
                            <Route path='/users/:id' component={OrganisationPage} />
                            <Route path='/dashboard' exact component={Dashboard} />
                            <Route path='/dashboard/create' exact component={DashboardCreate} />
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