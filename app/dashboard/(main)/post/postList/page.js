'use client'

import { useState, useEffect } from 'react';
import styles from '@/styles/postList.module.scss';
import Delete from '@/components/post/Delete';
import Update from '@/components/post/Update';
import { postList as RpostList } from '@/services/Post';
import PaginationLayout from '@/components/PaginationLayout';
import { Container, Row } from 'react-bootstrap';
import Table from '@/components/Table';
import toast from 'react-hot-toast';
import CreatePost from '@/app/dashboard/(main)/post/createPost/page';


export default function postList() {

    const [posts, setPosts] = useState(null);
    const [postsCount, setPostsCount] = useState(null);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [row, setRow] = useState(null);

    const categoryList = async () => {
        try {
            const { data } = await RpostList({ page, perPage });
            const { postsCount, posts } = data;
            setPosts(posts);
            setPostsCount(postsCount);
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

    if (posts == null) {
        return (<></>);
    } else {
        return (
            <Container fluid className={styles.container}>
                <Row className={styles.postListContainer}>
                    <div>
                        Text Field
                    </div>
                    <div className={styles.headerDisc}>
                        You can set your post text in this section...
                    </div>
                    <Table
                        headers={['Id', 'Title', 'UpdatedAt', "Actions"]}
                        allowHeaders={['_id', 'title', 'updatedAt']}
                        rows={posts}
                        selectMode={true}
                        selectedRow={(row) => { setRow(row); }}
                        special={(row) => {
                            return (
                                <td className={styles.col} style={{ display: "flex" }}>
                                    <Delete row={row} categoryList={categoryList} />
                                </td>
                            )
                        }}
                    />
                    <PaginationLayout page={page} perPage={perPage} count={postsCount} setPage={(value) => { setPage(value) }} />
                </Row>
                <Row className={styles.postDataList}>
                    {row ?
                        <CreatePost editMode data={row} upDateDone={() => { setRow(null); categoryList(); }} />
                        :
                        null}
                </Row>
            </Container>
        )
    }
}
