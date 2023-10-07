'use client'
import { Container, Row, Col, Form } from 'react-bootstrap';
import { AiOutlineFile, AiOutlineFileImage, AiOutlineFolder } from "react-icons/ai";
import styles from '@/styles/filemanager.module.scss';


export default function Home() {

    return (
        <Container className={styles.container} fluid >
            <div className={styles.header}>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>
            </div>
            <div className={styles.content}>
                <Row>
                    {[...Array(30)].map((x, i) =>
                        <>
                            <Col lg={1} className={styles.file}>
                                <div>
                                    <AiOutlineFile size={"5rem"} />
                                </div>
                                <span>
                                    File Name
                                </span>
                            </Col>
                            <Col lg={1} className={styles.file}>
                                <div>
                                    <AiOutlineFileImage size={"5rem"} />
                                </div>
                                <span>
                                    File Name
                                </span>
                            </Col>
                            <Col lg={1} className={styles.file}>
                                <div>
                                    <AiOutlineFolder size={"5rem"} />
                                </div>
                                <span>
                                    File Name
                                </span>
                            </Col>
                        </>
                    )}
                </Row>
            </div>
        </Container>
    )
}
