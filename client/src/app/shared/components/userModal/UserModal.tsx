import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
 
interface Props {
  onModalClick: (type?: string) => void;
  text: string;
  open: boolean;
}

const UserModal:React.FC<Props> = ({text, open, onModalClick}) => {
  return (
    <Modal size="tiny" open={open} onClose={() => onModalClick()}>
      <Modal.Header content={`Delete your ${text}`}/>
      <Modal.Content content={`Are you sure you want to delete your ${text}?`}/>
      <Modal.Actions>
        <Button positive onClick={() => onModalClick('no') } content='No' />
        <Button negative onClick={() => onModalClick('yes')} content='Yes' />
      </Modal.Actions>
    </Modal>
  );
}

export default UserModal;
