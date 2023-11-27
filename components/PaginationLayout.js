import styles from '@/styles/pagination.module.scss';
import Pagination from 'react-bootstrap/Pagination';

export default function PaginationLayout({ headers, rows }) {
    return (
        <Pagination className={styles.container}>
            <Pagination.First linkClassName={styles.link} />
            <Pagination.Prev linkClassName={styles.link} />
            <Pagination.Item linkClassName={styles.link}>{1}</Pagination.Item>
            <Pagination.Ellipsis linkClassName={styles.link} />

            <Pagination.Item linkClassName={styles.link}>{10}</Pagination.Item>
            <Pagination.Item linkClassName={styles.link}>{11}</Pagination.Item>
            <Pagination.Item linkClassName={`${styles.link} ${styles.active}`}>{12}</Pagination.Item>
            <Pagination.Item linkClassName={styles.link}>{13}</Pagination.Item>
            <Pagination.Item linkClassName={styles.link}>{14}</Pagination.Item>

            <Pagination.Ellipsis linkClassName={styles.link} />
            <Pagination.Item linkClassName={styles.link}>{20}</Pagination.Item>
            <Pagination.Next linkClassName={styles.link} />
            <Pagination.Last linkClassName={styles.link} />
        </Pagination>
    )
}
