import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import SingleTask from './SingleTask';
import CardWrapper from './CardWrapper';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', detail: '', priority: 1 });
    const [showCompleted, setShowCompleted] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            try {
                setTasks(sortTasksByPriority(JSON.parse(storedTasks)));
            } catch (error) {
                console.error("Error parsing localStorage tasks:", error);
                setTasks([]);
            }
        } else {
            setTasks([]);
        }
    }, []);

    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }, [tasks]);

    const sortTasksByPriority = (tasks) => {
        return tasks.sort((a, b) => a.priority - b.priority);
    };

    const handleAddTask = () => {
        if (!newTask.title.trim() || !newTask.detail.trim()) return;

        const newTaskItem = {
            id: Date.now(),
            ...newTask,
            completed: false
        };

        setTasks(prevTasks => {
            const updatedTasks = [...prevTasks, newTaskItem];
            return sortTasksByPriority(updatedTasks);
        });
        setNewTask({ title: '', detail: '', priority: 1 });
        setIsModalOpen(false);
    };

    const toggleCompletion = (id) => {
        setTasks(prevTasks => {
            const updatedTasks = prevTasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            );
            return sortTasksByPriority(updatedTasks);
        });
    };

    const deleteTask = (id) => {
        setTasks(prevTasks => {
            const updatedTasks = prevTasks.filter(task => task.id !== id);
            return sortTasksByPriority(updatedTasks);
        });
    };

    return (
        <Grid container spacing={3}>

            <Grid item xs={6} style={{ textAlign: 'center' }}>
                <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
                    Add Task
                </Button>
            </Grid>

            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <DialogTitle>Add a New Task</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Title"
                        fullWidth
                        margin="normal"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    />
                    <TextField
                        label="Detail"
                        fullWidth
                        margin="normal"
                        value={newTask.detail}
                        onChange={(e) => setNewTask({ ...newTask, detail: e.target.value })}
                    />
                    <FormControl fullWidth margin="normal">
                        <Select
                            value={newTask.priority}
                            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                        >
                            <MenuItem value={1}>High Priority</MenuItem>
                            <MenuItem value={2}>Medium Priority</MenuItem>
                            <MenuItem value={3}>Low Priority</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsModalOpen(false)} color="error" variant="contained">Cancel</Button>
                    <Button onClick={handleAddTask} color="success" variant="contained">Add Task</Button>
                </DialogActions>
            </Dialog>

            <Grid item xs={6}>
                <Button variant="contained" color="success" onClick={() => setShowCompleted(!showCompleted)}>
                    {showCompleted ? "Hide Completed" : "Show Completed"}
                </Button>
            </Grid>

            {tasks.length > 0 ? (
                tasks
                    .filter(task => showCompleted || !task.completed)
                    .map(task => (
                        <Grid item xs={12} sm={6} md={4} key={task.id}>
                            <SingleTask task={task} onToggleComplete={toggleCompletion} onDelete={deleteTask} />
                        </Grid>
                    ))
            ) : (
                <Typography variant="h6" style={{ textAlign: 'center', marginTop: '20px' }}>No tasks available.</Typography>
            )}
        </Grid>
    );
};

export default Tasks;
