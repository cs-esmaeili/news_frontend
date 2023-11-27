import styles from '@/styles/category.module.scss';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { categoryList as RcategoryList } from '@/services/Category';
import Table from '@/components/Table';
import toast from 'react-hot-toast';

export default function CategoryList() {

    const [categorys, setCategorys] = useState(null);
    const [categorysCount, setCategorysCount] = useState(null);
    const [page, setPage] = useState(1);



    const categoryList = async (perPage) => {
        try {
            const { categorysCount, categorys } = await RcategoryList({ page, perPage });
            setCategorys(categorys);
            setCategorysCount(categorysCount);
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Something is wrong!');
            }
        }
    }

    useEffect(() => {
        categoryList(5);
    }, []);

    return (
        <Table headers={['count', 'head 1', 'head 2', 'head 3']} rows={
            [
                ['content 1', 'content 2', 'content 5'],
                ['content 1', 'content 2', 'content 3'],
                ['content 1', 'content 2', 'content 3'],
            ]
        } />
    )
}
