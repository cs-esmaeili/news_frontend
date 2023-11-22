import styles from '@/styles/filemanager.module.scss';
import { toastContext } from '@/app/contexts/errorToast';
import { cModalContext } from '@/app/contexts/cModal';
import { useContext, useState } from 'react';
import {
    renameFolder as RrenameFolder,
    renameFile as RrenameFile,
} from '@/services/Filemanager';
import { BiSolidEdit } from 'react-icons/bi';
import { Form } from 'react-bootstrap';


export default function Rename({ path, file, reloadFileList }) {

    const { toastStatus, toastUpdater } = useContext(toastContext);
    const { cModalStatus, cModalUpdater } = useContext(cModalContext);
    const [inputOpen, setInputOpen] = useState(false);

    const renameFolder = async (newName) => {
        try {
            console.log({ location: path, oldName: file, newName });
            const { data } = await RrenameFolder({ location: path, oldName: file, newName });
            const { message } = data;
            toastUpdater({
                status: true,
                title: 'Rename Folder',
                body: message,
            });
            reloadFileList();
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toastUpdater({
                    status: true,
                    title: 'Rename Folder',
                    body: error.response.data.message,
                });
            } else {
                toastUpdater({
                    status: true,
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
            toastUpdater({
                status: true,
                title: 'Rename File',
                body: message,
            });
            reloadFileList();
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toastUpdater({
                    status: true,
                    title: 'Rename File',
                    body: error.response.data.message,
                });
            } else {
                toastUpdater({
                    status: true,
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
