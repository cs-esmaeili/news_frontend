import styles from '@/styles/pagination.module.scss';
import Pagination from 'react-bootstrap/Pagination';

export default function PaginationLayout({ page, perPage, count, setPage }) {

    const elements = () => {
        const renderedItems = [];
        const tempPageNumbers = Math.ceil(count / perPage);

        const telorance = 2;
        for (let i = 1; i <= tempPageNumbers; i++) {
            if (i >= (page - telorance) && i <= (page + telorance)) {
                renderedItems.push(<Pagination.Item linkClassName={`${`${styles.link} ${(i == page) ? styles.active : ""}`}`} onClick={() => setPage(i)}  >{i}</Pagination.Item>);
            } else if (i == 1) {
                renderedItems.push(<Pagination.First linkClassName={`${styles.link} ${(i == page) ? styles.active : ""}`} onClick={() => setPage(i)} />);
                renderedItems.push(<Pagination.Item linkClassName={`${styles.link} ${(i == page) ? styles.active : ""}`} onClick={() => setPage(i)} >{i}</Pagination.Item>);
                if (i != (page - telorance - 1)) {
                    renderedItems.push(<Pagination.Ellipsis linkClassName={`${styles.link} ${(i == page) ? styles.active : ""}`} onClick={() => setPage(page - (telorance + 1))} />);
                }
            } else if (i == tempPageNumbers) {
                if (i != (page + telorance + 1)) {
                    renderedItems.push(<Pagination.Ellipsis linkClassName={`${styles.link} ${(i == page) ? styles.active : ""}`} onClick={() => setPage(page + (telorance + 1))} />);
                }
                renderedItems.push(<Pagination.Item linkClassName={`${styles.link} ${(i == page) ? styles.active : ""}`} onClick={() => setPage(i)} >{i}</Pagination.Item>);
                renderedItems.push(<Pagination.Last linkClassName={`${styles.link} ${(i == page) ? styles.active : ""}`} onClick={() => setPage(i)} />);
            }
        }

        return renderedItems;
    }
    return (
        <Pagination className={styles.container}>
            {elements()}
        </Pagination>
    )
}
