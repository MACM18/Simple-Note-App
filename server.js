// server.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample data
let notes = [
  {
    id: 1,
    username: "admin",
    title: "Task 1",
    category: "General",
    priority: "Medium",
    content: "This is task 1",
  },
  {
    id: 2,
    username: "admin",
    title: "Task 2",
    category: "General",
    priority: "High",
    content: "This is task 2",
  },
  {
    id: 3,
    username: "admin",
    title: "Task 3",
    category: "General",
    priority: "Low",
    content: "This is task 3",
  },
  {
    id: 4,
    username: "admin",
    title: "Task 4",
    category: "General",
    priority: "Medium",
    content: "This is task 4",
  },
  {
    id: 5,
    username: "user2",
    title: "Task 5",
    category: "General",
    priority: "High",
    content: "This is task 5",
  },
  {
    id: 6,
    username: "user2",
    title: "Task 6",
    category: "General",
    priority: "Low",
    content: "This is task 6",
  },
  {
    id: 7,
    username: "user3",
    title: "Task 7",
    category: "General",
    priority: "Medium",
    content: "This is task 7",
  },
  {
    id: 8,
    username: "user3",
    title: "Task 8",
    category: "General",
    priority: "High",
    content: "This is task 8",
  },
];

// Get all notes
app.get("/notes", (req, res) => {
  res.json(notes);
});

// Get notes by username
app.get("/notes/:username", (req, res) => {
  const { username } = req.params;
  const userNotes = notes.filter((note) => note.username === username);
  res.json(userNotes);
});

// Create a new note
app.post("/notes", (req, res) => {
  const newNote = { id: notes.length + 1, ...req.body };
  notes.push(newNote);
  res.status(201).json(newNote);
});

// Update a note
app.put("/notes/:id", (req, res) => {
  const { id } = req.params;
  const index = notes.findIndex((note) => note.id == id);
  if (index !== -1) {
    notes[index] = { id: Number(id), ...req.body };
    res.json(notes[index]);
  } else {
    res.status(404).send("Note not found");
  }
});

// Delete a note
app.delete("/notes/:id", (req, res) => {
  const { id } = req.params;
  notes = notes.filter((note) => note.id != id);
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
