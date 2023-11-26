'use client'
import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from '@/styles/category.module.scss';
import Table from '@/components/Table';
import CreateCategory from '@/components/category/CreateCategory';

export default function Category() {



    return (
        <Container fluid className={styles.container}>
            <CreateCategory  />
            <Table headers={['count', 'head 1', 'head 2', 'head 3']} rows={
                [
                    ['content 1', 'content 2', 'content 3'],
                    ['content 1', 'content 2', 'content 3'],
                    ['content 1', 'content 2', 'content 3'],
                ]
            } />
        </Container>

    )
}
