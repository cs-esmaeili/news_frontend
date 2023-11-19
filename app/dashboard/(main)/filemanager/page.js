'use client'
import styles from '@/styles/filemanager.module.scss';
import { PiKeyReturnBold, PiMagnifyingGlassBold } from 'react-icons/pi';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { TfiReload } from "react-icons/tfi";
import { useState, useEffect } from 'react';
import { folderFileList as RfolderFileList } from '@/services/Filemanager';

import Delete from '@/components/filemanager/Delete';
import Upload from '@/components/filemanager/Upload';
import Rename from '@/components/filemanager/Rename';
import Folder from '@/components/filemanager/Folder';
import Files from '@/components/filemanager/Files';

export default function FileManager({ selectedFile = null }) {

    const [path, setPath] = useState([]);
    const [content, setContent] = useState(null);
    const [baseUrl, setBaseUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [file, setfile] = useState(null);

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
        folderFileList();
    }, [path]);
    useEffect(() => {
        if (selectedFile != null && file != null && file.includes('.')) {
            selectedFile(baseUrl + file);
        }
    }, [file]);


    return (
        <Container className={styles.container} fluid >
            <Row className={styles.headerContainer}>
                <Col>
                    <TfiReload className={`${styles.icons}`} onClick={() => {
                        folderFileList();
                    }} />
                    <PiKeyReturnBold className={`${styles.icons}`} onClick={() => {
                        setPath(prevItems => prevItems.slice(0, -1));
                    }} />

                    <Delete path={path} file={file} reloadFileList={folderFileList} />
                    <Upload path={path} reloadFileList={folderFileList} />
                    <Rename path={path} file={file} reloadFileList={folderFileList} />
                    <Folder path={path} reloadFileList={folderFileList} />

                </Col>
                <Col>
                    <span className={styles.floationPanelFirstRow}>
                        {path == "" ? "Home" : path.join(' > ')}
                    </span>
                </Col>
                <Col>
                    <div className={styles.searchBar}>
                        <PiMagnifyingGlassBold className={styles.searchBarIcon} />
                        <input className={styles.searchInput} placeholder='search something...' />
                    </div>
                </Col>
            </Row>
            <Row className={styles.fileContainer}>
                <Container fluid className={styles.files}>
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
                    <Files files={content}
                        baseUrl={baseUrl}
                        file={file}
                        setFile={setfile} setPath={setPath}
                        selectedFile={selectedFile} />
                </Container>
            </Row>
        </Container>
    )
}
