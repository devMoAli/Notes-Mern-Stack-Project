import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "note",
  initialState: {
    notes: [],
    notesCategories: [],
    loading: false,
    isNoteCreated: false,
    note: null,
    searchTerm: "",
  },
  reducers: {
    setNotes(state, action) {
      state.notes = action.payload;
    },
    setNotesCategories(state, action) {
      state.notesCategories = action.payload;
    },

    setLoading(state) {
      state.loading = true;
    },
    clearLoading(state) {
      state.loading = false;
    },
    setIsNoteCreated(state) {
      state.isNoteCreated = true;
      state.loading = false;
    },
    clearIsNoteCreated(state) {
      state.isNoteCreated = false;
    },
    setNote(state, action) {
      state.note = action.payload;
    },
    addNote(state, action) {
      state.notes.push(action.payload);
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    deleteNoteSuccess(state, action) {
      const noteIdToDelete = action.payload;
      state.notes = state.notes.filter((note) => note._id !== noteIdToDelete);
    },
  },
});

const noteReducer = noteSlice.reducer;
const noteActions = noteSlice.actions;

export { noteActions, noteReducer };
