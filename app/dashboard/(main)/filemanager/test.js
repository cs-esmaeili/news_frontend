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
    saveFile as RsaveFile,
    createFolder as RcreateFolder,
    deleteFile as RdeleteFile,
    renameFolder as RrenameFolder,
    renameFile as RrenameFile,
} from '@/services/Filemanager';
import { toastContext } from '@/app/contexts/errorToast';
import { cModalContext } from '@/app/contexts/cModal';
import Image from 'next/image';


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
    const deleteFolder = async () => {
        try {
            let location = [...path];
            location.push(file);
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
    const deleteFile = async () => {
        try {
            let location = [...path];
            const { data } = await RdeleteFile({ location, fileName: file });
            const { message } = data;
            toastUpdater({
                status: true,
                title: 'Delete File',
                body: message,
            });
            folderFileList();
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toastUpdater({
                    status: true,
                    title: 'Delete File',
                    body: error.response.data.message,
                });
            } else {
                toastUpdater({
                    status: true,
                    title: 'Delete File',
                    body: 'Something is wrong!',
                });
            }
        }
    }

    const createFile = async (folderName) => {
        try {
            const { data } = await RcreateFolder({ location: path, folderName });
            const { message } = data;
            toastUpdater({
                status: true,
                title: 'create Folder',
                body: message,
            });
            folderFileList();
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toastUpdater({
                    status: true,
                    title: 'create Folder',
                    body: error.response.data.message,
                });
            } else {
                toastUpdater({
                    status: true,
                    title: 'create Folder',
                    body: 'Something is wrong!',
                });
            }
        }
    }
    const renameFolder = async (newName) => {
        try {
            const { data } = await RrenameFolder({ location: path, oldName: file, newName });
            const { message } = data;
            toastUpdater({
                status: true,
                title: 'Rename Folder',
                body: message,
            });
            folderFileList();
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toastUpdater({
                    status: true,
                    title: 'Rename Folder',
                    body: error.response.data.message,
                });
            } else {
                toastUpdater({
                    status: true,
                    title: 'Rename Folder',
                    body: 'Something is wrong!',
                });
            }
        }
    }
    const renameFile = async (newName) => {
        try {
            const { data } = await RrenameFile({ location: path, oldName: file, newName });
            const { message } = data;
            toastUpdater({
                status: true,
                title: 'Rename File',
                body: message,
            });
            folderFileList();
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toastUpdater({
                    status: true,
                    title: 'Rename File',
                    body: error.response.data.message,
                });
            } else {
                toastUpdater({
                    status: true,
                    title: 'Rename File',
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
                title: 'File Upload',
                body: message,
            });
            folderFileList();
        } catch (error) {
            if (error?.response?.data?.message) {
                toastUpdater({
                    status: true,
                    title: 'File Upload',
                    body: error.response.data.message,
                });
            } else {
                toastUpdater({
                    status: true,
                    title: 'File Upload',
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
                        if (!file.includes(".")) {
                            deleteFolder(file);
                        } else {
                            deleteFile(file);
                        }
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
                    <Button variant="outline-light" style={{ marginLeft: "10px", marginBottom: "7px" }} onClick={() => {
                        cModalUpdater({
                            status: true,
                            title: 'Create Folder',
                            body: <Form.Control className={styles.customInput} autoFocus type="text" onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    createFile(e.target.value);
                                    cModalUpdater({
                                        status: false,
                                        title: null,
                                        body: null,
                                    });
                                }
                            }} />,
                        });
                    }}>
                        <AiFillFolderAdd size={"1.3rem"} />
                        <span style={{ marginLeft: "10px" }}>
                            Add Folder
                        </span>
                    </Button>
                    <Button variant="outline-light" style={{ marginLeft: "10px", marginBottom: "7px" }} onClick={() => {
                        cModalUpdater({
                            status: true,
                            title: 'Rename...',
                            body: <Form.Control className={styles.customInput} autoFocus type="text" onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    if (file.includes(".")) {
                                        renameFile(e.target.value);
                                    } else {
                                        renameFolder(e.target.value);
                                    }
                                    cModalUpdater({
                                        status: false,
                                        title: null,
                                        body: null,
                                    });
                                }
                            }} />,
                        });
                    }}>
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
                    <div className={styles.spinnerContainer} >
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
                        <Col key={index} lg={2} className={`${styles.file} ${(file == folder) ? styles.fileActive : null}`}
                            onDoubleClick={() => {
                                setPath(prevPath => [...prevPath, folder]);
                            }}
                            onClick={() => {
                                setfile(folder);
                            }}>
                            <div>
                                <AiOutlineFolder size={"5rem"} />
                            </div>
                            <span className={styles.fileName}>
                                {folder}
                            </span>
                        </Col>
                    )}
                    {content && content.files.map((tempfile, index) =>
                        <Col key={index} lg={2} className={`${styles.file} ${(file == tempfile) ? styles.fileActive : null}`}
                            onClick={() => {
                                setfile(tempfile);
                            }}
                            onDoubleClick={() => {
                                const loadImageModal = (loading) => {
                                    const element = (
                                        <Container>
                                            <Row>
                                                {(loading) ?
                                                    <div className={styles.spinnerContainerModal} >
                                                        <Spinner className={styles.spinner} animation="border" variant="warning" />
                                                    </div>
                                                    : null}
                                                <Image
                                                    onLoad={() => {
                                                        loadImageModal(false);
                                                    }}
                                                    loader={() => (baseUrl + tempfile)}
                                                    src={baseUrl + tempfile}
                                                    alt="Picture of the author"
                                                    width={500}
                                                    height={500} />
                                            </Row>
                                        </Container>
                                    );
                                    cModalUpdater({
                                        status: true,
                                        title: "image",
                                        body: element,
                                    });
                                }

                                if (isImageFileName(tempfile)) {
                                    loadImageModal(true);
                                }
                            }}>

                            <div>
                                {isImageFileName(tempfile) ?
                                    <AiOutlineFileImage size={"5rem"} />
                                    :
                                    <AiOutlineFile size={"5rem"} />
                                }
                            </div>
                            <span className={styles.fileName}>
                                {tempfile}
                            </span>
                        </Col>
                    )}
                </Row>
            </div>
        </Container >
    )
}
