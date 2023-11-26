import styles from '@/styles/filemanager.module.scss';
import { useState } from 'react';
import {
    renameFolder as RrenameFolder,
    renameFile as RrenameFile,
} from '@/services/Filemanager';
import { BiSolidEdit } from 'react-icons/bi';
import toast from 'react-hot-toast';

export default function Rename({ path, file, reloadFileList }) {

    const [inputOpen, setInputOpen] = useState(false);

    const renameFolder = async (newName) => {
        try {
            console.log({ location: path, oldName: file, newName });
            const { data } = await RrenameFolder({ location: path, oldName: file, newName });
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
    const renameFile = async (newName) => {
        try {
            console.log({ location: path, oldName: file, newName });
            const { data } = await RrenameFile({ location: path, oldName: file, newName });
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
                <BiSolidEdit className={`${styles.icons} ${styles.blue}`} onClick={() => {
                    setInputOpen(!inputOpen);
                }} />
                <input className={`${styles.input} ${(inputOpen) ? styles.open : null}`} placeholder='search something...' onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        if (file.includes(".")) {
                            renameFile(e.target.value);
                        } else {
                            renameFolder(e.target.value);
                        }
                        setInputOpen(false);
                        e.target.value = "";
                    }
                }} />
            </span>
        </>
    )
}
