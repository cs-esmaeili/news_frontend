import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import styles from '@/styles/sidebar.module.scss';
import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import Image from 'next/image';
import Link from "next/link";
import { FiMail } from "react-icons/fi";

const Sidebar = () => {

  const [activeIndex, setActiveIndex] = useState(null);
  const [toggleSidebar, setToggleSidebar] = useState(true);


  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className={styles.sidebarwrapper} data-collapse={toggleSidebar}>

      <button className={styles.btn}
        onClick={() => {
          if (!toggleSidebar == false) {
            setActiveIndex(null);
          }
          setToggleSidebar(!toggleSidebar);

        }}>
        <MdKeyboardArrowRight />
      </button>

      <div className={`${styles.sidebar}  ${toggleSidebar ? styles.open : ''}`} >
        <div className={styles.sidebartop}>
          <Image className={styles.sidebarlogo} src="/logo.png" alt="Picture of the author"
            width={400}
            height={400} />
          <p className={styles.sidebarlogoname} >
            The Brave Coders
          </p>
        </div>
        <ul className={styles.sidebarlist}>

          <li onClick={() => { handleClick(1); setToggleSidebar(true); }}>
            <div className={styles.sidebarlink}>
              <div className={styles.sidebarNameIcon}>
                <span className={styles.sidebaricon}>
                  <FiMail />
                </span>
                <span className={styles.sidebarname}>
                  Home
                </span>
              </div>
              <div className={`${styles.accordioncontent} ${activeIndex === 1 ? styles.open : ''}`} >
                <ListGroup as="ol" numbered>
                  <ListGroup.Item className={styles.listgroupitem} as="li">Cras justo odio</ListGroup.Item>
                  <ListGroup.Item className={styles.listgroupitem} as="li">Cras justo odio</ListGroup.Item>
                  <ListGroup.Item className={styles.listgroupitem} as="li">Cras justo odio</ListGroup.Item>
                </ListGroup>
              </div>
            </div>
          </li>
          <li onClick={() => { handleClick(2); setToggleSidebar(true); }}>
            <div className={styles.sidebarlink}>
              <div className={styles.sidebarNameIcon}>
                <span className={styles.sidebaricon}>
                  <FiMail />
                </span>
                <span className={styles.sidebarname}>
                  Home
                </span>
              </div>
              <div className={`${styles.accordioncontent} ${activeIndex === 2 ? styles.open : ''}`} >
                <ListGroup as="ol" numbered>
                  <ListGroup.Item className={styles.listgroupitem} as="li">Cras justo odio</ListGroup.Item>
                  <ListGroup.Item className={styles.listgroupitem} as="li">Cras justo odio</ListGroup.Item>
                  <ListGroup.Item className={styles.listgroupitem} as="li">Cras justo odio</ListGroup.Item>
                </ListGroup>
              </div>
            </div>
          </li>


        </ul>
      </div>
    </div >
  );
};
export default Sidebar;