import "./addNewNoteModal.css";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createNote } from "../../../../Redux/Apicalls/noteApicall";
import { useNavigate } from "react-router-dom";

function NoteModal({ closeModal, categories }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleSave = () => {
    if (!title || !content) {
      toast.error("Title and Content are required");
      return;
    }

    // Create new note object
    const newNote = {
      title,
      content,
      category:
        selectedCategories.length > 0 ? selectedCategories.join(", ") : "",
    };

    // If a new category is provided and not in selectedCategories, add it
    if (
      newCategory.trim() !== "" &&
      !selectedCategories.includes(newCategory.trim())
    ) {
      newNote.category +=
        (newNote.category.length > 0 ? ", " : "") + newCategory.trim();
    }

    try {
      dispatch(createNote(newNote));
      closeModal();
      navigate("/");
    } catch (error) {
      toast.error("Failed to create note!");
    }
  };

  return (
    <div className="addNoteModal">
      {/* Modal Header */}
      <div className="addNoteModal-header">
        <div className="addNoteModal-title">
          Add New Note <Icon className="editIco" icon="fxemoji:notepad" />
        </div>
        <abbr title="close">
          <i className="update-profile-form-close">
            <Icon
              icon="material-symbols:tab-close"
              color="orange"
              onClick={closeModal}
            />
          </i>
        </abbr>
      </div>

      {/* Note Modal Inputs */}
      <div className="addNoteModal-content">
        <label className="input-label-addNoteFieldModal">Title</label>
        <input
          type="text"
          placeholder="Note Title ..."
          className="input-addNoteFieldModal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Content Area */}
        <div className="content-area-addNoteFieldModal">
          <label className="input-label-addNoteFieldModal">Content</label>
          <textarea
            placeholder="Add Note Content Here ..."
            className="textarea-field-addNoteFieldModal"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          {/* Categories Area */}
          <div className="categories-area-addNoteModal">
            <label className="input-label-addNoteFieldModal">Categories</label>
            <div className="categories-list-addNoteModal">
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

          {/* Save Button */}
          <div className="save-button-container">
            <button className="save-button" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteModal;
