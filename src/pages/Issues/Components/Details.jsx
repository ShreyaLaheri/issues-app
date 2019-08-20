import React, { useState } from 'react'
import { Icon, Button, Input } from 'antd';
import AddIssue from './AddIssue';
import IssuesTable from './IssuesTable'

function Details() {
  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);
  const [issues, setIssues] = useState([]);

  const addIssue = (title, desc1, tags) => {
    var issue = {
      title: title,
      desc: desc1,
      tags: tags,
    }
    setIssues([...issues, issue])
  };

  const filterIssues = issues.filter(item => {
    return item.title.includes(value) || item.desc.includes(value)
  })

  const deleteIssue = i => {
    return issues.filter((item, j) => i !== j);
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
        value={value}
      /><br />

      <AddIssue visible={visible} hideModal={() => setVisible(false)} addIssue={addIssue} />

      <IssuesTable issues={filterIssues} deleteIssue={deleteIssue} />
    </div>
  );
}

export default Details
