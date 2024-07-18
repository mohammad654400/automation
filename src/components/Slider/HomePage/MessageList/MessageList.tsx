import { useState } from "react";
import "./MessageList.css";

const MessageList = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxHeight: "100%",
        maxWidth: "100%",
        backgroundColor:"white"
      }}
    >
      <h3 className="title">دست نویس من</h3>
      <div className="listNote"></div>
      <button className="buttonNote">
        <p className="textNote">نوشتن کار جدید</p>
        <h2 className="iconNote">+</h2>
      </button>
    </div>
  );
};
export default MessageList;
