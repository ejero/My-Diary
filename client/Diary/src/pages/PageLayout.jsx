import React, { useEffect, useState } from 'react';
import '../styles/pageLayout.css';
import SideNavBar from '../components/SideNavBar';
import {
  IconTrash,
  IconArticle,
  IconTextPlus,
  IconLock,
  IconLockOpen,
  IconDots,
  IconUserCircle,
  IconDotsVertical,
  IconPencil,
  IconEdit
} from "@tabler/icons-react";
import { Divider } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Popover } from 'antd';


const PageLayout = () => {
  const content = (
    <div>
      <p>Edit Account</p>
    </div>
  );

  return (
    <div className="parent">
      <div className="div1">
        <div className="leftNavBar">
          <div className="nameinfo">
            <p className="userName">Jane Doe</p>
            <IconEdit />
          </div>
          <Divider style={{ 'border-color': 'white' }} className='divider'><IconPencil style={{ 'color': 'white' }} /></Divider>
          <p>Categories</p>
        </div>
      </div>
      <div className="div2">
        <div className="list">
          <p>Title note</p>
          <p>Body of the note</p>
        </div>
      </div>
      <div className="div3">
        <ReactQuill className="quill" contentEditable="true" />
      </div>
    </div>
  )
}

export default PageLayout