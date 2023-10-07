'use client'

import '@/styles/global.scss';
import Sidebar from '@/components/Sidebar';
import styles from '@/styles/header.module.scss';

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className='d-flex flex-row vh-100'>
          <Sidebar />
          <div className={styles.container}>
            <div className={styles.header}>
              header
            </div>
            <div className={styles.content}>
              {children}
            </div>
          </div>
        </div >
      </body>
    </html>
  )
}
