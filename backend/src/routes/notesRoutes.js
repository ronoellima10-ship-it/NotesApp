import express from 'express';
import { getallNotes, createNote, updateNote, deleteNote, getNotesbyId } from '../controllers/notesController.js';


const router = express.Router();

// Routes Endpoints for the API - For now, we will just return a simple message for testing purposes
router.get('/', getallNotes);

// Get a specific note by ID - For now, we will just return a simple message for testing purposes
router.get('/:id', getNotesbyId);

// Create a new note - For now, we will just return a simple message for testing purposes
router.post('/', createNote)

// Update a note - For now, we will just return a simple message for testing purposes
router.put('/:id', updateNote );

// Delete a note - For now, we will just return a simple message for testing purposes
router.delete('/:id', deleteNote);

export default router;