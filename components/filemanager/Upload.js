import styles from '@/styles/filemanager.module.scss';
import { PiUploadBold } from 'react-icons/pi';
import { toastContext } from '@/app/contexts/errorToast';
import { useContext } from 'react';
import { saveFile as RsaveFile, } from '@/services/Filemanager';
import { ProgressBar } from 'react-bootstrap';
import { cModalContext } from '@/app/contexts/cModal';
import { useRef } from 'react';

export default function UploadFile({ path, reloadFileList }) {

    const { toastStatus, toastUpdater } = useContext(toastContext);
    const { cModalStatus, cModalUpdater } = useContext(cModalContext);

    const fileInputRef = useRef(null);

    const saveFile = async (event) => {
        try {
            let formData = new FormData();
            formData.append("location", JSON.stringify(path));
            for (let i = 0; i < event.target.files.length; i++) {
                const file = event.target.files[i];
                formData.append("files[]", file);
            }
            const { data } = await RsaveFile(formData, (persent) => {
                if (persent === 100) {
                    cModalUpdater({
                        status: false,
                        title: null,
                        body: null,
                    });
                } else {
                    cModalUpdater({
                        status: true,
                        title: 'Uploading File ...',
                        body: <ProgressBar now={persent} label={`${persent}%`} />,
                    });
                }
            });
            const { message } = data;
            toastUpdater({
                status: true,
                title: 'File Upload',
                body: message,
            });
            reloadFileList();
        } catch (error) {
            if (error?.response?.data?.message) {
                toastUpdater({
                    status: true,
                    title: 'File Upload',
                    body: error.response.data.message,
                });
            } else {
                toastUpdater({
                    status: true,
                    title: 'File Upload',
                    body: 'Something is wrong!',
                });
            }
        }
    }

    return (
        <>
            <PiUploadBold className={`${styles.icons} ${styles.green}`} onClick={() => {
                cModalUpdater
                fileInputRef.current.click();
            }} />
            <input
                id="file"
                type="file"
                accept="image/*, video/*"
                aria-describedby="file"
                multiple
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={saveFile}
            />
        </>
    )
}
