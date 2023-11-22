import styles from '@/styles/filemanager.module.scss';
import { useState } from 'react';
import { createFolder as RcreateFolder } from '@/services/Filemanager';
import { BiSolidFolderPlus } from 'react-icons/bi';

export default function Folder({ path, reloadFileList , setToast }) {


    const [inputOpen, setInputOpen] = useState(false);

    const createFolder = async (folderName) => {
        try {
            const { data } = await RcreateFolder({ location: path, folderName });
            const { message } = data;
            setToast({
                title: 'create Folder',
                body: message,
            });
            reloadFileList();
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                setToast({
                    title: 'create Folder',
                    body: error.response.data.message,
                });
            } else {
                setToast({
                    title: 'create Folder',
                    body: 'Something is wrong!',
                });
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
                        e.target.value="";
                    }
                }} />
            </span>
        </>
    )
}
