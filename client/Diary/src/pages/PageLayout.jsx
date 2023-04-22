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
    <div class="parent">
      <div class="div1"> 1 </div>
      <div class="div2"> 2 </div>
      <ReactQuill className="div3" contentEditable="true" />
    </div>
  )
}

export default PageLayout