import styles from '@/styles/filemanager.module.scss';
import { cModalContext } from '@/app/contexts/cModal';
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import { PiFolderFill } from "react-icons/pi";
import { BsImageFill } from "react-icons/bs";
import { useContext } from 'react';
import Image from 'next/image';
import Filemanager from '../../app/dashboard/(main)/filemanager/page';

export default function Files({ files, baseUrl, file, setFile, setPath, selectedFile }) {

    const { cModalStatus, cModalUpdater } = useContext(cModalContext);


    const isImageFileName = (fileName) => {
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg'];
        const extension = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));

        return imageExtensions.includes(extension);
    }

    const Folders = (folder, index) => {
        return (
            <Col key={index} lg={2} className={`${styles.file} ${(file == folder) ? styles.fileActive : null}`}
                onClick={() => {

                    setFile(folder);
                }}
                onDoubleClick={() => {
                    setPath(prevPath => [...prevPath, folder]);
                }}
            >
                <div>
                    <PiFolderFill size={"5rem"} className={styles.folder} />
                </div>
                <span className={styles.fileName}>
                    {folder}
                </span>
            </Col>
        );
    }

    const Files = (tempfile, index) => {
        return (
            <Col key={index} lg={2} className={`${styles.file} ${(file == tempfile) ? styles.fileActive : null}`}
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
                    {isImageFileName(tempfile) ?
                        <BsImageFill size={"5rem"} className={styles.image} />
                        :
                        <BsFileEarmarkFill size={"5rem"} className={styles.file} />
                    }
                </div>
                <span className={styles.fileName}>
                    {tempfile}
                </span>
            </Col>
        );
    }
    return (
        <Row>
            {files && files.folders.map((folder, index) => Folders(folder, index))}
            {files && files.files.map((file, index) => Files(file, index))}
        </Row>
    )
}
