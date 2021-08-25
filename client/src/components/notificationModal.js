import React from 'react'
import { Modal, Button } from 'react-bootstrap';

function NotificationModal(props) {
  return (
    <>
      <Modal show={props.show} centered>
        <Modal.Header>
          <Modal.Title>{props.head}</Modal.Title></Modal.Header>
        <Modal.Body as="div" className="text-center">
          {props.body}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.handleClose}>OK</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NotificationModal;