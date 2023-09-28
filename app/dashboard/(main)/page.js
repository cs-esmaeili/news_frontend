'use client'
import Sidebar from '@/components/Sidebar';

export default function Home() {
    return (
        <div style={{ background: "#22252D" }} className='d-flex flex-row vh-100'>
            <Sidebar  />
            <div style={{ background: 'green' }} className='flex-grow-1'>
                Content
            </div>
        </div >
    )
}
