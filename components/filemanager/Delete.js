import styles from '@/styles/filemanager.module.scss';
import toast from 'react-hot-toast';
import { IoMdTrash } from 'react-icons/io';
import {
    deleteFolder as RdeleteFolder,
    deleteFile as RdeleteFile,
} from '@/services/Filemanager';


export default function DeleteFile({ path, file, reloadFileList }) {


    const deleteFile = async () => {
        try {
            let location = [...path];
            const { data } = await RdeleteFile({ location, fileName: file });
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


    const deleteFolder = async () => {
        try {
            let location = [...path];
            location.push(file);
            const { data } = await RdeleteFolder({ location });
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
        <IoMdTrash className={`${styles.icons} ${styles.red}`} onClick={() => {
            if (!file.includes(".")) {
                deleteFolder(file);
            } else {
                deleteFile(file);
            }
        }} />
    )
}
