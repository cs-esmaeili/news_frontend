import styles from '@/styles/role.module.scss';
import { useState, useEffect, useRef } from 'react';
import { createRole as RcreateRole } from '@/services/Role';
import toast from 'react-hot-toast';

export default function Add({ resetAllData, roleList }) {

    const [tempMode, setTempMode] = useState(false);

    const createRole = async (name) => {
        try {
            const { data } = await RcreateRole({ name });
            const { message } = data;
            toast.success(message);
            roleList();
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Something is wrong!');
            }
        }
    }


    return (
        <IoMdTrash className={styles.roleDeleteButton} onClick={() => {

        }} />
    )
}
