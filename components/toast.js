import styles from '@/styles/toast.module.scss';
import { app_name } from '@/config.json';

import { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

function ErrorToast({ status = false, title = app_name, body = "error" }) {
    const [show, setShow] = useState(status);

    useEffect(() => {
        setShow(status);
    }, [status]);

    return (
        <Row className={styles.toastContainer} >
            <Col xs={12} >
                <Toast bg='danger' onClose={() => setShow(false)} show={show} delay={4000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">{title}</strong>
                        {/* <small>11 mins ago</small> */}
                    </Toast.Header>
                    <Toast.Body>{body}</Toast.Body>
                </Toast>
            </Col>
        </Row>
    );
}

export default ErrorToast;