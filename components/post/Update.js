import { useContext, useState, useEffect } from 'react';
import { cModalContext } from '@/app/contexts/cModal';
import CreatePost from '@/app/dashboard/(main)/post/createPost/page';
import styles from '@/styles/filemanager.module.scss';
import { BiSolidEdit } from 'react-icons/bi';
import toast from 'react-hot-toast';

export default function UpdatePost({ row , categoryList }) {

    const [image, setImage] = useState(null);

    const { cModalStatus, cModalUpdater } = useContext(cModalContext);


    const openPostPage = () => {
        cModalUpdater({
            status: true,
            title: null,
            fullSize: true,
            body: <CreatePost editMode data={row} closeModal={() => {
                cModalUpdater({
                    status: false,
                    title: null,
                    body:null
                });
                categoryList();
            }} />
        });
    }


    useEffect(() => {

    }, []);

    return (
        <BiSolidEdit className={`${styles.icons} ${styles.blue}`} onClick={() => {
            openPostPage();
        }} />
    )
}