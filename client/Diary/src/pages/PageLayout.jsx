import React, { useEffect, useState } from "react";
import "../styles/pageLayout.css";
import SideNavBar from "../components/SideNavBar";
import ViewPosts from "../components/ViewPosts";
import { useNavigate } from "react-router-dom";
import {
  IconTrash,
  IconArticle,
  IconTextPlus,
  IconLock,
  IconEdit,
  IconLogout,
  IconPlus,
  IconDeviceFloppy,
} from "@tabler/icons-react";
import { Divider } from "antd";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, Space } from "antd";

const PageLayout = () => {
  const [contents, setContents] = useState("");
  const firstName = localStorage.getItem("firstName");

  const content = (
    <div>
      <p>Edit Account</p>
    </div>
  );

  const navigate = useNavigate("");

  const handleLogout = () => {
    // On logout navigate to login page
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    navigate("/");
  };

  const handleClick = () => {
    // Code to save the content
  };

  const handleChange = (value) => {
    setContents(value);
  };

  const handleSave = () => {
    // Do something with the content...
  };

  const modules = {
    toolbar: [
      // Your existing toolbar options...
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["clean"],
    ],
  };

  return (
    <div className="parent">
      <div className="div1">
        <div className="leftNavBar">
          <div className="nameinfo">
            <p className="userName"> Hello, {firstName}</p>
            <IconEdit className="editIcon" />
          </div>
          <Divider style={{ borderColor: "white" }} className="divider">
            <IconArticle style={{ color: "white" }} />
          </Divider>
          <div className="sideBottom">
            <p>Categories</p>
            <p>
              <IconPlus />
            </p>
          </div>
        </div>
      </div>
      <div className="div2">
        <button className="addBtn">
          <span>Add Post </span>
          <IconPlus classname="iconAdd" />
        </button>
      </div>
      <div className="div3" onClick={handleLogout}>
        <button className="logoutButton">
          <span>Logout</span>
          <IconLogout className="logoutIcon" />
        </button>
      </div>
      <div className="div4">
        <ViewPosts />
      </div>
      <div className="div5">
        <ReactQuill
          className="quill"
          contentEditable="true"
          value={contents}
          onChange={handleChange}
          modules={modules}
        />
        <div style={{ textAlign: "center" }}>
          <Button type="primary" style={{ width: "700px" }}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
