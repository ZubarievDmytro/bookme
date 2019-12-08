import React from 'react';
import { Form, Checkbox, Button, Grid } from 'semantic-ui-react';
import history from '../../history';
import { connect } from 'react-redux';

class DashboardCreate extends React.Component {
    state = {
       
    }
    onSaveClick (){
        history.goBack();
    }

    renderForm (){
        return (
            <Grid columns='two' divided>
                <Grid.Column width={8}>
                <Form>
                    <Form.Field>
                        <label>Full Name</label>
                        <input placeholder='Full Name' />
                    </Form.Field>
                    <Form.Field>
                        <label>Profession</label>
                        <input placeholder='Profession' />
                    </Form.Field>
                    <Form.Field>
                        <label>Description</label>
                        <input placeholder='Description' />
                    </Form.Field>
                    <Form.Field>
                        <label>Avatar URL</label>
                        <input placeholder='Avatar URL' />
                    </Form.Field>
                    <Form.Field>
                        <Checkbox label='Make my profile visible' />
                    </Form.Field>
                    <Button type='submit' onClick={() => this.onSaveClick()}>Save</Button>
                </Form>
                </Grid.Column>
            </Grid>
        )
    }

    render (){
        return (
            <div>
                <h1>Update Your profile</h1>
                {this.renderForm()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps, null)(DashboardCreate); 