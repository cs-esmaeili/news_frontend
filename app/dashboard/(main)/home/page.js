'use client'
import { Container, Row, Col } from 'react-bootstrap';
import Table from '@/components/Table';

export default function Home() {
    return (
        <Container fluid>
            <Row>
                <Col>

                </Col>
            </Row>
            <Row>
                <Col>
                    <Table headers={['count', 'head 1', 'head 2', 'head 3']} rows={
                        [
                            ['content 1', 'content 2', 'content 3'],
                            ['content 1', 'content 2', 'content 3'],
                            ['content 1', 'content 2', 'content 3'],
                        ]
                    } />
                </Col>
            </Row>
        </Container>

    )
}
