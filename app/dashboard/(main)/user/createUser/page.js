'use client'

import styles from '@/styles/createUser.module.scss';
import { Container, Row, Col } from 'react-bootstrap';
import { BsImageFill } from 'react-icons/bs';
import Cinput from '@/components/Cinput';
import DatePicker from '@/components/inputs/DatePicker';
import { useState, useContext } from 'react';
import Roles from '@/components/role/Roles';
import { cModalContext } from '@/app/contexts/cModal';

export default function createUser() {
    const [currentRole, setCurrentRole] = useState(null);
    const [allPermissions, setAllPermissions] = useState(null);
    const [updateList, setUpdateList] = useState(false);

    const [selectedDay, setSelectedDay] = useState(null);
    const { cModalStatus, cModalUpdater } = useContext(cModalContext);

    const openRolePicker = () => {
        cModalUpdater({
            status: true,
            title: null,
            fullSize: false,
            body:
                <Container className={styles.rolesContainer}>
                    <Roles
                        setCurrentRole={(role) => { setCurrentRole(role); }}
                        setAllpermissions={(permissions) => { }}
                        updateList={updateList}
                    />
                </Container>
        });
    }

    return (
        <Container fluid className={styles.container}>
            <Row>
                <Col md={{ span: 6, offset: 3 }} className={styles.imageContainer}>
                    <div className={styles.imageDicContainer}>
                        <div>
                            Text Field
                        </div>
                        <div >
                            You can set your post text in this section...
                        </div>
                    </div>
                    <BsImageFill className={`${styles.icon}`} />
                </Col>
            </Row>
            <Row>
                <Container fluid className={styles.inputsContainer}>
                    <Row>
                        <Col md={{ span: 3, offset: 3 }}>
                            <Cinput icon={<BsImageFill />} placeholder={"Fullname"} />
                            <button className={`${styles.roleButton} ${styles.active} ${styles.margin}`} onClick={() => {
                                openRolePicker();
                            }}> Role  </button>
                        </Col>
                        <Col md={{ span: 3 }}>
                            <Cinput icon={<BsImageFill />} placeholder={"Username"} />
                            <DatePicker icon={<BsImageFill />} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ span: 6, offset: 3 }}>
                            <Cinput icon={<BsImageFill />} placeholder={"National_code"} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ span: 6, offset: 3 }}>
                            <Cinput icon={<BsImageFill />} placeholder={"sheba_Number"} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ span: 2, offset: 5 }}>
                            <button className={` ${styles.roleButton} ${styles.active}  `}> CreateUser  </button>
                        </Col>
                    </Row>
                </Container>
            </Row>
        </Container>
    )
}
