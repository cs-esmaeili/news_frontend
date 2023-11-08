import { BsSun, BsBellFill, BsLayoutSidebarInset } from 'react-icons/bs';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { TiThMenu } from 'react-icons/ti';
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import styles from '@/styles/header.module.scss';
import { useState } from 'react';

const Header = ({ changeSideBarStatus }) => {
    const [open, setOpen] = useState(false);
    return (
        <Container fluid>
            <Row>
                <Col xs="auto" className={styles.clollapsButton}>
                    <BsLayoutSidebarInset className={styles.clollapsButton} onClick={() => {
                        changeSideBarStatus();
                    }} />
                </Col>
                <Col className={styles.headerContainer}>
                    COL 1
                </Col>
                <Col xl="auto" sm="auto" xs="auto" >
                    <TiThMenu className={styles.menuButton} onClick={() => {
                        setOpen(!open);
                    }} />
                    <div className={`${styles.collapsAnimation} ${open == true ? styles.open : ''}`}>

                        <div className={styles.headerProfile}>
                            <BsSun className={styles.icons} />
                            <span className={styles.bellContainer}>
                                <BsBellFill className={styles.icons} />
                                <span className={styles.bellNumber}>
                                    3
                                </span>
                            </span>
                            <Image className={styles.profileImage} src="/logo.png" alt="Picture of the author"
                                width={50}
                                height={50} />
                            <div className={styles.ProfileTexts}>
                                <div>Profile name</div>
                                <div>Admin</div>
                            </div>
                            <IoIosArrowDropdownCircle className={styles.collapsButton} />
                        </div>
                    </div>
                </Col>

            </Row>
        </Container>
    )
}
export default Header;