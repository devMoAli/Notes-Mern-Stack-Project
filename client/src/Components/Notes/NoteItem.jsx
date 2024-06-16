import React from "react";
import { Link } from "react-router-dom";
import "./noteItem.css";

const NoteItem = ({ note }) => {
  return (
    <Link to={`/notes/${note._id}`} className="note-item-link">
      <div className="note-item">
        <h4 className="note-title">{note.title}</h4>
        <div className="note-content-wrapper">
          <p className="note-content">{note.content}</p>
        </div>
        <div className="line"></div>
        <div className="note-category-wrapper">
          <h4 className="note-category">
            <span className="noteCa">Category - </span>
            {note.category}
          </h4>
        </div>
      </div>
    </Link>
  );
};

export default NoteItem;
