import styles from '@/styles/filemanager.module.scss';
import { IoMdTrash } from 'react-icons/io';
import {
    deleteFolder as RdeleteFolder,
    deleteFile as RdeleteFile,
} from '@/services/Filemanager';


export default function DeleteFile({ path, file , reloadFileList , setToast }) {


    const deleteFile = async () => {
        try {
            let location = [...path];
            const { data } = await RdeleteFile({ location, fileName: file });
            const { message } = data;
            setToast({
                title: 'Delete File',
                body: message,
            });
            reloadFileList();
        } catch (error) {
            if (error?.response?.data?.message) {
                setToast({
                    title: 'Delete File',
                    body: error.response.data.message,
                });
            } else {
                setToast({
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
            setToast({
                title: 'Delete Folder',
                body: message,
            });
            reloadFileList();
        } catch (error) {
            if (error?.response?.data?.message) {
                setToast({
                    title: 'Delete Folder',
                    body: error.response.data.message,
                });
            } else {
                setToast({
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
