import styles from '@/styles/filemanager.module.scss';
import { PiUploadBold } from 'react-icons/pi';
import { saveFile as RsaveFile, } from '@/services/Filemanager';
import { ProgressBar } from 'react-bootstrap';
import { useRef, useState } from 'react';

export default function UploadFile({ path, reloadFileList, setToast }) {

    const [inputOpen, setInputOpen] = useState(false);
    const [persent, setPersent] = useState(0);

    const fileInputRef = useRef(null);

    const saveFile = async (event) => {
        try {
            let formData = new FormData();
            formData.append("location", JSON.stringify(path));
            for (let i = 0; i < event.target.files.length; i++) {
                const file = event.target.files[i];
                formData.append("files[]", file);
            }
            setPersent(0);
            const { data } = await RsaveFile(formData, (persent) => {
                setPersent(persent);
                if (persent > 1 && inputOpen == false) {
                    setInputOpen(true);
                }
            });

            const { message } = data;
            setInputOpen(false);
            reloadFileList();
            setToast({ title: 'File Upload', body: message });

        } catch (error) {
            if (error?.response?.data?.message) {
                setToast({
                    title: 'File Upload',
                    body: error.response.data.message,
                });
            } else {
                setToast({
                    title: 'File Upload',
                    body: 'Something is wrong!',
                });
            }
        }
    }

    return (
        <>
            <span className={styles.inputBar}>
                <PiUploadBold className={`${styles.icons} ${styles.green}`} onClick={() => {
                    if (!inputOpen) {
                        fileInputRef.current.click();
                    }
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
                <ProgressBar now={persent} label={`${persent}%`} className={`${styles.progressBar} ${(inputOpen) ? styles.open : null}`} />
            </span>
        </>

    )
}
