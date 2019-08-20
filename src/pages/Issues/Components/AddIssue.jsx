import React, { useState } from 'react'
import { Modal, Input, Tag, Button } from 'antd';

function AddIssue(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setTags(tags.concat(tag))
      setTag('')
    }
  }

  const onAdd = (e) => {
    props.addIssue(title, description, tags)
    props.hideModal()
    setTitle('')
    setDescription('')
    setTag('')
    setTags([])
  }

  const listItems = tags.map((tag) =>
    <Tag>{tag}</Tag>
  );

  return (
    <div>
      <Modal
        title="Add an issue"
        visible={props.visible}
        onCancel={props.hideModal}

        footer={[
          <Button type="primary" onClick={props.hideModal}>Cancel</Button>,
          <Button key="submit" type="primary" onClick={onAdd}>Add</Button>,
        ]}
      >

        <div>
          <span>Title: </span>
          <Input name="title" className="add-title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>

        <div>
          <span>Description: </span>
          <Input name="description" className="add-desc"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>

        <div>
          <span>Tags: </span>
          <Input name="tag" className="add-tags"
            onChange={(e) => setTag(e.target.value)}
            onKeyDown={handleKeyDown}
            value={tag}
          />
        </div>

        <div className="list-tags">
          {listItems}
        </div>
      </Modal>
    </div>
  )
}

export default AddIssue
