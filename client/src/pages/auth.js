import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { Context } from '../index.js';
import { login } from '../http/userApi.js';
import { observer } from "mobx-react-lite";
import { DASHBOARD_ROUTE } from '../utils/consts.js';

const Auth = observer(() => {
  const { user } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [errors, setErrors] = useState({});

  const signIn = async () => {
    try {
      let data = await login(email, password);
      user.setUser(data);
      user.setIsAuth(true);
      history.push(DASHBOARD_ROUTE);
    } catch (e) {
      setErrors({
        email: e.response.data.message,
        password: e.response.data.message
      });
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const newErrors = findFormErrors();
    Object.keys(newErrors).length > 0 ? setErrors(newErrors) : signIn();
  }

  const findFormErrors = () => {
    const newErrors = {};
    if (!email || email === '') newErrors.email = 'cannot be blank!';
    if (!password || password === '') newErrors.password = 'cannot be blank!';

    return newErrors;
  }


  return (<main className="content border d-flex align-items-center justify-content-center align-items-center">
    <div className="tab-content inputBlock ">
      <div
        className="tab-pane fade show active"
        id="pills-login"
        role="tabpanel"
        aria-labelledby="tab-login">
        <Form>
          <Form.Group className="form-outline mb-3">
            <Form.Control
              type="text"
              id="loginName"
              autoComplete="no"
              className="form-control"
              placeholder="Enter your username"
              onChange={e => setEmail(e.target.value)}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.email}
            </Form.Control.Feedback>
            <Form.Label>Email</Form.Label>
          </Form.Group>
          <Form.Group className="form-outline mb-3">
            <Form.Control
              type="password"
              id="loginPassword"
              autoComplete="no"
              className="form-control"
              placeholder="Enter your password"
              onChange={e => setPassword(e.target.value)}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.password}
            </Form.Control.Feedback>
            <Form.Label>Password</Form.Label>
          </Form.Group>
          <Button type="submit" onClick={handleSubmit} className="btn btn-primary btn-block" >Sign in</Button>
          <Link to="/registration">
            <Button className="btn btn-secondary btn-block" style={{ float: "right" }}>Registration</Button>
          </Link>
        </Form>
      </div>
    </div>
  </main>
  )
});

export default Auth;