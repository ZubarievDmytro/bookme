import React, { Component } from 'react'
import { Modal, Button } from 'semantic-ui-react' 

class UserModal extends Component {
    
    render() {
        const { text } = this.props;
        return (
            <Modal
            size='tiny'
            open={this.props.open}
            onClose={() => this.props.onModalClick()}
          >
            <Modal.Header>Delete your {text}</Modal.Header>
            <Modal.Content>
                <p>Are you sure you want to delete your {text}?</p>
            </Modal.Content>
            <Modal.Actions>
              <Button positive onClick={() => this.props.onModalClick('no')}>
                No
              </Button>
              <Button negative onClick={() => this.props.onModalClick('yes')}>
                Yes
              </Button>
            </Modal.Actions>
          </Modal>
        )
    }
}

export default UserModal;