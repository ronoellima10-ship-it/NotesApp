import Note from "../model/Notes.js";

// Controller functions for handling notes-related operations
export async function getallNotes(req, res) {
    try {
        // Fetch notes from the database
        const notes = await Note.find().sort({ createdAt: -1 }); // Sort by creation date in descending order
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notes', error });
    }
}

export function createNote(req, res) {
  try {
    // Extract title and content from the request body
    const { title, content } = req.body;

    // Create a new note instance
    const newNote = new Note({
      title,
      content
    });

    // Save the note to the database
    newNote.save();

    res.status(201).json({ newNote, message: 'Note created!' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating note', error });
  }
    
}

// Update a note by ID
export async function updateNote(req, res){
  try {
    // Extract title and content from the request body
     const {title, content} = req.body

    // Find the note by ID and update it with the new title and content
     const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new: true})

      if (!updatedNote) {
        return res.status(404).json({ message: 'Note not found' });
      }


     // Return the updated note in the response
     res.status(200).json({ updatedNote, message: 'Note updated!' })

  } catch (error) {

    res.status(500).json({ message: 'Error updating note', error });

  }
}

export async function deleteNote(req, res){
   try {
     
      // Find the note by ID and delete it
      const deletedNote = await Note.findByIdAndDelete(req.params.id)

      if (!deletedNote) {
        return res.status(404).json({ message: 'Note not found' });
      }

      res.status(200).json({ deletedNote, message: 'Note deleted!' });

   } catch (error) {

     res.status(500).json({ message: 'Error deleting note', error });
   }
  }

  export async function getNotesbyId(req, res){

    try {
      // Find the note by ID
      const note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }

      res.status(200).json(note);

    } catch (error) {

      res.status(500).json({ message: 'Error fetching note', error });

    }
  }