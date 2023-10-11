import styles from '@/styles/toast.module.scss';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

function ErrorToast({ data, updater }) {

    const { status = false, title, body } = data;
    return (
        <Row className={styles.toastContainer} >
            <Col xs={12} >
                <Toast bg='danger' onClose={() => updater(false)} show={status} delay={4000} autohide>
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