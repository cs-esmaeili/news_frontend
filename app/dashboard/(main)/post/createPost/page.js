'use client'

import { Container, Row, Col, Button } from "react-bootstrap";
import { PiRectangleBold, PiTextAaFill } from "react-icons/pi";
import { VscLayoutSidebarLeft } from "react-icons/vsc";
import { RiCloseFill } from "react-icons/ri";
import { AiTwotoneVideoCamera } from "react-icons/ai";
import { BsImageFill } from 'react-icons/bs';
import styles from '@/styles/createPost.module.scss';
import { useState, useEffect, useContext, useRef } from 'react';
import Filemanager from '../../filemanager/page';
import Category from '../../category/page';
import { cModalContext } from '@/app/contexts/cModal';
import VideoJS from '@/components/videoPlayer';
import Cinput from '@/components/Cinput';
import { createPost as RcreatePost } from '@/services/Post';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function CreatePost() {

    const { cModalStatus, cModalUpdater } = useContext(cModalContext);

    const prevCountRef = useRef();
    const scrollContainerRef = useRef(null);
    const [content, setContent] = useState(
        [
            // [{ type: "text", content: "this is text 1" }, { type: "image", content: "this is text 2" }],
            // [{ type: "text", content: "this is text 3" }, { type: "text", content: "this is text 4" }],
            // [{ type: "text", content: "this is text 5" }]
        ]
    );
    const [category, setCategory] = useState(null);

    const createPost = async () => {
        try {
            const { data } = await RcreatePost({});
            const { content, baseUrl } = data;
            setContent(content);
            setBaseUrl(baseUrl);
            if (content.folders.length == 0 && content.files.length == 0) {
                toast.error('Something is wrong!');
            }
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError('Something is wrong!');
            }
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        const prevCount = prevCountRef.current;
        if (prevCount < content.length) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
        prevCountRef.current = content.length;
    }, [content]);

    const openFilePicker = (parentIndex, childIndex, type) => {
        cModalUpdater({
            status: true,
            title: null,
            fullSize: true,
            body: <Filemanager selectedFile={(file) => {
                let temp = [...content];
                temp[parentIndex][childIndex].type = type;
                temp[parentIndex][childIndex].content = file;
                setContent(temp);
            }} fileTypes={type} />
        });
    }
    const openCategoryPicker = () => {
        cModalUpdater({
            status: true,
            title: null,
            fullSize: false,
            body: <Category pickMode selectedCategory={(value) => {
                setCategory(value);
                cModalUpdater({
                    status: false,
                    title: null,
                    fullSize: false,
                    body: null
                });
            }} />
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
                            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
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
            <Row className={styles.globalInformation}>
                <Col>
                    <Cinput placeholder="Title" icon={<BsImageFill className={styles.searchBarIcon} />} />
                </Col>
                <Col>
                    <Cinput placeholder="Discription" icon={<BsImageFill className={styles.searchBarIcon} />} />
                </Col>
                <Col>
                    <Button variant="success" className={styles.categoryButton} onClick={() => {
                        openCategoryPicker();
                    }}>{category != null ? category.name : "Pick Category"}</Button>
                </Col>
            </Row>
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
            <div className={styles.submitRow}>
                <Button variant="outline-danger" className={styles.cbutton} onClick={() => {
                    setContent([]);
                }}>Delete</Button>
                <Button variant="success" className={styles.cbutton} onClick={() => {

                }}>Submit</Button>
            </div>
        </Container>
    )
}
