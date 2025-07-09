require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Middleware de logging
app.use((req, res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use(cors());
app.use(express.json());

let tasks = [];
let idCounter = 1;

// GET /api/tasks (avec pagination)
app.get('/api/tasks', (req, res) => {
  try {
    let { page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || tasks.length || 10;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedTasks = tasks.slice(start, end);
    res.json({
      tasks: paginatedTasks,
      page,
      limit,
      total: tasks.length
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

// GET /api/tasks/search?q=terme
app.get('/api/tasks/search', (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: 'Query parameter q is required' });
    const terme = q.toString().toLowerCase();
    const results = tasks.filter(task => task.title.toLowerCase().includes(terme));
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

// POST /api/tasks
app.post('/api/tasks', (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });
    const now = new Date();
    const newTask = {
      id: idCounter++,
      title,
      done: false,
      createdAt: now,
      updatedAt: now
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

// PUT /api/tasks/:id
app.put('/api/tasks/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { title, done } = req.body;
    const task = tasks.find(t => t.id == id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    if (title !== undefined) task.title = title;
    if (done !== undefined) task.done = done;
    task.updatedAt = new Date();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

// DELETE /api/tasks/:id
app.delete('/api/tasks/:id', (req, res) => {
  try {
    const { id } = req.params;
    const index = tasks.findIndex(t => t.id == id);
    if (index === -1) return res.status(404).json({ error: 'Task not found' });
    tasks.splice(index, 1);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
}); 