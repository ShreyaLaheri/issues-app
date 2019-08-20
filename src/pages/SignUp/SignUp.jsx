import React, { useState } from 'react';
import logo from '../../logo.svg';
import './SignUp.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { Card, Input, Button } from 'antd';
import client from '../../client';

const Wrapper = withRouter(({ history }) => (
  <SignUp history={history} />
))

function SignUp(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const signUp = () => {
    client.signUp(email, username, pass).then(res => {
      if (!res.ack) {
        alert('Error signing up')
        return;
      }
      props.history.push('/issues');
    })
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      signUp()
    }
  }

  return (
    <div className="SignUp">
      <img src={logo} className="SignUp-logo" alt="logo" />
      <p className="welcome">GET STARTED !</p>
      <Card className="Card">
        <p className="signupText">SIGN UP</p>
        <Input className="input" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input className="input" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} onKeyDown={handleEnter} /> <br />
        <span>Already have an account? </span>
        <Link to="/">Sign in here.</Link><br />
        <Button className="button" type="primary" onClick={signUp}>SIGN UP NOW</Button>
      </Card>
    </div>
  )
}

export default Wrapper
