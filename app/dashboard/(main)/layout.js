'use client'

import '@/styles/global.scss';
import Sidebar from '@/components/Sidebar';
import styles from '@/styles/header.module.scss';
import { toastContext } from '@/app/contexts/errorToast';
import { cModalContext } from '@/app/contexts/cModal';
import { useState } from 'react';
import { BsSun, BsBellFill } from 'react-icons/bs';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import ErrorToast from '@/components/toast';
import CModal from '@/components/modal';
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';

export default function Layout({ children }) {

  const [toastStatus, setToastStatus] = useState({
    status: false,
    title: null,
    body: null,
  });

  const toastUpdater = (newState) => {
    setToastStatus((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  /////////////////////////

  const [cModalStatus, setCmodalStatus] = useState({
    status: false,
    title: null,
    body: null,
  });

  const cModalUpdater = (newState) => {
    setCmodalStatus((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  return (
    <html lang="en">
      <body>
        <div className='d-flex flex-row vh-100'>
          <cModalContext.Provider value={{ cModalStatus, cModalUpdater }}>
            <CModal data={cModalStatus} updater={(value) => setCmodalStatus(value)} />

            <toastContext.Provider value={{ toastStatus, toastUpdater }}>
              <ErrorToast data={toastStatus} updater={(value) => setToastStatus(value)} />
              <Sidebar />
              <div className={styles.container}>
                <div className={styles.header}>
                  <Container fluid>
                    <Row>
                      <Col className={styles.headerContainer}>
                        COL 1
                      </Col>
                      <Col xl="auto" className={styles.headerProfile}>
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
                      </Col>
                    </Row>
                  </Container>
                </div>
                <div className={styles.content}>
                  {children}
                </div>
              </div>
            </toastContext.Provider>
          </cModalContext.Provider>
        </div >
      </body>
    </html>
  )
}
