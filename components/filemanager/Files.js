import styles from '@/styles/filemanager.module.scss';
import { cModalContext } from '@/app/contexts/cModal';
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import { PiFolderFill } from "react-icons/pi";
import { BsImageFill, BsFileEarmarkFill } from "react-icons/bs";
import { AiTwotoneVideoCamera } from "react-icons/ai";
import { useContext } from 'react';
import Image from 'next/image';
import Filemanager from '../../app/dashboard/(main)/filemanager/page';

export default function Files({ files, baseUrl, file, setFile, setPath, selectedFile, fileTypes }) {

    const { cModalStatus, cModalUpdater } = useContext(cModalContext);


    const isImageFileName = (fileName) => {
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg'];
        const extension = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));

        return imageExtensions.includes(extension);
    }
    const isVideoFileName = (fileName) => {
        const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.wmv'];
        const extension = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));

        return videoExtensions.includes(extension);
    };

    const fileIcon = (tempfile) => {
        if (isImageFileName(tempfile)) {
            return (<BsImageFill size={"3.5rem"} className={styles.image} />);
        } else if (isVideoFileName(tempfile)) {
            return (<AiTwotoneVideoCamera size={"3.5rem"} className={styles.video} />);
        } else {
            return (<BsFileEarmarkFill size={"3.5rem"} className={styles.file} />);
        }
    }

    const Folders = (folder, index) => {
        return (
            <Col key={index} xl={(selectedFile) ? 2 : 1} lg={(selectedFile) ? 2 : 1} md={2} sm={3} className={`${styles.file} ${(file == folder) ? styles.fileActive : null}`}
                onClick={() => {
                    setFile(folder);
                }}
                onDoubleClick={() => {
                    setPath(prevPath => [...prevPath, folder]);
                }}
            >
                <div>
                    <PiFolderFill size={"3.5rem"} className={styles.folder} />
                </div>
                <span className={styles.fileName}>
                    {folder}
                </span>
            </Col>
        );
    }

    const Files = (tempfile, index) => {
        return (
            <Col key={index} xl={(selectedFile) ? 2 : 1} lg={(selectedFile) ? 2 : 1} md={2} sm={3} className={`${styles.file} ${(file == tempfile) ? styles.fileActive : null}`}
                onClick={() => {
                    setFile(tempfile);
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
                            status: true,
                            title: "image",
                            body: element,
                            footer: (selectedFile != null) ? <Button onClick={() => {
                                cModalUpdater({
                                    status: true,
                                    title: null,
                                    body: <Filemanager selectedFile={selectedFile} />,
                                });
                            }}>Back</Button> : null,
                        });
                    }

                    if (isImageFileName(tempfile)) {
                        loadImageModal(true);
                    }
                }}>
                <div>
                    {fileIcon(tempfile)}
                </div>
                <span className={styles.fileName}>
                    {tempfile.substring(tempfile.length - 10, tempfile.length)}
                </span>
            </Col>
        );
    }
    return (
        <Row>
            {files && files.folders.map((folder, index) => {
                if (file == null && index == 0) {
                    setFile(folder);
                }
                return Folders(folder, index);
            })}
            {files && files.files.map((file, index) => {
                if (file == null && index == 0) {
                    setFile(file);
                }

                if (fileTypes == null) {
                    return Files(file, index);
                } else if (fileTypes == "image" && !isImageFileName(file)) {
                    return null;
                } else if (fileTypes == "video" && !isVideoFileName(file)) {
                    return null;
                } else {
                    return Files(file, index);
                }
            })}
        </Row>
    )
}
