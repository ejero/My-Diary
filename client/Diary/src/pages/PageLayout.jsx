import React, { useEffect, useState } from "react";
import "../styles/pageLayout.css";
import SideNavBar from "../components/SideNavBar";
import { useNavigate } from "react-router-dom";
import {
  IconTrash,
  IconArticle,
  IconTextPlus,
  IconLock,
  IconEdit,
  IconLogout,
  IconPlus,
} from "@tabler/icons-react";
import { Divider } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Popover } from "antd";

const PageLayout = () => {
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
          </div>
        </div>
      </div>
      <div className="div2">
        <div className="list">
          <button className="addBtn">
            <span>Add Post </span>
            <IconPlus classname="iconAdd" />
          </button>
          <p>Title note</p>
          <p>Body of the note</p>
        </div>
      </div>

      <div className="div3">
        <ReactQuill className="quill" contentEditable="true" />
      </div>
      <div className="div4" onClick={handleLogout}>
        <button className="logoutButton">
          <span>Logout</span>
          <IconLogout className="logoutIcon" />
        </button>
      </div>
    </div>
  );
};

export default PageLayout;
