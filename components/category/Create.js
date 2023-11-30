import styles from '@/styles/category.module.scss';
import Image from 'next/image';
import Filemanager from '@/app/dashboard/(main)/filemanager/page';
import { useContext, useState, useEffect } from 'react';
import { cModalContext } from '@/app/contexts/cModal';
import { Row, Col, Button } from 'react-bootstrap';
import { createCategory as RcreateCategory, updateCategory as RupdateCategory } from '@/services/Category';
import toast from 'react-hot-toast';

export default function CreateCategory({ categoryList, updateData, setUpdateData }) {

    const [image, setImage] = useState(null);
    const [name, setName] = useState("");

    const { cModalStatus, cModalUpdater } = useContext(cModalContext);


    const openFilePicker = (type) => {
        cModalUpdater({
            status: true,
            title: null,
            body: <Filemanager selectedFile={(file) => {
                setImage(file);
            }} fileTypes={type} />
        });
    }


    const createCategory = async () => {
        try {
            const { data } = await RcreateCategory({ name, image });
            const { message } = data;
            toast.success(message);
            setImage(null);
            setName("");
            categoryList();
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Something is wrong!');
            }
        }
    }

    const updateCategory = async (category_id) => {
        try {
            const { data } = await RupdateCategory({ category_id: updateData._id, name, image });
            const { message } = data;
            toast.success(message);
            setUpdateData(null);
            categoryList();
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Something is wrong!');
            }
        }
    }

    useEffect(() => {
        if (updateData != null) {
            setImage(updateData.image);
            setName(updateData.name);
        } else {
            setImage(null);
            setName("");
        }
    }, [updateData]);

    return (
        <Row className={styles.imageContainer}>
            <Col className={styles.createCategoryImageConatiner}>
                {image ?
                    <Image alt="Picture of the author"
                        src={image}
                        layout="fill" objectFit="cover"
                    /> : null}
                <div className={styles.controllsContainer}>
                    <input className={styles.inputTitle} value={name} onChange={(e) => { setName(e.target.value) }} />
                    <div className={styles.buttonsContainer}>
                        {image && name != "" ?
                            <Button variant="success" onClick={() => {
                                if (updateData != null) {
                                    updateCategory();
                                } else {
                                    createCategory();
                                }
                            }}>{(updateData != null) ? "Done" : "Create"}</Button>
                            : null}
                        <Button variant="primary" onClick={() => {
                            openFilePicker("image");
                        }}>Select</Button>
                    </div>
                    {updateData != null ?
                        <Button variant="danger" onClick={() => {
                            setUpdateData(null);
                        }}>Cancel  Edit</Button>
                        : null}
                </div>
            </Col>
        </Row>
    )
}
