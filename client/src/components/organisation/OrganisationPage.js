import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class OrganisationPage extends React.Component {
    state = {
        isNewUser: false
    }

    componentDidMount = async () => {
        
    }
    
    render (){
        const { isNewUser } = this.state;
        return (
            <div>
                <h1>User page</h1> 
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, null)(OrganisationPage);