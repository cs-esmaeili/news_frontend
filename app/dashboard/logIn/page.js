'use client'
import styles from '@/styles/logIn.module.scss';

import { FloatingLabel, Form, Container, Row, Col, Button } from 'react-bootstrap';
import Image from 'next/image'

export default function Home() {
    return (
        <Container fluid className={styles.container}>
            <Row style={{ width: '100%' }} className='justify-content-center'>
                <Col xxl={3} xl={4} lg={5} sm={8} className='d-flex flex-column'>
                    <Image src="/logo.png" alt="Picture of the author"
                        className='align-self-center'
                        width={400}
                        height={400} />
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3"
                    >
                        <Form.Control type="email" placeholder="name@example.com" />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password" >
                        <Form.Control type="password" placeholder="Password" />
                    </FloatingLabel>
                    <Button className="mt-3" variant="warning">Primary</Button>{' '}
                </Col>
            </Row>
        </Container >
    )
}
