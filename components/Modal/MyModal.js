import React from "react";
import { Modal, Button } from 'react-bootstrap'

export default function MyModal({show, onHide, children}) {
  return (
    <Modal
      show={show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation
    >
      <Modal.Header closeButton onClick={onHide} className={`border-0`}>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  );
}
