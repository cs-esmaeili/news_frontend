import { Button, Modal } from 'react-bootstrap';
import styles from '@/styles/modal.module.scss';


function CModal({ data, updater }) {

    const { status, title, body, footer = null, fullSize } = data;
    return (
        <Modal
            size="sm"
            className={`${styles.container} modal`}
            dialogClassName="modalChangeSize"
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
            <Modal.Body className={fullSize ? "modalBodyFullSize" : "modalBody"} >
                {body}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => updater(false)}>Close</Button>
                {footer}
            </Modal.Footer>
        </Modal>
    );
}



export default CModal;