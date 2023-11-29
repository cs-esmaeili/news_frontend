import styles from '@/styles/filemanager.module.scss';
import { IoMdTrash } from 'react-icons/io';
import { deleteCategory as RdeleteCategory } from '@/services/Category';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function DeleteCategory({ row, categoryList }) {

    const [inputOpen, setInputOpen] = useState(false);

    const deleteCategory = async (newCategory_id) => {
        try {
            const { data } = await RdeleteCategory({ category_id: row._id, newCategory_id });
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
                setInputOpen(!inputOpen);
            }} />
            <input className={`${styles.input} ${(inputOpen) ? styles.open : null}`} placeholder='search something...' onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    deleteCategory(e.target.value == "" ? null : e.target.value);
                    setInputOpen(false);
                    e.target.value = "";
                }
            }} />
        </div>
    )
}
