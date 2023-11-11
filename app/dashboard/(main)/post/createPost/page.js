'use client'

import { Container, Row, Col } from "react-bootstrap";
import { PiRectangleBold, PiTextAaFill } from "react-icons/pi";
import { VscLayoutSidebarLeft } from "react-icons/vsc";
import { RiCloseFill } from "react-icons/ri";
import { AiTwotoneVideoCamera } from "react-icons/ai";
import { BsImageFill } from 'react-icons/bs';
import styles from '@/styles/createPost.module.scss';
import { useState, useEffect, useContext, useRef } from 'react';

export default function Home() {

    const [content, setContent] = useState(
        [
            [{ type: "text", content: "this is text 1" }, { type: "image", content: "this is text 2" }],
            [{ type: "text", content: "this is text 3" }, { type: "text", content: "this is text 4" }],
            [{ type: "text", content: "this is text 5" }]
        ]
    );
    const card = (index, header, body, activeType) => {
        const { parentIndex, childIndex } = index;
        { console.log(parentIndex, childIndex) }
        return (
            <Container fluid className={styles.cardNewPost}>
                <Row className={styles.cardHeader}>
                    <Col>
                        {header}
                    </Col>
                    <Col lg="auto">

                        <PiTextAaFill className={`${styles.icon} ${styles.yellow} ${(activeType == "text") ? styles.active : ""}`} onClick={() => {
                            let temp = [...content];
                            temp[parentIndex][childIndex].type = "text";
                            setContent(temp);
                        }} />
                        <BsImageFill className={`${styles.icon} ${styles.green} ${(activeType == "image") ? styles.active : ""}`} onClick={() => {
                            let temp = [...content];
                            temp[parentIndex][childIndex].type = "image";
                            setContent(temp);
                        }} />
                        <AiTwotoneVideoCamera className={`${styles.icon} ${styles.blue} ${(activeType == "video") ? styles.active : ""}`} onClick={() => {
                            let temp = [...content];
                            temp[parentIndex][childIndex].type = "video";
                            setContent(temp);
                        }} />


                        <RiCloseFill className={`${styles.icon} ${styles.red}`} onClick={() => {
                            let temp = [...content];
                            if (temp.length - 1 == 0) {
                                temp.splice(parentIndex, 1);
                            } else {
                                temp[parentIndex].splice(childIndex, 1);
                            }
                            setContent(temp);
                        }} />
                    </Col>
                </Row>
                <Row className={styles.cardBody}>
                    {body}
                </Row>
            </Container>
        );
    }

    return (
        <Container fluid className={styles.container}>
            <div className={styles.newRow}>
                <PiRectangleBold className={styles.icon} />
                <VscLayoutSidebarLeft className={styles.icon} />
            </div>
            <Row>
                {content && content.map((ParentContent, parentIndex) => ParentContent.map((ChildContent, childIndex) =>
                    <Col lg={(ParentContent.length == 2) ? 6 : 12}>
                        {ChildContent.type == "text" ? card({ parentIndex, childIndex },
                            <>
                                <div>
                                    Text Field
                                </div>
                                <div className={styles.headerDisc}>
                                    You can set your post text in this section...
                                </div>
                            </>,
                            <textarea type="text" className={styles.textInput} />,
                            "text"
                        ) : null}
                        {ChildContent.type == "image" ? card({ parentIndex, childIndex },
                            <>
                                <div>
                                    Text Field
                                </div>
                                <div className={styles.headerDisc}>
                                    You can set your post text in this section...
                                </div>
                            </>,
                            <textarea type="text" className={styles.textInput} />,
                            "image"
                        ) : null}
                        {ChildContent.type == "video" ? card({ parentIndex, childIndex },
                            <>
                                <div>
                                    Text Field
                                </div>
                                <div className={styles.headerDisc}>
                                    You can set your post text in this section...
                                </div>
                            </>,
                            <textarea type="text" className={styles.textInput} />,
                            "video"
                        ) : null}
                    </Col>
                ))}

            </Row>
        </Container>
    )
}
