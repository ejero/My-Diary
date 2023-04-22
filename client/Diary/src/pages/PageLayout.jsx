import React, { useEffect, useState } from 'react';
import '../styles/pageLayout.css';
import {
  IconTrash,
  IconArticle,
  IconTextPlus,
  IconLock,
  IconLockOpen
} from "@tabler/icons-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



const PageLayout = () => {

  return (
    <div className="parent">
      <div className="div1"> 1 </div>
      <div className="div2"> 2 </div>
      <div className="div3">
        <ReactQuill className="quill" contentEditable="true" />
      </div>
    </div>
  )
}

export default PageLayout