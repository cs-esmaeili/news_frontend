'use client'

import { useState } from 'react';
import styles from '@/styles/ac.module.scss';

const Accordion = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const items = [
        { id: 1, title: 'Accordion Item 1', content: 'Content 1' },
        { id: 2, title: 'Accordion Item 2', content: 'Content 2' },
        { id: 3, title: 'Accordion Item 3', content: 'Content 3' },
    ];

    const handleClick = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
      };
    return (
        <div className={styles['accordion-item']}>
            {items.map((item, index) => (

                <div key={item.id}>
                    <button
                        className={`${styles['accordion-header']} ${activeIndex === index ? styles.active : ''}`}
                        onClick={() => handleClick(index)}
                    >
                        {item.title}
                    </button>
                    <div
                        className={`${styles['accordion-content']} ${activeIndex === index ? styles.open : ''
                            }`}
                    >
                        {item.content}
                    </div>
                </div>


            ))}
        </div>
    );
};

export default Accordion;