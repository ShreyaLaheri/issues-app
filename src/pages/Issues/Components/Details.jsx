import React, { useState, useEffect } from 'react'
import { Icon, Button, Input } from 'antd';
import AddIssue from './AddIssue';
import IssuesTable from './IssuesTable'
import client from '../../../client'

function Details() {
  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);
  const [issues, setIssues] = useState([]);


  useEffect(() => {
    // Acts as ComponentDidMount
    client.getIssues().then(res => {
      if (!res.ack) {
        alert('Could not update todo');
        return;
      }
      console.log('Issues:', res.issues)
      setIssues(res.issues);
    })
  }, []);

  const addIssue = (title, desc, tags) => {
    var issue = {
      title: title,
      desc: desc,
      tags: tags,
    }
    client.addIssue(title, desc, tags).then(res => {
      if (!res.ack) {
        alert('Could not add issue');
        return;
      }
      setIssues([...issues, issue])
    })
  };

  const deleteIssue = id => {
    client.deleteIssue(id).then(res => {
      if (!res.ack) {
        alert('Could not delete issue');
        return;
      }
      setIssues(issues.filter((i, j) => id !== i._id));
      console.log(issues)
    })
  }

  const searchIssue = (e,value) => {
    console.log('Searching issues')
    if (e.key === 'Enter') {
      client.searchIssue(value).then(res => {
        if (!res.ack) {
          alert('Could not search issue');
          return;
        }
        setIssues(res.issues);
      })
    }
  }

  return (
    <div className="content">
      <div className="tFlex">
        <div className="mText">
          <span className="project">space-cloud</span><br />
          <span className="title">Lorem ipsum dolor sit amet, consectetur adipiscing elit</span>
        </div>
        <Button type="primary" onClick={() => setVisible(true)}>
          Add an issue
          </Button>
      </div>

      <Input className="search"
        prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="Search"
        style={{ width: 450 }}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => searchIssue(e, value)}
      /><br />

      <AddIssue visible={visible} hideModal={() => setVisible(false)} addIssue={addIssue} />

      <IssuesTable issues={issues} deleteIssue={deleteIssue} />
    </div>
  );
}

export default Details
