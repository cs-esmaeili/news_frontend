'use client'
import { Container, Row, Col, Form, Spinner, Button, ProgressBar } from 'react-bootstrap';
import {
    AiOutlineFile,
    AiOutlineFileImage,
    AiOutlineFolder,
    AiOutlineArrowLeft,
    AiOutlineReload,
    AiOutlineDelete,
    AiOutlineUpload,
    AiFillFolderAdd,
    AiOutlineEdit,
} from "react-icons/ai";
import styles from '@/styles/filemanager.module.scss';
import { useState, useEffect, useContext, useRef } from 'react';
import {
    folderFileList as RfolderFileList,
    deleteFolder as RdeleteFolder,
    saveFile as RsaveFile
} from '@/services/Filemanager';
import { toastContext } from '@/app/contexts/errorToast';
import { cModalContext } from '@/app/contexts/cModal';


export default function Home() {

    const [path, setPath] = useState([]);
    const [content, setContent] = useState(null);
    const [baseUrl, setBaseUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [addressBar, setAddressBar] = useState("");
    const [error, setError] = useState(null);
    const [file, setfile] = useState(null);

    const { toastStatus, toastUpdater } = useContext(toastContext);
    const { cModalStatus, cModalUpdater } = useContext(cModalContext);

    const fileInputRef = useRef(null);

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
    const deleteFolder = async (folder) => {
        try {
            let location = [...path];
            location.push(folder);
            const { data } = await RdeleteFolder({ location });
            const { message } = data;
            toastUpdater({
                status: true,
                title: 'Delete Folder',
                body: message,
            });
            folderFileList();
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toastUpdater({
                    status: true,
                    title: 'Delete Folder',
                    body: error.response.data.message,
                });
            } else {
                toastUpdater({
                    status: true,
                    title: 'Delete Folder',
                    body: 'Something is wrong!',
                });
            }
        }
    }

    const saveFile = async (event) => {
        try {
            let formData = new FormData();
            formData.append("location", JSON.stringify(path));
            for (let i = 0; i < event.target.files.length; i++) {
                const file = event.target.files[i];
                formData.append("files[]", file);
            }
            const { data } = await RsaveFile(formData, (persent) => {
                if (persent === 100) {
                    cModalUpdater({
                        status: false,
                        title: null,
                        body: null,
                    });
                } else {
                    cModalUpdater({
                        status: true,
                        title: 'Uploading File ...',
                        body: <ProgressBar now={persent} label={`${persent}%`} />,
                    });
                }
            });
            const { message } = data;
            toastUpdater({
                status: true,
                title: 'Delete Folder',
                body: message,
            });
            folderFileList();
        } catch (error) {
            if (error?.response?.data?.message) {
                toastUpdater({
                    status: true,
                    title: 'Delete Folder',
                    body: error.response.data.message,
                });
            } else {
                toastUpdater({
                    status: true,
                    title: 'Delete Folder',
                    body: 'Something is wrong!',
                });
            }
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
                    <Button variant="outline-danger" style={{ marginLeft: "10px", marginBottom: "7px" }} onClick={() => {
                        deleteFolder("something");
                    }}>
                        <AiOutlineDelete size={"1.3rem"} />
                        <span style={{ marginLeft: "10px" }}>
                            Delete
                        </span>
                    </Button>
                    <Button variant="outline-success" style={{ marginLeft: "10px", marginBottom: "7px" }} onClick={() => {
                        cModalUpdater
                        fileInputRef.current.click();

                    }}>
                        <AiOutlineUpload size={"1.3rem"} />
                        <span style={{ marginLeft: "10px" }}>
                            Upload
                            <input
                                id="file"
                                type="file"
                                accept="image/*"
                                aria-describedby="file"
                                multiple
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                onChange={saveFile}
                            />
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
                    <Button variant="outline-light" style={{ marginLeft: "10px", marginBottom: "7px" }} onClick={() => {
                        folderFileList();
                    }}>
                        <AiOutlineReload size={"1.3rem"} />
                        <span style={{ marginLeft: "10px" }}>
                            Reload
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
