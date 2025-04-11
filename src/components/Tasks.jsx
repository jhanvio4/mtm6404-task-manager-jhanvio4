import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Grid, Typography, Button, Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import SingleTask from './SingleTask';

import {
    getFirestore, collection, doc, getDocs, getDoc, setDoc, updateDoc, deleteDoc
} from 'firebase/firestore';
import { db } from '../firebase';

const Tasks = () => {
    const { listId } = useParams();
    const navigate = useNavigate();

    const [lists, setLists] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', detail: '', priority: 1, listId: listId || '' });
    const [showCompleted, setShowCompleted] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchLists();
    }, [listId]);

    const fetchLists = async () => {
        const listSnapshot = await getDocs(collection(db, 'taskLists'));
        const listData = await Promise.all(
            listSnapshot.docs.map(async (docSnap) => {
                const data = docSnap.data();
                const tasksSnapshot = await getDocs(collection(db, 'taskLists', docSnap.id, 'tasks'));
                const tasks = tasksSnapshot.docs.map(task => ({ ...task.data(), id: task.id }));
                return { id: docSnap.id, ...data, tasks: sortTasksByPriority(tasks) };
            })
        );
        setLists(listData);

        const selectedList = listData.find(list => list.id === listId);
        if (selectedList) {
            setTasks(selectedList.tasks);
        } else {
            setTasks([]);
        }
    };

    const sortTasksByPriority = (tasks) => tasks.sort((a, b) => a.priority - b.priority);

    const handleAddTask = async () => {
        if (!newTask.title.trim() || !newTask.detail.trim() || !newTask.listId) return;

        const newId = Date.now().toString();
        const taskData = { ...newTask, completed: false };

        await setDoc(doc(db, 'taskLists', newTask.listId, 'tasks', newId), taskData);
        setNewTask({ title: '', detail: '', priority: 1, listId: newTask.listId });
        setIsModalOpen(false);
        fetchLists();
    };

    const toggleCompletion = async (id) => {
        const taskRef = doc(db, 'taskLists', listId, 'tasks', id);
        const taskSnap = await getDoc(taskRef);
        if (taskSnap.exists()) {
            const currentStatus = taskSnap.data().completed;
            await updateDoc(taskRef, { completed: !currentStatus });
            fetchLists();
        }
    };

    const deleteTask = async (id) => {
        await deleteDoc(doc(db, 'taskLists', listId, 'tasks', id));
        fetchLists();
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Typography variant="h5">
                    Tasks for {lists.find(l => l.id === listId)?.name || "Unknown List"}
                </Typography>
            </Grid>

            <Grid item xs={6} style={{ textAlign: 'center' }}>
                <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
                    Add Task
                </Button>
            </Grid>

            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <DialogTitle>Add a New Task</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Select List</InputLabel>
                        <Select
                            value={newTask.listId}
                            onChange={(e) => setNewTask({ ...newTask, listId: e.target.value })}
                        >
                            {lists.map(list => (
                                <MenuItem key={list.id} value={list.id}>
                                    {list.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

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
                        <InputLabel>Priority</InputLabel>
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

            {tasks.length === 0 ? (
                <Typography variant="h6" style={{ textAlign: 'center', width: '100%', marginTop: '70px' }}>
                    No tasks available. Add a new task to get started!
                </Typography>
            ) : (
                tasks
                    .filter(task => showCompleted || !task.completed)
                    .map(task => (
                        <Grid item xs={12} sm={6} md={4} key={task.id}>
                            <SingleTask task={task} onToggleComplete={toggleCompletion} onDelete={deleteTask} />
                        </Grid>
                    ))
            )}
            <Grid item xs={12} style={{ textAlign: 'center', marginTop: 20 }}>
                <Button variant="outlined" onClick={() => navigate('/lists')}>Back to Lists</Button>
            </Grid>
        </Grid>
    );
};

export default Tasks;
