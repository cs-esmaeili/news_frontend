'use client'

import '@/styles/global.scss';
import Sidebar from '@/components/Sidebar';
import styles from '@/styles/header.module.scss';
import { toastContext } from '@/app/contexts/errorToast';
import { cModalContext } from '@/app/contexts/cModal';
import { useState, useEffect } from 'react';
import CModal from '@/components/modal';
import Header from '@/components/Header';


export default function Layout({ children }) {


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
  const [smallMode, setSmallMode] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);



  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 992) {
        setToggleSidebar(false);
      } else {
        setToggleSidebar(true);
      }
    };
    handleResize();


    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 576 && toggleSidebar == true) {
      setSmallMode(true);
    } else {
      setSmallMode(false);
    }
  }, [toggleSidebar]);


  return (
    <html lang="en">
      <body>
        <div className='d-flex flex-row vh-100'>
          <cModalContext.Provider value={{ cModalStatus, cModalUpdater }}>
            <CModal data={cModalStatus} updater={(value) => setCmodalStatus(value)} />
              <Sidebar setSmallMode={setSmallMode} toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} />
              {smallMode == false ?
                <div className={styles.container}>
                  <div className={styles.header}>
                    <Header changeSideBarStatus={() => setToggleSidebar(!toggleSidebar)} />
                  </div>
                  <div className={styles.content}>
                    {children}
                  </div>
                </div>
                :
                null
              }

          </cModalContext.Provider>
        </div >
      </body>
    </html>
  )
}
