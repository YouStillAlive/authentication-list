import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NotificationModal from '../components/notificationModal';
import { Button, Form } from 'react-bootstrap';
import { DEFAULT_ROUTE } from '../utils/consts.js';
import { registration } from '../http/userApi.js';

function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [errors, setErrors] = useState({});
  const handleShow = () => { setShow(true); }

  const record = async () => {
    try {
      await registration(name, email, password);
      handleShow();
    } catch (e) {
      setErrors({
        email: e.response.data.message,
        password: ''
      });
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      record();
    }
  }

  const findFormErrors = () => {
    const newErrors = {};
    if (!name || name === '') newErrors.name = 'cannot be blank!';
    else if (name.length >= 30) newErrors.name = 'name is too long!';
    if (!email || email === '') newErrors.email = 'cannot be blank!';
    else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
      newErrors.email = 'Invalid email address';
    if (!password || password === '') newErrors.password = 'cannot be blank!';
    else if (repeatPassword !== password) newErrors.repeatPassword = 'Password mismatch';

    return newErrors;
  }

  const handleEnterPress = (e) => {
    if (e.key === 'Enter' && !show) {
      handleSubmit(e);
    }
    // else if (e.key === 'Enter' && show) {
    //   handleClose();
    // }
  }

  return (<main className="content border d-flex align-items-center justify-content-center align-items-center">
    <div className="tab-content inputBlock">
      <Form onKeyPress={handleEnterPress} >
        <Form.Group className="form-outline mb-3">
          <Form.Control
            type="text"
            id="registerName"
            autoComplete="no"
            className="form-control"
            placeholder="Enter your name here"
            onChange={e => setName(e.target.value)}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.name}
          </Form.Control.Feedback>
          <Form.Label>Name</Form.Label>
        </Form.Group>
        <Form.Group className="form-outline mb-3">
          <Form.Control
            type="text"
            id="registerEmail"
            autoComplete="no"
            className="form-control"
            placeholder="Enter your email"
            onChange={e => setEmail(e.target.value)}
            isInvalid={!!errors.email} />
          <Form.Control.Feedback type='invalid'>
            {errors.email}
          </Form.Control.Feedback>
          <Form.Label>Email</Form.Label>
        </Form.Group>
        <Form.Group className="form-outline mb-3">
          <Form.Control
            type="password"
            id="registerPassword"
            autoComplete="no"
            className="form-control"
            placeholder="Enter your password"
            onChange={e => setPassword(e.target.value)}
            isInvalid={!!errors.password} />
          <Form.Control.Feedback type='invalid'>
            {errors.password}
          </Form.Control.Feedback>
          <Form.Label>Password</Form.Label>
        </Form.Group>
        <Form.Group className="form-outline mb-3 ">
          <Form.Control
            type="password"
            id="registerRepeatPassword"
            autoComplete="no"
            className="form-control "
            placeholder="Repeat your password"
            onChange={e => setRepeatPassword(e.target.value)}
            isInvalid={!!errors.repeatPassword} />
          <Form.Control.Feedback type='invalid'>
            {errors.repeatPassword}
          </Form.Control.Feedback>
          <Form.Label>Repeat password</Form.Label>
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit}>Signs in</Button>
        <Link to={DEFAULT_ROUTE}>
          <NotificationModal
            show={show}
            handleShow={handleShow}
            handleClose={handleClose}
            head="Success"
            body="Congratulations, you have successfully registered!"
          >
          </NotificationModal>
        </Link>
        <Link to={DEFAULT_ROUTE}>
          <Button variant="secondary" className="btn btn-block registrationBut" style={{ float: "right" }}>Previous</Button>
        </Link>
      </Form>
    </div>
  </main>);
}

export default Registration;