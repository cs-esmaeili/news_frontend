'use client'

import styles from '@/styles/createUser.module.scss';
import { Container, Row, Col } from 'react-bootstrap';
import { BsImageFill } from 'react-icons/bs';
import Cinput from '@/components/Cinput';
import DatePicker from '@/components/inputs/DatePicker';
// import "react-modern-calendar-datepicker/lib/DatePicker.css";
// import { Calendar } from "react-modern-calendar-datepicker";
import { useState } from 'react';

export default function createUser() {

    const [selectedDay, setSelectedDay] = useState(null);
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

                            <Cinput icon={<BsImageFill />} placeholder={"Role"} />
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
