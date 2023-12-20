'use client'

import styles from '@/styles/createUser.module.scss';
import { Container, Row, Col } from 'react-bootstrap';
import { BsImageFill } from 'react-icons/bs';
import Cinput from '@/components/Cinput';
import DatePicker from '@/components/inputs/DatePicker';
import { useState, useContext } from 'react';
import Roles from '@/components/role/Roles';
import { cModalContext } from '@/app/contexts/cModal';
import Filemanager from '@/app/dashboard/(main)/filemanager/page';
import Image from 'next/image';

export default function createUser() {

    const [currentRole, setCurrentRole] = useState(null);
    const [image, setImage] = useState(null);
    const [userName, setUserName] = useState(null);
    const [fullName, setFullName] = useState(null);
    const [birthday, setBirthday] = useState(null);
    const [nationalCode, setNationalCode] = useState(null);
    const [shebaNumber, setShebaNumber] = useState(null);

    const [resetForm, setResetForm] = useState(false);

    const { cModalStatus, cModalUpdater } = useContext(cModalContext);


    const createUser = () =>{
        //TODO createUserOn SERVER
    }

    const openFilePicker = (type) => {
        cModalUpdater({
            status: true,
            title: null,
            fullSize: true,
            body: <Filemanager selectedFile={(file) => {
                setImage(file);
                console.log(file);
                cModalUpdater({
                    status: false,
                    title: null,
                    fullSize: false,
                    body: null,
                });
            }} fileTypes={type} />
        });
    }

    const openRolePicker = () => {
        cModalUpdater({
            status: true,
            title: null,
            fullSize: false,
            body:
                <Container className={styles.rolesContainer}>
                    <Roles
                        setCurrentRole={(role) => {
                            setCurrentRole(role);
                            cModalUpdater({
                                status: false,
                                title: null,
                                fullSize: false,
                                body: null,
                            });
                        }}
                        setAllpermissions={(permissions) => { }}
                    />
                </Container>
        });
    }

    return (
        <Container fluid className={styles.container}>
            <Row>
                <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }} className={styles.imageContainer} onClick={() => {
                    openFilePicker('image');
                }}>
                    <div className={styles.imageDicContainer}>
                        <div>
                            Text Field
                        </div>
                        <div >
                            You can set your post text in this section...
                        </div>
                    </div>
                    {image != null ?
                        <Image src={image} alt="Picture of the author"
                            layout="responsive"
                            width={500}
                            height={300}
                            onClick={() => {
                                openFilePicker("image");
                            }}
                        />
                        :
                        <BsImageFill className={`${styles.icon}`} />
                    }
                </Col>
            </Row>
            <Row>
                <Container fluid className={styles.inputsContainer}>
                    <Row>
                        <Col lg={{ span: 3, offset: 3 }} md={{ span: 4, offset: 2 }}>
                            <Cinput onChange={(value) => setFullName(value)} value={fullName} icon={<BsImageFill />} placeholder={"Fullname"} />
                            <button className={`${styles.roleButton} ${styles.active} ${styles.margin}`} onClick={() => {
                                openRolePicker();
                            }}> {currentRole == null ? 'Role' : currentRole.name}  </button>
                        </Col>
                        <Col lg={{ span: 3 }} md={{ span: 4 }}>
                            <Cinput onChange={(value) => setUserName(value)} value={userName} icon={<BsImageFill />} placeholder={"Username"} />
                            <DatePicker icon={<BsImageFill />} reset={resetForm} onChange={(time) => setBirthday(time)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }}>
                            <Cinput onChange={(value) => setNationalCode(value)} value={nationalCode} icon={<BsImageFill />} placeholder={"National_code"} />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }}>
                            <Cinput onChange={(value) => setShebaNumber(value)} value={shebaNumber} icon={<BsImageFill />} placeholder={"sheba_Number"} />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }}>
                            <button className={` ${styles.roleButton} ${styles.active}  `}> CreateUser  </button>
                        </Col>
                    </Row>
                </Container>
            </Row>
        </Container>
    )
}
