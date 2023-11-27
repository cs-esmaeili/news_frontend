import styles from '@/styles/table.module.scss';
import { Container, Row, Col } from 'react-bootstrap';
import Pagination from '@/components/PaginationLayout';

export default function Table({ headers, rows }) {
    return (
        <Container fluid className={styles.table}>
            <Row className={styles.row}>
                {headers.map((content, index) => (
                    <Col key={index} className={styles.col}>
                        {content}
                    </Col>
                ))}
            </Row>
            {rows.map((contentParent, indexParent) => (
                <Row key={indexParent} className={styles.row}>
                    <Col className={styles.col}>{indexParent}</Col>
                    {contentParent.map((contentChild, indexChild) => (
                        <Col key={indexChild} className={styles.col}>
                            {contentChild}
                        </Col>
                    ))}
                </Row>
            ))}
            <Pagination />
        </Container>
    )
}
