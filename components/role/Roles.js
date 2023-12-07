import styles from '@/styles/role.module.scss';
import { useState, useEffect } from 'react';
import { IoMdTrash } from 'react-icons/io';
import { roleList as RroleList, deleteRole as RdeleteRole } from '@/services/Role'
import { ImCancelCircle } from "react-icons/im";;
import Add from './Add';
import toast from 'react-hot-toast';

export default function Roles({ setCurrentRole, setAllpermissions, updateList }) {

    const [roles, setRoles] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [deleteMode, setDeleteMode] = useState(-1);


    const roleList = async (selectLastActiveRole) => {
        try {
            const { data } = await RroleList();
            setRoles(data.roles);
            setAllpermissions(data.permissions);
            if (currentIndex != -1 && selectLastActiveRole) {
                setCurrentRole(data.roles[currentIndex]);
            }
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Something is wrong!');
            }
        }
    }

    const deleteRole = async (role_id, newRole_id) => {
        try {
            const { data } = await RdeleteRole({ role_id, newRole_id });
            const { message } = data;
            toast.success(message);
            resetAllData();
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

    const resetAllData = () => {
        setCurrentRole(null);
        setAllpermissions(null);
        setRoles(null);
        setCurrentIndex(-1);
        setDeleteMode(-1);
    }

    useEffect(() => {
        roleList(true);
    }, [updateList]);

    const toggleButtons = (index) => {
        if (deleteMode != -1 && index == deleteMode) {
            return (<ImCancelCircle className={styles.cancelDeleteMode} onClick={() => {
                setDeleteMode(-1);
            }} />)
        }
        if (deleteMode == -1) {
            return (<IoMdTrash className={styles.roleDeleteButton} onClick={() => {
                setDeleteMode(index);
            }} />)
        }
    }
    return (
        <>
            <div className={styles.ListDisc}>
                <span><b>Roles :</b></span>
                <div>You can see All roles:</div>
            </div>
            <div className={styles.permissionButtonList}>
                {(roles != null) ?
                    roles.map((role, index) => {
                        return (
                            <div className={styles.roleButtonsContainer}>
                                <button
                                    className={`
                                    ${styles.roleButton} 
                                    ${(index === currentIndex && deleteMode == -1) ? styles.active : ""} 
                                    ${(deleteMode != -1) ? (index === deleteMode) ? styles.deleteItem : styles.replaceItem : ""}
                                    `}
                                    key={index}
                                    onClick={() => {
                                        if (deleteMode == -1) {
                                            setCurrentIndex(index);
                                            setCurrentRole(roles[index]);
                                        } else if (index != deleteMode) {
                                            deleteRole(roles[deleteMode]._id, role._id);
                                        }
                                    }}> {role.name} </button>
                                {toggleButtons(index)}
                            </div>
                        )
                    })
                    : null}
                {deleteMode == -1 ?
                    <Add resetAllData={resetAllData} roleList={roleList} />
                    : null}
            </div>
        </>
    )
}
