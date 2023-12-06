'use client'
import styles from '@/styles/role.module.scss';
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function Role({ }) {
    return (
        <Container fluid className={styles.container}>
            <Row className={styles.row}>

                <Col lg={{ span: "8", order: "1" }} md={{ order: "2" }} xs={{ order: "2" }} className={styles.permissionList}>
                    <div className={styles.ListDisc}>
                        <span><b>Permissions :</b></span>
                        <div>You can see All permissions:</div>
                    </div>
                    <div className={styles.permissionButtonList}>
                        <div className={styles.permissionContainer}>
                            <span className={styles.permissionName}>Permission Name</span>
                            <div className={styles.detailsContainer}>
                                <div className={styles.permissionDetails}>
                                    Id veniam sunt deserunt veniam dolor ipsum.
                                    Id veniam sunt deserunt veniam dolor ipsum. Id veniam sunt deserunt veniam dolor ipsum.
                                </div>
                                <div className={styles.checkBoxContainer}>
                                    <button className={`${styles.customButton} ${styles.active}`}></button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.permissionContainer}>
                            <span className={styles.permissionName}>Permission Name</span>
                            <div className={styles.detailsContainer}>
                                <div className={styles.permissionDetails}>
                                    Id veniam sunt deserunt veniam dolor ipsum.
                                    Id veniam sunt deserunt veniam dolor ipsum. Id veniam sunt deserunt veniam dolor ipsum.
                                </div>
                                <div className={styles.checkBoxContainer}>
                                    <button className={`${styles.customButton} ${styles.active}`}></button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.permissionContainer}>
                            <span className={styles.permissionName}>Permission Name</span>
                            <div className={styles.detailsContainer}>
                                <div className={styles.permissionDetails}>
                                    Id veniam sunt deserunt veniam dolor ipsum.
                                    Id veniam sunt deserunt veniam dolor ipsum. Id veniam sunt deserunt veniam dolor ipsum.
                                </div>
                                <div className={styles.checkBoxContainer}>
                                    <button className={`${styles.customButton} ${styles.active}`}></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col lg={{ span: "2", order: "12" }} md={{ order: "1" }} xs={{ order: "1" }} className={styles.permissionList}>
                    <div className={styles.ListDisc}>
                        <span><b>Roles :</b></span>
                        <div>You can see All roles:</div>
                    </div>
                    <div className={styles.permissionButtonList}>
                        <Button className={styles.roleButton}> Permission 1 </Button>
                        <Button className={styles.roleButton}> Permission 1 </Button>
                        <Button className={styles.roleButton}> Permission 1 </Button>
                        <Button className={styles.roleButton}> Permission 1 </Button>
                        <Button className={styles.roleButton}> Permission 1 </Button>
                        <Button className={styles.roleButton}> Permission 1 </Button>
                        <Button className={styles.roleButton}> Permission 1 </Button>
                        <Button className={styles.roleButton}> Permission 1 </Button>
                        <Button className={styles.roleButton}> Permission 1 </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
