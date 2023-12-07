'use client'
import Roles from '../../../../components/role/Roles';
import Permissions from '@/components/role/Permissions';
import styles from '@/styles/role.module.scss';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export default function Role() {

    const [currentRole, setCurrentRole] = useState(null);
    const [allPermissions, setAllPermissions] = useState(null);
    const [updateList, setUpdateList] = useState(false);


    return (
        <Container fluid className={styles.container}>
            <Row className={styles.row}>

                <Col lg={{ span: "8", order: "1" }} md={{ order: "2" }} xs={{ order: "2" }} className={styles.permissionList}>
                    <div className={styles.ListDisc}>
                        <span><b>Permissions :</b></span>
                        <div>You can see All permissions:</div>
                    </div>

                    <div className={styles.permissionButtonList}>
                        <Permissions
                            allPermissions={allPermissions}
                            currentRole={currentRole}
                            setUpdateList={() => setUpdateList(!updateList)}
                        />
                    </div>
                </Col>
                <Col lg={{ span: "2", order: "12" }} md={{ order: "1" }} xs={{ order: "1" }} className={styles.permissionList}>
                    <Roles
                        setCurrentRole={(role) => { setCurrentRole(role); }}
                        setAllpermissions={(permissions) => { setAllPermissions(permissions) }}
                        updateList={updateList}
                    />
                </Col>
            </Row>
        </Container>
    )
}
