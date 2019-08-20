import React from 'react'
import { Table, Tag } from 'antd';

function IssuesTable(props) {
  const { Column } = Table;
  return (
    <div>
      <Table dataSource={props.issues}>
        <Column title='Title' dataIndex='title' key='title' />
        <Column title='Description' dataIndex='desc' key='desc' />
        <Column title="Tags" dataIndex="tags" key="tags"
          render={tags => (
            <span>
              {tags.map(tag => (
                <Tag color="blue" key={tag}>
                  {tag}
                </Tag>
              ))}
            </span>
          )}
        />
        <Column title="Action" key="action"
          render={(x, y, index) => (
            <button type="button" onClick={() => props.deleteIssue(index)}>
              Delete
              </button>)}
        />
      </Table>
    </div>
  )
}

export default IssuesTable
