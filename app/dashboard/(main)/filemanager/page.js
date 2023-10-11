'use client'
import { Container, Row, Col, Form, Spinner, Button } from 'react-bootstrap';
import {
    AiOutlineFile,
    AiOutlineFileImage,
    AiOutlineFolder,
    AiOutlineArrowLeft,
    AiOutlineArrowRight,
    AiOutlineDelete,
    AiOutlineUpload,
    AiFillFolderAdd,
    AiOutlineEdit,
} from "react-icons/ai";
import styles from '@/styles/filemanager.module.scss';
import { useState, useEffect } from 'react';
import { folderFileList as RfolderFileList } from '@/services/Filemanager';


export default function Home() {

    const [path, setPath] = useState([]);
    const [content, setContent] = useState(null);
    const [baseUrl, setBaseUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [addressBar, setAddressBar] = useState("");
    const [error, setError] = useState(null);

    const isImageFileName = (fileName) => {
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg']; // Add more extensions if needed
        const extension = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));

        return imageExtensions.includes(extension);
    }

    const filterPath = (path) => {
        let temp = path.trim();
        if (temp.startsWith('/')) {
            temp = '' + temp.slice(1);
        }
        if (temp.endsWith('/')) {
            temp = temp.slice(0, -1) + '';
        }
        return temp.split('/');
    }

    const folderFileList = async () => {
        try {
            setBaseUrl(null);
            setContent(null);
            setError(null);
            setLoading(true);
            const { data } = await RfolderFileList({ location: path });
            const { content, baseUrl } = data;
            setContent(content);
            setBaseUrl(baseUrl);
            if (content.folders.length == 0 && content.files.length == 0) {
                setError('مسیر خالی میباشد');
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
        setAddressBar(path.join('/'));
        folderFileList();
    }, [path])

    return (
        <Container className={styles.container} fluid >
            <div className={styles.header}>
                <div>
                    <Button variant="outline-light" style={{ marginBottom: "7px" }} onClick={() => {
                        setPath(prevItems => prevItems.slice(0, -1));
                    }}>
                        <AiOutlineArrowLeft size={"1.3rem"} />
                        <span style={{ marginLeft: "10px" }}>
                            Back
                        </span>
                    </Button>
                    <Button variant="outline-danger" style={{ marginLeft: "10px", marginBottom: "7px" }}>
                        <AiOutlineDelete size={"1.3rem"} />
                        <span style={{ marginLeft: "10px" }}>
                            Delete
                        </span>
                    </Button>
                    <Button variant="outline-success" style={{ marginLeft: "10px", marginBottom: "7px" }}>
                        <AiOutlineUpload size={"1.3rem"} />
                        <span style={{ marginLeft: "10px" }}>
                            Upload
                        </span>
                    </Button>
                    <Button variant="outline-light" style={{ marginLeft: "10px", marginBottom: "7px" }}>
                        <AiFillFolderAdd size={"1.3rem"} />
                        <span style={{ marginLeft: "10px" }}>
                            Add Folder
                        </span>
                    </Button>
                    <Button variant="outline-light" style={{ marginLeft: "10px", marginBottom: "7px" }}>
                        <AiOutlineEdit size={"1.3rem"} />
                        <span style={{ marginLeft: "10px" }}>
                            Rename
                        </span>
                    </Button>
                </div>
                <Form.Group onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        const filteredPath = filterPath(e.target.value);
                        setPath(filteredPath);
                    }
                }}>
                    <Form.Control className={styles.customInput} type="text" value={addressBar} onChange={(e) => {
                        setAddressBar(e.target.value);
                    }} />
                </Form.Group>
            </div>
            <div className={styles.content}>
                {loading ?
                    <div className={styles.spinnerContainer}>
                        <Spinner className={styles.spinner} animation="border" variant="warning" />
                    </div>
                    : null}
                {error ?
                    <div className={styles.spinnerContainer}>
                        <span>{error}</span>
                    </div>
                    : null}
                <Row>
                    {content && content.folders.map((folder, index) =>
                        <Col key={index} lg={2} className={styles.file} onClick={() => {
                            setPath(prevPath => [...prevPath, folder]);
                        }}>
                            <div>
                                <AiOutlineFolder size={"5rem"} />
                            </div>
                            <span className={styles.fileName}>
                                {folder}
                            </span>
                        </Col>
                    )}
                    {content && content.files.map((file, index) =>
                        <Col key={index} lg={2} className={styles.file}>
                            <div>
                                {isImageFileName(file) ?
                                    <AiOutlineFileImage size={"5rem"} />
                                    :
                                    <AiOutlineFile size={"5rem"} />
                                }
                            </div>
                            <span className={styles.fileName}>
                                {file}
                            </span>
                        </Col>
                    )}
                    {/* 
                    {[...Array(30)].map((x, i) =>
                        <>
                            <Col lg={1} className={styles.file}>
                                <div>
                                    <AiOutlineFile size={"5rem"} />
                                </div>
                                <span>
                                    File Name
                                </span>
                            </Col>
                            <Col lg={1} className={styles.file}>
                                <div>
                             
                                </div>
                                <span>
                                    File Name
                                </span>
                            </Col>
                            <Col lg={1} className={styles.file}>
                                <div>
                                    <AiOutlineFolder size={"5rem"} />
                                </div>
                                <span>
                                    File Name
                                </span>
                            </Col>
                        </>
                    )} */}
                </Row>
            </div>
        </Container >
    )
}
