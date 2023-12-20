import React, { useState, useEffect, useRef } from 'react';
import styles from '@/styles/datepicker.module.scss';

function DatePicker({ icon, onChange, reset, length = 3 }) {

    let inputRefs = useRef(Array.from({ length }, () => React.createRef()));

    const focusNextInput = (index) => {
        const nextIndex = index + 1;
        if (nextIndex < length) {
            inputRefs.current[nextIndex].current.focus();
        }
    };

    const focusPrevInput = (index) => {
        const prevIndex = index - 1;
        if (prevIndex >= 0) {
            inputRefs.current[prevIndex].current.focus();
        }
    };

    const onChangedDates = () => {
        let time = "";
        inputRefs.current.forEach(element => {
            time += element.current.value + "-";
        });
        time = time.substring(0, time.length - 1);
        onChange(time);
    }

    useEffect(() => {
        inputRefs.current.forEach(element => {
            element.current.value = "";
        });
    }, [reset]);


    return (
        <div className={styles.container}>
            <div className={styles.icon}>
                {icon}
            </div>
            <input
                ref={inputRefs.current[0]}
                className={styles.input}
                placeholder='1379'
                onChange={onChangedDates}
                value={inputRefs.current[0].value}
                onKeyDown={(e) => {
                    if (e.key === 'Backspace' && e.currentTarget.value === '') {
                        focusNextInput(0);
                    } else if (e.key >= '0' && e.key <= '9' && e.currentTarget.value.length === 4) {
                        focusPrevInput(0);
                    }
                }}
                maxLength={4}
            />
            <span> / </span>
            <input
                ref={inputRefs.current[1]}
                className={styles.input}
                value={inputRefs.current[0].value}
                placeholder='01'
                onChange={onChangedDates}
                onKeyDown={(e) => {
                    if (e.key === 'Backspace' && e.currentTarget.value === '') {
                        focusNextInput(1);
                    } else if (e.key >= '0' && e.key <= '9' && e.currentTarget.value.length === 2) {
                        focusPrevInput(1);
                    }
                }}
                maxLength={2}
            />
            <span> / </span>
            <input
                ref={inputRefs.current[2]}
                value={inputRefs.current[0].value}
                className={styles.input}
                placeholder='11'
                onChange={onChangedDates}
                onKeyDown={(e) => {
                    if (e.key === 'Backspace' && e.currentTarget.value === '') {
                        focusNextInput(2);
                    } else if (e.key >= '0' && e.key <= '9' && e.currentTarget.value.length === 2) {
                        focusPrevInput(2);
                    }
                }}
                maxLength={2}
            />

        </div>
    );
}



export default DatePicker;