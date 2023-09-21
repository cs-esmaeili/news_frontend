'use client'
import { FloatingLabel, Container, Row, Col, Button, Form as bootstrapForm } from 'react-bootstrap';
import styles from '@/styles/logIn.module.scss';
import { logInSchema } from '@/validations/logIn';
import { useFormik, Formik, Field } from 'formik';
import Image from 'next/image'
import { useState } from 'react';
export const Home = () => {

  const [show, setShow] = useState(false);
  const [update, setUpdate] = useState(false);

  const handelSubmit = async ({ userName, passWord }) => {
    console.log(userName, passWord);
  };

  const formik = useFormik({
    initialValues: {
      userName: '',
      passWord: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: logInSchema,
    onSubmit: values => handelSubmit(values),
  });

  return (
    <Container fluid className={styles.container}>
      <Row>
        <Image src="/logo.png" alt="Picture of the author"
          className='align-self-center'
          width={400}
          height={400} />
      </Row>
      <Row style={{ width: '100%' }} className='justify-content-center'>
        <Col xxl={3} xl={4} lg={5} sm={8} className='d-flex flex-column'>
          <form onSubmit={formik.handleSubmit}>

            <FloatingLabel
              controlId="floatingInput"
              label="Username"
              className={styles.floatLabel}
            >
              <bootstrapForm.Control className={styles.floatInput} name="userName" placeholder=""
                onChange={(e) => {
                  formik.handleChange(e);
                  formik.setFieldError('userName', '');
                }}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  formik.setFieldError('userName', '');
                }}
                value={formik.values.userName}
              />
              {formik.errors.userName && formik.touched.userName ? <div className={styles.error}>{formik.errors.userName}</div> : null}
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="passWord"
              className={styles.floatLabel}
            >
              <bootstrapForm.Control className={styles.floatInput} name="passWord" placeholder=""
                onChange={(e) => {
                  formik.handleChange(e);
                  formik.setFieldError('passWord', '');
                }}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  formik.setFieldError('passWord', '');
                }}
                value={formik.values.passWord}
              />
              {formik.errors.passWord && formik.touched.passWord ? <div className={styles.error} >{formik.errors.passWord}</div> : null}
            </FloatingLabel>
            <Button type="submit">Submit</Button>
          </form>
        </Col>
      </Row>
    </Container>
  )
}

export default Home;