import styles from '@/styles/role.module.scss';
import { useState, useEffect } from 'react';
import { togglePermission as RtogglePermission } from '@/services/Permission';
import toast from 'react-hot-toast';

export default function Permissions({ allPermissions, currentRole, setUpdateList }) {

    const togglePermission = async (role_id, permission_id) => {
        try {
            const { data } = await RtogglePermission({ role_id, permission_id });
            const { message } = data;
            toast.success(message);
            setUpdateList();
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Something is wrong!');
            }
        }
    }

    useEffect(() => {
    }, [allPermissions, currentRole]);


    return (
        <>
            {(allPermissions != null && currentRole != null) ?
                allPermissions.map((permission, index) => {
                    let active = false;
                    const { permissions } = currentRole;
                    for (let i = 0; i < permissions.length; i++) {
                        if (allPermissions[index]._id == permissions[i]._id) {
                            active = true;
                            break;
                        }
                    }
                    return (
                        <div key={index} className={styles.permissionContainer} onClick={() => {
                            console.log(currentRole._id, permission._id);
                            togglePermission(currentRole._id, permission._id);
                        }}>
                            <span className={styles.permissionName}>{permission.name}</span>
                            <div className={styles.detailsContainer}>
                                <div>
                                    <div className={styles.permissionDetails}>
                                        {permission.route}
                                    </div>
                                    <div className={styles.permissionDetails}>
                                        {permission.disc}
                                    </div>
                                </div>
                                <div className={styles.checkBoxContainer}>
                                    <button className={`${styles.customButton} ${(active) ? styles.active : ""}`}></button>
                                </div>
                            </div>
                        </div>
                    )
                })
                : null}
        </>
    )
}
