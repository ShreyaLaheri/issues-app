import React, { useState } from 'react';
import logo from '../../logo.svg';
import './SignIn.css';
import { Card, Input, Button } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import client from '../../client';

const Wrapper = withRouter(({ history }) => (
  <SignIn history={history} />
))

function SignIn(props) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const login = () => {
    client.login(email, pass).then(res => {
      if (!res.ack) {
        alert('Error logging in')
        return;
      }
      props.history.push('/issues');
    })
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      login()
    }
  }

  return (
    <div className="SignIn">
      <img src={logo} className="SignIn-logo" alt="logo" />
      <p className="welcome">WELCOME BACK !</p>
      <Card className="Card">
        <p className="signinText">SIGN IN</p>
        <Input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <Input className="input" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} onKeyDown={handleEnter}/> <br />
        <span>Don't have an account? </span>
        <Link to="/SignUp">Sign up here.</Link><br />
        <Button className="button" type="primary" onClick={login}>SIGN IN NOW</Button>
      </Card>
    </div>
  )
}

export default Wrapper
