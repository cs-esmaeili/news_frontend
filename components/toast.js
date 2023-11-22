import styles from '@/styles/toast.module.scss';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

function ErrorToast({ data, updater }) {

    if (data != null) {
        return (
            <Row className={styles.toastContainer} >
                <Col xs={12} >
                    <Toast bg='danger' onClose={() => updater(null)} show={true} delay={4000} autohide>
                        <Toast.Header>
                            <strong className="me-auto">{data.title}</strong>
                            {/* <small>11 mins ago</small> */}
                        </Toast.Header>
                        <Toast.Body>{data.body}</Toast.Body>
                    </Toast>
                </Col>
            </Row>
        );
    } else {
        return null;
    }
}

export default ErrorToast;