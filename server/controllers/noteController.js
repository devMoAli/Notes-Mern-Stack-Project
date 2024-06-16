// controllers/noteController.js

const {
  Note,
  validateCreateNote,
  validateUpdateNote,
} = require("../models/noteModel");
const asyncHandler = require("express-async-handler");
/**-----------------------------------------------
 * @desc    Create New Note
 * @route   /api/notes
 * @method  POST
 * @access  private (only logged in user)
 ------------------------------------------------*/
module.exports.createNoteCtrl = asyncHandler(async (req, res) => {
  // 1. Validation for data
  const { error } = validateCreateNote(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  // 2. Create new note and save it to DB
  const note = await Note.create({
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
    user: req.user.id,
  });
  await note.save();
  // 3. Send response to the client
  res.status(201).json(note);
});
/**-----------------------------------------------
 * @desc    Get All Notes for User
 * @route   /api/notes
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getAllNotesCtrl = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const notes = await Note.find({ user: userId }).sort({ createdAt: -1 });
  res.json(notes);
});

/**-----------------------------------------------
 * @desc    Get Notes by Category
 * @route   /api/notes/category
 * @method  GET
 * @access  private (only logged in user)
 ------------------------------------------------*/
module.exports.getNotesByCategoryCtrl = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const { category } = req.params;
    const notes = await Note.find({ user: userId, category });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**-----------------------------------------------
 * @desc    Get a note by ID
 * @route   /api/notes/:id
 * @method  GET
 * @access  private (only logged in user)
 ------------------------------------------------*/
module.exports.getNoteById = asyncHandler(async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

/**-----------------------------------------------
 * @desc    Update note 
 * @route   /api/notes/:id/update
 * @method  POST
 * @access  private (only logged in user)
 ------------------------------------------------*/
module.exports.updateNote = asyncHandler(async (req, res) => {
  // 1. Validation
  const { error } = validateUpdateNote(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { title, content, category } = req.body;
  const noteId = req.params.id;

  try {
    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // 2. Check if this note belongs to the logged-in user
    if (req.user.id !== note.user.toString()) {
      return res
        .status(403)
        .json({ message: "Access denied, you are not allowed" });
    }

    // 3. Update the note
    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { $set: { title, content, category } },
      { new: true }
    );

    res.json(updatedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
/**-----------------------------------------------
 * @desc    Delete note 
 * @route   /api/notes/:id/delete
 * @method  POST
 * @access  private (only logged in user)
 ------------------------------------------------*/
module.exports.deleteNote = asyncHandler(async (req, res) => {
  const noteId = req.params.id;
  const userId = req.user && req.user.id ? req.user.id : null;

  if (!userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized: User ID is missing" });
  }

  try {
    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    await Note.findByIdAndDelete(noteId);
    res.json({ message: "Note Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
