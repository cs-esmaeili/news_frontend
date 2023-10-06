'use client'

import '@/styles/global.scss';
import Sidebar from '@/components/Sidebar';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div style={{ background: "#22252D" }} className='d-flex flex-row vh-100'>
          <Sidebar />
          <div style={{ background: '#2E3139'}} className='flex-grow-1'>
            <div style={{ height: "100px", backgroundColor: "red" }}>
              header
            </div>
            {children}
          </div>
        </div >
      </body>
    </html>
  )
}
