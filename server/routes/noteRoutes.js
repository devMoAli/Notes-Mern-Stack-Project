// routes/noteRoutes.js
const router = require("express").Router();
const { verifyToken } = require("../middleware/verifyToken");
const {
  createNoteCtrl,
  getAllNotesCtrl, getNoteById, updateNote,
  getNotesByCategoryCtrl, deleteNote
} = require("../controllers/noteController");

// Create a new note
router.post("/", verifyToken, createNoteCtrl);

// Get all notes for the user
router.get("/", verifyToken, getAllNotesCtrl);

// Get Note by ID for the user
router.get("/:id", verifyToken, getNoteById);

// Update Note 
router.put("/:id/update", verifyToken, updateNote);

// Get notes by category for the user
router.get("/category/:category", verifyToken, getNotesByCategoryCtrl);

// Delete notes 
router.delete('/:id/delete', verifyToken, deleteNote);

module.exports = router;
