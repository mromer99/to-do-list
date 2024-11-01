const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// In-memory storage for tasks
let tasks = [];
let taskId = 1;


// Add a new task
app.post('/tasks', (req, res) => {
    const task = {
        id: taskId++,
        description: req.body.description,
        completed: false,
        createdAt: new Date()
    };
    tasks.push(task);
    res.status(201).json(task);
});

// Get all tasks
app.get('/tasks', (req, res) => {
    const sortedTasks = [...tasks].sort((a, b) => {
        if (a.completed === b.completed) {
            return new Date(a.createdAt) - new Date(b.createdAt);
        }
        return a.completed - b.completed;
    });
    res.json(sortedTasks);
});

// Completed
app.patch('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ error: "Task not found" });

    task.completed = true;
    res.json(task);
});


// Edit a task 
app.patch('/tasks/:id/edit', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ error: "Task not found" });

    task.description = req.body.description;
    res.json(task);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex === -1) return res.status(404).json({ error: "Task not found" });

    tasks.splice(taskIndex, 1);
    res.status(204).send();
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
