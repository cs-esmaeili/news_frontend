import styles from '@/styles/filemanager.module.scss';
import { toastContext } from '@/app/contexts/errorToast';
import { cModalContext } from '@/app/contexts/cModal';
import { useContext } from 'react';
import { createFolder as RcreateFolder } from '@/services/Filemanager';
import { BiSolidFolderPlus } from 'react-icons/bi';
import { Form } from 'react-bootstrap';

export default function Folder({ path, reloadFileList }) {

    const { toastStatus, toastUpdater } = useContext(toastContext);
    const { cModalStatus, cModalUpdater } = useContext(cModalContext);

    const createFolder = async (folderName) => {
        try {
            const { data } = await RcreateFolder({ location: path, folderName });
            const { message } = data;
            toastUpdater({
                status: true,
                title: 'create Folder',
                body: message,
            });
            reloadFileList();
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toastUpdater({
                    status: true,
                    title: 'create Folder',
                    body: error.response.data.message,
                });
            } else {
                toastUpdater({
                    status: true,
                    title: 'create Folder',
                    body: 'Something is wrong!',
                });
            }
        }
    }
    return (
        <BiSolidFolderPlus className={`${styles.icons} ${styles.yellow}`} onClick={() => {
            cModalUpdater({
                status: true,
                title: 'Create Folder',
                body: <Form.Control className={styles.customInput} autoFocus type="text" onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        createFolder(e.target.value);
                        cModalUpdater({
                            status: false,
                            title: null,
                            body: null,
                        });
                    }
                }} />,
            });
        }} />
    )
}
