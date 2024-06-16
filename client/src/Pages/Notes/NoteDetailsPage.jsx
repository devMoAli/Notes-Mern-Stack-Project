import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleNote, deleteNote } from "../../Redux/Apicalls/noteApicall";
import { toast } from "react-toastify";
import swal from "sweetalert";
import UpdateNoteModal from "./UpdateNoteModal";
import "./noteDetailsPage.css";
import { Icon } from "@iconify/react";

const NoteDetailsPage = () => {
  const dispatch = useDispatch();
  const { note } = useSelector((state) => state.note);
  const { id } = useParams();
  const navigate = useNavigate();
  const [updateNote, setUpdateNote] = useState(false);
  const { categories } = useSelector((state) => state.category);
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchSingleNote(id));
  }, [dispatch, id]);

  // Delete Note Handler
  const deleteNoteHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this note!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteNote(id))
          .then(() => {
            navigate("/", { replace: true });
          })
          .catch((error) => {
            toast.error(
              error.response ? error.response.data.message : error.message
            );
          });
      } else {
        swal("Note deletion cancelled!");
      }
    });
  };

  return (
    <section className="note-details">
      <h1 className="note-details-title">{note?.title}</h1>
      <p className="note-details-content">{note?.content}</p>
      <h1 className="note-details-category">
        <span className="noteCat">Category - </span>
        <span className="noteCate">{note?.category}</span>
      </h1>
      <div className="note-details-icon-wrapper">
        <div>
          <abbr title="Edit Note">
            <Icon
              className="editIcon"
              onClick={() => setUpdateNote(true)}
              icon="marketeq:clipboard-edit-3"
            />{" "}
          </abbr>
          <abbr title="Delete Note">
            <Icon
              className="deleteIcon"
              onClick={deleteNoteHandler}
              icon="material-symbols:delete-forever-rounded"
              color="red"
              width="20"
            />{" "}
          </abbr>
        </div>
      </div>

      {updateNote && (
        <UpdateNoteModal note={note} setUpdateNote={setUpdateNote} categories={categories}  />
      )}
    </section>
  );
};

export default NoteDetailsPage;
