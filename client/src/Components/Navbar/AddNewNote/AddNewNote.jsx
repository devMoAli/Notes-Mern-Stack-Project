import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NoteModal from "./Modal/AddNewNoteModal";
import "./addNewNotes.css";
import { toast } from "react-toastify";
import { fetchCategories } from "../../../Redux/Apicalls/categoryApicall";

const AddNewNote = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const { categories } = useSelector((state) => state.category);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const openModal = () => {
    if (user) {
      setIsModalOpen(true);
    } else {
      toast.warn("Please log in to add a new note.", {
        onClose: () => {
          navigate("/login");
        },
      });
    }
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="button-wrapper">
      <button className="add-note-button" onClick={openModal}>
        <span className="add-note-button-text">Add New Note</span>
      </button>
      {isModalOpen && (
        <>
          <div className="modal-overlay" onClick={closeModal}></div>
          <NoteModal categories={categories} closeModal={closeModal} />
        </>
      )}
    </div>
  );
};

export default AddNewNote;
