import styles from '@/styles/filemanager.module.scss';
import { IoMdTrash } from 'react-icons/io';
import { toastContext } from '@/app/contexts/errorToast';
import { useContext } from 'react';
import {
    deleteFolder as RdeleteFolder,
    deleteFile as RdeleteFile,
} from '@/services/Filemanager';


export default function DeleteFile({ path, file , reloadFileList }) {

    const { toastStatus, toastUpdater } = useContext(toastContext);

    const deleteFile = async () => {
        try {
            let location = [...path];
            const { data } = await RdeleteFile({ location, fileName: file });
            const { message } = data;
            toastUpdater({
                status: true,
                title: 'Delete File',
                body: message,
            });
            reloadFileList();
        } catch (error) {
            if (error?.response?.data?.message) {
                toastUpdater({
                    status: true,
                    title: 'Delete File',
                    body: error.response.data.message,
                });
            } else {
                toastUpdater({
                    status: true,
                    title: 'Delete File',
                    body: 'Something is wrong!',
                });
            }
        }
    }


    const deleteFolder = async () => {
        try {
            let location = [...path];
            location.push(file);
            const { data } = await RdeleteFolder({ location });
            const { message } = data;
            toastUpdater({
                status: true,
                title: 'Delete Folder',
                body: message,
            });
            reloadFileList();
        } catch (error) {
            if (error?.response?.data?.message) {
                toastUpdater({
                    status: true,
                    title: 'Delete Folder',
                    body: error.response.data.message,
                });
            } else {
                toastUpdater({
                    status: true,
                    title: 'Delete Folder',
                    body: 'Something is wrong!',
                });
            }
        }
    }

    return (
        <IoMdTrash className={`${styles.icons} ${styles.red}`} onClick={() => {
            if (!file.includes(".")) {
                deleteFolder(file);
            } else {
                deleteFile(file);
            }
        }} />
    )
}
