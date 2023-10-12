'use client'

import '@/styles/global.scss';
import Sidebar from '@/components/Sidebar';
import styles from '@/styles/header.module.scss';
import { toastContext } from '@/app/contexts/errorToast';
import { cModalContext } from '@/app/contexts/cModal';
import { useState, createContext } from 'react';
import ErrorToast from '@/components/toast';
import CModal from '@/components/modal';

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
                  header
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
