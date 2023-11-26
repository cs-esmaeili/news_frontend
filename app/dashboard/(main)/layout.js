'use client'

import '@/styles/global.scss';
import Sidebar from '@/components/Sidebar';
import styles from '@/styles/header.module.scss';
import { cModalContext } from '@/app/contexts/cModal';
import { useState, useEffect } from 'react';
import CModal from '@/components/modal';
import Header from '@/components/Header';
import { Toaster } from 'react-hot-toast';

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
  const [showContent, setShowContent] = useState(false);
  const [smallScreen, setSmallScreen] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);



  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 992) {
        setToggleSidebar(false);
      } else {
        setToggleSidebar(true);
      }
      if (window.innerWidth <= 576) {
        setSmallScreen(true);
      } else {
        setSmallScreen(false);
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
      setShowContent(true);
    } else {
      setShowContent(false);
    }
  }, [toggleSidebar]);




  return (
    <html lang="en">
      <body>
        <div className='d-flex flex-row vh-100'>
          <cModalContext.Provider value={{ cModalStatus, cModalUpdater }}>
            <CModal data={cModalStatus} updater={(value) => setCmodalStatus(value)} />
            <Sidebar setSmallMode={setShowContent} toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} />
            <Toaster position="top-right"/>
            {showContent == false ?
              <div className={`${styles.container} ${toggleSidebar ? styles.sideBarIsOpen : styles.sideBarIsClose} ${smallScreen ? styles.smallMode : null}`} >
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
