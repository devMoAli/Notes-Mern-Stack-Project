import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes } from "../../Redux/Apicalls/noteApicall";
import NoteList from "./NoteList";

const Notes = () => {
  const dispatch = useDispatch();
  
  const { notes } = useSelector((state) => state.note);
  const { searchTerm } = useSelector((state) => state.note);

  useEffect(() => {
    dispatch(fetchNotes());
    window.scrollTo(0, 0);
  }, [dispatch]);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="notes-page">
      <NoteList notes={filteredNotes} />
    </div>
  );
};

export default Notes;
