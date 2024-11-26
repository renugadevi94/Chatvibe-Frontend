import React from "react";
import Avatar from "../components/Avatar";

const Contact = ({
  userId,
  selectedContact,
  setSelectedContact,
  username,
  online,
}) => {
  return (
    <div
      className={`online__user  ${userId === selectedContact ? "active" : ""}`}
      key={userId}
      onClick={() => setSelectedContact(userId)}
    >
      <Avatar
        online={online}
        username={username}
        userId={userId}
      />
      <span>{username}</span>
    </div>
  );
};

export default Contact;