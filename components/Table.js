import styles from '@/styles/table.module.scss';
import { Table as BTable } from 'react-bootstrap';

export default function Table({ headers, rows  , special}) {
    return (
        <BTable responsive borderless hover striped variant="dark" className={styles.striped}>
            <thead>
                <tr>
                    <th>Row</th>
                    {headers.map((content, index) => (
                        <th key={index} className={styles.col}>
                            {content}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((contentParent, indexParent) => (
                    <tr key={indexParent} className={styles.row}>
                        <td className={styles.col}>{indexParent + 1}</td>
                        {Object.entries(contentParent).map(([key, value], indexChild) => (
                            <td key={indexChild} className={styles.col}>
                                {value}
                            </td>
                        ))}
                        {special(contentParent)}
                    </tr>
                ))}
            </tbody>
        </BTable>
    )
}
