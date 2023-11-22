import styles from '@/styles/filemanager.module.scss';
import { useState } from 'react';
import {
    renameFolder as RrenameFolder,
    renameFile as RrenameFile,
} from '@/services/Filemanager';
import { BiSolidEdit } from 'react-icons/bi';


export default function Rename({ path, file, reloadFileList, setToast }) {

    const [inputOpen, setInputOpen] = useState(false);

    const renameFolder = async (newName) => {
        try {
            console.log({ location: path, oldName: file, newName });
            const { data } = await RrenameFolder({ location: path, oldName: file, newName });
            const { message } = data;
            setToast({

                title: 'Rename Folder',
                body: message,
            });
            reloadFileList();
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                setToast({

                    title: 'Rename Folder',
                    body: error.response.data.message,
                });
            } else {
                setToast({

                    title: 'Rename Folder',
                    body: 'Something is wrong!',
                });
            }
        }
    }
    const renameFile = async (newName) => {
        try {
            console.log({ location: path, oldName: file, newName });
            const { data } = await RrenameFile({ location: path, oldName: file, newName });
            const { message } = data;
            setToast({

                title: 'Rename File',
                body: message,
            });
            reloadFileList();
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                setToast({

                    title: 'Rename File',
                    body: error.response.data.message,
                });
            } else {
                setToast({

                    title: 'Rename File',
                    body: 'Something is wrong!',
                });
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
