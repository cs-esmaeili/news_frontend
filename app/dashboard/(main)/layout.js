'use client'

import '@/styles/global.scss';
import Sidebar from '@/components/Sidebar';
import styles from '@/styles/header.module.scss';
import { toastContext } from '@/app/contexts/errorToast';
import { useState, createContext } from 'react';
import ErrorToast from '@/components/toast';

export default function Layout({ children }) {

  const [status, setStatus] = useState({
    status: false,
    title: null,
    body: null,
  });

  const updateStatus = (newState) => {
    setStatus((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  return (
    <html lang="en">
      <body>
        <div className='d-flex flex-row vh-100'>
          <toastContext.Provider value={{ status, updateStatus }}>
            <ErrorToast data={status} updater={(value) => setStatus(value)} />
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
        </div >
      </body>
    </html>
  )
}
