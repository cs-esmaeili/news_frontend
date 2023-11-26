import styles from '@/styles/filemanager.module.scss';
import { useState } from 'react';
import { createFolder as RcreateFolder } from '@/services/Filemanager';
import { BiSolidFolderPlus } from 'react-icons/bi';
import toast from 'react-hot-toast';

export default function Folder({ path, reloadFileList }) {


    const [inputOpen, setInputOpen] = useState(false);

    const createFolder = async (folderName) => {
        try {
            const { data } = await RcreateFolder({ location: path, folderName });
            const { message } = data;
            toast.success(message);
            reloadFileList();
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Something is wrong!');
            }
        }
    }
    return (
        <>
            <span className={styles.inputBar}>
                <BiSolidFolderPlus className={`${styles.icons} ${styles.yellow}`} onClick={() => {
                    setInputOpen(!inputOpen);
                }} />
                <input className={`${styles.input} ${(inputOpen) ? styles.open : null}`} placeholder='search something...' onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        createFolder(e.target.value);
                        setInputOpen(false);
                        e.target.value = "";
                    }
                }} />
            </span>
        </>
    )
}
