import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';


function CModal({ data, updater }) {

    const { status, title, body } = data;

    // const [show, setShow] = useState(status);

    return (
        <Modal
            size="sm"
            // size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={status}
            onHide={() => updater(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {body}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => updater(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}



export default CModal;