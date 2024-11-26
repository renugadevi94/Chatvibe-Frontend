
import React from "react";
import { FaUserAlt } from "react-icons/fa";

const Avatar = ({ userId, username, online }) => {
  const color = [
    "#3498db",
    "#2ecc71",
    "#f1c40f",
    "#f39c12",
    "#3ccc50",
    "#1abc9c",
    "#48dbfb",
    "#ff9f43",
    "#ff9ff3",
    "#A3CB38",
  ];
  const userIdBase10 = parseInt(userId, 16);
  return (
    <div
      className='online__user__img'
      style={{ backgroundColor: `${color[userIdBase10 % 10]}` }}
    >
      {username ? username[0] : <FaUserAlt />}
      <div className={`online__user__status ${online ? "" : "offline"}`}></div>
    </div>
  );
};

export default Avatar;
