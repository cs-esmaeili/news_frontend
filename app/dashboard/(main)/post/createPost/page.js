'use client'

import { Container, Row, Col } from "react-bootstrap";
import { PiRectangleBold, PiTextAaFill } from "react-icons/pi";
import { VscLayoutSidebarLeft } from "react-icons/vsc";
import { RiCloseFill } from "react-icons/ri";
import { AiTwotoneVideoCamera } from "react-icons/ai";
import { BsImageFill } from 'react-icons/bs';
import styles from '@/styles/createPost.module.scss';
import { useState, useEffect, useContext, useRef } from 'react';
import Filemanager from '../../filemanager/page';
import { cModalContext } from '@/app/contexts/cModal';
import VideoJS from '@/components/videoPlayer';
import Image from 'next/image';

export default function Home() {

    const { cModalStatus, cModalUpdater } = useContext(cModalContext);


    const scrollContainerRef = useRef(null);
    const [content, setContent] = useState(
        [
            // [{ type: "text", content: "this is text 1" }, { type: "image", content: "this is text 2" }],
            // [{ type: "text", content: "this is text 3" }, { type: "text", content: "this is text 4" }],
            // [{ type: "text", content: "this is text 5" }]
        ]
    );

    useEffect(() => {
        console.log(content);
    }, [content]);

    const openFilePicker = (parentIndex, childIndex, type) => {
        cModalUpdater({
            status: true,
            title: null,
            body: <Filemanager selectedFile={(file) => {
                let temp = [...content];
                temp[parentIndex][childIndex].type = type;
                temp[parentIndex][childIndex].content = file;
                setContent(temp);
            }} fileTypes={type} />
        });
    }
    const card = (index, header, body, activeType) => {
        const { parentIndex, childIndex } = index;
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
                            temp[parentIndex][childIndex].content = "";
                            setContent(temp);
                        }} />
                        <BsImageFill className={`${styles.icon} ${styles.green} ${(activeType == "image") ? styles.active : ""}`} onClick={() => {
                            let temp = [...content];
                            temp[parentIndex][childIndex].type = "image";
                            temp[parentIndex][childIndex].content = "";
                            setContent(temp);
                        }} />
                        <AiTwotoneVideoCamera className={`${styles.icon} ${styles.blue} ${(activeType == "video") ? styles.active : ""}`} onClick={() => {
                            let temp = [...content];
                            temp[parentIndex][childIndex].type = "video";
                            temp[parentIndex][childIndex].content = "";
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
        <Container fluid className={styles.container} ref={scrollContainerRef}>
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
                            (content[parentIndex][childIndex].content == "") ?
                                <BsImageFill className={`${styles.icon} ${styles.green} ${styles.active}`}
                                    style={{ fontSize: "10rem", borderStyle: "none" }}
                                    onClick={() => {
                                        openFilePicker(parentIndex, childIndex, "image");
                                    }} /> :
                                <Image src={content[parentIndex][childIndex].content} alt="Picture of the author"
                                    layout="responsive"
                                    width={500}
                                    height={300}
                                    onClick={() => {
                                        openFilePicker(parentIndex, childIndex, "image");
                                    }}
                                />
                            ,
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
                            (content[parentIndex][childIndex].content == "") ?
                                <AiTwotoneVideoCamera className={`${styles.icon} ${styles.blue} ${styles.active}`}
                                    style={{ fontSize: "10rem", borderStyle: "none" }}
                                    onClick={() => {
                                        openFilePicker(parentIndex, childIndex, "video");
                                    }} />
                                :
                                <VideoJS options={{
                                    autoplay: false,
                                    controls: true,
                                    responsive: true,
                                    fluid: true,
                                    sources: [{
                                        src: content[parentIndex][childIndex].content,
                                        type: 'video/mp4'
                                    }]
                                }} />
                            ,
                            "video"
                        ) : null}
                    </Col>
                ))}

            </Row>
            <div className={styles.newRow}>
                <PiRectangleBold className={styles.icon} onClick={() => {
                    let temp = [...content];
                    temp.push([{ type: "text", content: "" }]);
                    setContent(temp);
                }} />
                <VscLayoutSidebarLeft className={styles.icon} onClick={() => {
                    let temp = [...content];
                    temp.push([{ type: "text", content: "" }, { type: "text", content: "" }]);
                    setContent(temp);
                }} />
            </div>
        </Container>
    )
}
