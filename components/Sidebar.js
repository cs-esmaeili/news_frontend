import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import styles from '@/styles/sidebar.module.scss';
import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import Image from 'next/image';
import Link from "next/link";
import { FiMail } from "react-icons/fi";
import { useSpring, animated } from 'react-spring';

const Sidebar = () => {

  const [expanded, setExpanded] = useState(false);


  const panelAnimation = useSpring({
    maxHeight: expanded ? '1000px' : '0px',
    opacity: expanded ? 1 : 0,
    overflow: 'hidden',
    transition: `max-height ${expanded ? '500ms' : '50ms'}, opacity 10ms`,
  });

  return (
    <div className={styles.sidebarwrapper}>
      <button className={styles.btn}>
        <MdKeyboardArrowRight />
      </button>
      <div className={styles.sidebar} >
        <div className={styles.sidebartop}>
          <Image className={styles.sidebarlogo} src="/logo.png" alt="Picture of the author"
            width={400}
            height={400} />
          <p className={styles.sidebarlogoname} >
            The Brave Coders
          </p>
        </div>
        <ul className={styles.sidebarlist}>
          <li onClick={() => setExpanded(!expanded)}>
            <div
              className={styles.sidebarlink}
              href={"w"}
            >
              <div className={styles.sidebarNameIcon}>
                <span className={styles.sidebaricon}>
                  <FiMail />
                </span>
                <span className={styles.sidebarname}>
                  Home
                </span>
              </div>
              <animated.div style={panelAnimation}>
                <div>
                  <ListGroup as="ol" numbered>
                    <ListGroup.Item className={styles.listgroupitem} as="li" onClick={() => console.log("dwaw")}>Cras justo odio</ListGroup.Item>
                    <ListGroup.Item className={styles.listgroupitem} as="li">Cras justo odio</ListGroup.Item>
                    <ListGroup.Item className={styles.listgroupitem} as="li">Cras justo odio</ListGroup.Item>
                  </ListGroup>
                </div>
              </animated.div>
            </div>
          </li>
          <li onClick={() => setExpanded(!expanded)}>
            <div
              className={styles.sidebarlink}
              href={"w"}
            >
              <div className={styles.sidebarNameIcon}>
                <span className={styles.sidebaricon}>
                  <FiMail />
                </span>
                <span className={styles.sidebarname}>
                  Home
                </span>
              </div>
              <animated.div style={panelAnimation}>
                <div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
              </animated.div>
            </div>
          </li>
        </ul>
      </div>
    </div >
  );
};
export default Sidebar;