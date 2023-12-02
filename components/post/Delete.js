import styles from '@/styles/filemanager.module.scss';
import { IoMdTrash } from 'react-icons/io';
import { deletePost as RdeletePost } from '@/services/Post';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function DeletePost({ row, categoryList }) {


    const deletePost = async () => {
        try {
            const { data } = await RdeletePost({ post_id: row._id });
            const { message } = data;
            categoryList();
            toast.success(message);
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Something is wrong!');
            }
        }
    }


    return (
        <div className={styles.inputBar}>
            <IoMdTrash className={`${styles.icons} ${styles.red}`} onClick={() => {
                deletePost();
            }} />
        </div>
    )
}
