import React from 'react';
import './issues.css';
import { Layout, Icon } from 'antd';
import { BrowserRouter as Route, Link } from "react-router-dom";
import Details from './Components/Details'

function Issues() {
  const { Header } = Layout;

  return (
    <div className="Issues">
      <Layout className="layout">
        <Header className="header">
          <span>Issues App</span>
          <Link to="/"><Icon className="icon" type="poweroff" /></Link>
        </Header>
        <Details />
      </Layout>
    </div>
  )
}

export default Issues
