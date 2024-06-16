import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "./updateNoteModal.css";
import { Icon } from "@iconify/react";
import { updateNote } from "../../Redux/Apicalls/noteApicall";

const UpdateNoteModal = ({ note, setUpdateNote, categories }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const dispatch = useDispatch();

  // Initialize selected categories from note data
  useEffect(() => {
    setSelectedCategories(
      note.category.split(", ").filter((cat) => cat !== "")
    );
  }, [note]);

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleSave = async () => {
    const updatedNote = {
      title,
      content,
      category: selectedCategories.join(", "),
    };

    try {
      await dispatch(updateNote(updatedNote, note._id));
      setUpdateNote(false);
    } catch (error) {
      toast.error("Failed to update note!");
    }
  };

  return (
    <>
      <div className="modal-overlay" onClick={() => setUpdateNote(false)}></div>
      <div className="update-note-modal">
        <div className="modal-header">
          <h2>
            Edit Note <Icon className="edit-icon" icon="line-md:edit-twotone" />
          </h2>
          <abbr title="close">
            <Icon
              className="close-icon"
              icon="material-symbols:tab-close"
              color="orange"
              onClick={() => setUpdateNote(false)}
            />
          </abbr>
        </div>
        <div className="modal-body">
          <label className="input-label">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
          />
          <label className="input-label">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="textarea-field"
          ></textarea>

          {/* Categories Area */}
          <div className="categories-area-updateNoteModal">
            <label className="input-label">Categories</label>
            <div className="categories-list-updateNoteModal">
              {categories &&
                categories.map((category) => (
                  <button
                    key={category._id}
                    className={`category-tag ${
                      selectedCategories.includes(category.title)
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => toggleCategory(category.title)}
                  >
                    {category.title}
                  </button>
                ))}
            </div>

            {/* New Category Input */}
            <input
              type="text"
              placeholder="New Category ..."
              className="input-addNoteFieldModal"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
          <button
            className="cancel-button"
            onClick={() => setUpdateNote(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateNoteModal;
