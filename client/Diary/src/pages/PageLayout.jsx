import React, { useEffect } from 'react';
import '../styles/pageLayout.css';
import {
  IconTrash,
  IconArticle,
  IconTextPlus,
  IconLock,
  IconLockOpen
} from "@tabler/icons-react";
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
const { Search } = Input;

const PageLayout = () => {
  const onSearch = (value) => console.log(value);

  return (
    <div className="parent">
      <div className="div1">
        <div className="serchBox">
          <Input style={{ width: "55%" }} placeholder='Search' prefix={<SearchOutlined style={{ color: "pink" }} />} />
        </div>
      </div>
      <div className="div2"> 2 </div>
      <div className="div3"> 3 </div>
      <div className="div4"> 4 </div>
      <div className="div5"> 5 </div>
      <textarea className="div6" contentEditable="true" />
      <div className="div7">
        <Button className="btn" type="primary">Save</Button>
      </div>
    </div>
  )
}

export default PageLayout