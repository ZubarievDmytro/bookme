import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

function UserModal(props) {
  const { text, open, onModalClick } = props;

  return (
    <Modal size="tiny" open={open} onClose={() => onModalClick()}>
      <Modal.Header>Delete your {text}</Modal.Header>
      <Modal.Content>
        <p>Are you sure you want to delete your {text}?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button positive onClick={() => onModalClick('no')}>
          No
        </Button>
        <Button negative onClick={() => onModalClick('yes')}>
          Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default UserModal;
