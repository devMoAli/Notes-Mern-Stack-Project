import { noteActions } from "../Slices/noteSlice";
import request from "../../Utils/request";
import { toast } from "react-toastify";

// Fetch Notes
export function fetchNotes() {
  return async (dispatch, getState) => {
    try {
      dispatch(noteActions.setLoading());
      const token = getState().auth.user.token;
      const { data } = await request.get("/api/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(noteActions.setNotes(data));
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message);
      dispatch(noteActions.clearLoading());
    }
  };
}

// Fetch Notes Based on Category
export function fetchNotesByCategory(category) {
  return async (dispatch, getState) => {
    try {
      dispatch(noteActions.setLoading());
      const token = getState().auth.user.token;
      const { data } = await request.get(`/api/notes/category/${category}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(noteActions.setNotesCategories(data));
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message);
      dispatch(noteActions.clearLoading());
    }
  };
}
// Filter Notes Based on Search bar
export function filterNotes(searchTerm) {
  return (dispatch) => {
    dispatch(noteActions.setSearchTerm(searchTerm));
    dispatch(fetchNotes()); // Fetch all Notes with the new search term
  };
}

// Reset Notes 
export function resetNotes() {
  return (dispatch) => {
    dispatch(noteActions.setNotes([])); // Clear Notes array
    dispatch(noteActions.setSearchTerm("")); // Reset search term
    dispatch(fetchNotes());
  };
}
// Create Note
export function createNote(newNote) {
  return async (dispatch, getState) => {
    try {
      dispatch(noteActions.setLoading());
      const token = getState().auth.user.token;
      const response = await request.post("/api/notes", newNote, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(noteActions.addNote(response.data));
      dispatch(noteActions.setIsNoteCreated());
      setTimeout(() => dispatch(noteActions.clearIsNoteCreated()), 2000);
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message);
      dispatch(noteActions.clearLoading());
    }
  };
}

// Fetch Single Note
export function fetchSingleNote(noteId) {
  return async (dispatch, getState) => {
    try {
      dispatch(noteActions.setLoading());
      const token = getState().auth.user.token;
      const { data } = await request.get(`/api/notes/${noteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(noteActions.setNote(data)); // Pass fetched note data to setNote action
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message);
    } finally {
      dispatch(noteActions.clearLoading());
    }
  };
}

// Update Note
export function updateNote(updatedNote, noteId) {
  return async (dispatch, getState) => {
    try {
      dispatch(noteActions.setLoading());
      const token = getState().auth.user.token;
      const { data } = await request.put(
        `/api/notes/${noteId}/update`,
        updatedNote,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(noteActions.setNote(data));
      toast.success("Note updated successfully!");
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message);
      dispatch(noteActions.clearLoading());
    }
  };
}

// Delete Note
export function deleteNote(noteId) {
  return async (dispatch, getState) => {
    try {
      dispatch(noteActions.setLoading());
      const token = getState().auth.user.token;
      await request.delete(`/api/notes/${noteId}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(noteActions.deleteNoteSuccess(noteId));
      toast.success("Note deleted successfully");
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message);
      dispatch(noteActions.clearLoading());
    }
  };
}
