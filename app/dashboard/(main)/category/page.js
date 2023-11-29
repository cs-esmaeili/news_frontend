'use client'
import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BiSolidEdit } from 'react-icons/bi';
import styles from '@/styles/category.module.scss';
import CreateCategory from '@/components/category/CreateCategory';
import PaginationLayout from '@/components/PaginationLayout';
import Delete from '@/components/category/Delete';
import { categoryList as RcategoryList } from '@/services/Category';

import Table from '@/components/Table';
import toast from 'react-hot-toast';


export default function Category() {


    const [categorys, setCategorys] = useState(null);
    const [categorysCount, setCategorysCount] = useState(null);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);



    const categoryList = async () => {
        try {
            const { data } = await RcategoryList({ page, perPage });
            const { categorysCount, categorys } = data;
            setCategorys(categorys);
            setCategorysCount(categorysCount);
            console.log(data);
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Something is wrong!');
            }
        }
    }

    useEffect(() => {
        categoryList();
    }, [page]);

    return (
        <Container fluid className={styles.container}>
            <CreateCategory categoryList={categoryList} />
            {categorys != null ?
                <Table
                    headers={['Id', 'Name', 'UpdatedAt', "Actions"]}
                    rows={categorys}
                    special={(row) => {
                        return (
                            <td className={styles.col} style={{ display: "flex" }}>
                                <Delete row={row} categoryList={categoryList} />
                                <BiSolidEdit className={`${styles.icons} ${styles.blue}`} onClick={() => {
                                    console.log(row);
                                }} />
                            </td>
                        )
                    }}
                />
                :
                null
            }
            <PaginationLayout page={page} perPage={perPage} count={categorysCount} setPage={(value) => { setPage(value); console.log(value) }} />

        </Container>

    )
}
