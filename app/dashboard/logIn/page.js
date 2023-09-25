'use client'
import { FloatingLabel, Container, Row, Col, Alert, Button, Form as bootstrapForm } from 'react-bootstrap';
import styles from '@/styles/logIn.module.scss';
import { logIn } from '@/services/Authorization';
import { logInSchema } from '@/validations/logIn';
import { useFormik } from 'formik';
import Image from 'next/image'
import { useState } from 'react';
import { setCookie } from 'cookies-next';
import axios from "axios";

export const Home = () => {

  const [isLoading, setLoading] = useState(false);
  const [show, setShow] = useState(null);

  const handelSubmit = async ({ userName, passWord }) => {
    setShow("");
    setLoading(true);
    try {
      const { data } = await logIn({ userName, passWord });
      const token = data.token;
      var d = new Date();
      d.setTime(d.getTime() + (30 * 60 * 1000));
      setCookie('token', token, { expires: d });
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log("log In Shod");
      router.push('/dashboard');
    } catch (error) {
      if (error.hasOwnProperty('response')) {
        setShow(error.response.data.message);
      } else {
        console.log(error);
        setShow('Something is wrong!');
      }
    } finally {
      setLoading(false);
    }
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
                  setShow(null);
                }}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  formik.setFieldError('userName', '');
                  setShow(null);
                }}
                value={formik.values.userName}
              />
              {formik.errors.userName && formik.touched.userName ? <div className={styles.error}>{formik.errors.userName}</div> : null}
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Password"
              className={styles.floatLabel}
            >
              <bootstrapForm.Control className={styles.floatInput} name="passWord" placeholder=""
                onChange={(e) => {
                  formik.handleChange(e);
                  formik.setFieldError('passWord', '');
                  setShow(null);
                }}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  formik.setFieldError('passWord', '');
                  setShow(null);
                }}
                value={formik.values.passWord}
              />
              {formik.errors.passWord && formik.touched.passWord ? <div className={styles.error} >{formik.errors.passWord}</div> : null}
            </FloatingLabel>
            {show ?
              <Alert key="danger" variant="danger">
                <div className={styles.finalError}>{show}</div>
              </Alert>
              : null}
            <Button
              type="submit"
              variant='outline-warning'
              className={styles.button}
              disabled={isLoading}>
              {isLoading ? "Loading...." : "Enter"}
            </Button>
          </form>
        </Col>
      </Row>
    </Container>
  )
}
export default Home;