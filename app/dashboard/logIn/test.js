'use client'
import styles from '@/styles/logIn.module.scss';
import { FloatingLabel, Container, Row, Col, Button, Form } from 'react-bootstrap';
import { logInSchema } from '@/validations/logIn';
import { Formik, Field } from 'formik';
import Image from 'next/image'
import { useState } from 'react';

const Home = () => {

  const [show, setShow] = useState(false);
  const handelSubmit = async ({ username, password }) => {
    console.log(username, password);
  };


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

          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            validationSchema={logInSchema}
            onSubmit={values => {
              handelSubmit(values);
            }}
          >
            {({ errors, touched }) => (
              <Form >
                <div className="form-group">
                  <Field className="form-control form-control-user" name="username" placeholder="نام کاربری"
                  />
                  {errors.username && touched.username ? (
                    <div>{errors.username}</div>
                  ) : null}
                </div>


                <div className="form-group">
                  <Field className="form-control form-control-user" name="password" placeholder="رمز عبور"
                  />
                  {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                  ) : null}
                </div>
                {show &&
                  <div className="alert alert-danger" role="alert" style={{ textAlign: "center" }}>
                    نام کاربری یا رمز عبور اشتباه است
                  </div>
                }
                <button type="submit" className="btn btn-primary btn-user btn-block">
                  ورود
                </button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container >
  )
}
export default Home;