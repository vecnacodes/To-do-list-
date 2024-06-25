const express = require('express');
const cors = require('cors'); // Add this line
const app = express();
const PORT = process.env.PORT || 3001;

const NodePersist = require('node-persist');

// Initialize the storage
NodePersist.init({
    dir: 'tasks-storage'
});

app.use(cors()); // Add this line
app.use(express.json());

app.get('/tasks', async (req, res) => {
    const tasks = await NodePersist.values();
    console.log('GET /tasks', tasks);
    res.json(tasks);
});

app.post('/tasks', async (req, res) => {
    const task = req.body.task;
    console.log('POST /tasks', task);
    if (task) {
        await NodePersist.setItem(Date.now().toString(), task);
    }
    const tasks = await NodePersist.values();
    res.json(tasks);
});

app.delete('/tasks', async (req, res) => {
    console.log('DELETE /tasks');
    await NodePersist.clear();
    const tasks = await NodePersist.values();
    res.json(tasks);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});