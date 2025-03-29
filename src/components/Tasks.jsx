import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Grid, Typography, Button, Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import SingleTask from './SingleTask';

const Tasks = () => {
    const { listId } = useParams();
    const navigate = useNavigate();
    const [lists, setLists] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', detail: '', priority: 1, listId: listId || '' });
    const [showCompleted, setShowCompleted] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        const storedLists = JSON.parse(localStorage.getItem('taskLists')) || [];
        setLists(storedLists);

        if (listId) {
            const selectedList = storedLists.find(list => list.id === Number(listId));
            if (selectedList) {
                setTasks(sortTasksByPriority(selectedList.tasks || []));
            } else {
                setTasks([]);
            }
        }
    }, [listId]);

    const handleAddTask = () => {
        if (!newTask.title.trim() || !newTask.detail.trim() || !newTask.listId) return;

        const newTaskItem = { id: Date.now(), ...newTask, completed: false };
        console.log("lists", lists)

        const updatedLists = lists.map(list =>
            list.id === Number(newTask.listId)
                ? {
                    ...list,
                    tasks: sortTasksByPriority([...(list.tasks || []), newTaskItem])
                }
                : list
        );


        localStorage.setItem('taskLists', JSON.stringify(updatedLists));
        setLists(updatedLists);

        const updatedSelectedList = updatedLists.find(list => list.id == listId);
        console.log('updatedSelectedList', updatedSelectedList)
        if (updatedSelectedList) {
            setTasks(sortTasksByPriority(updatedSelectedList.tasks));
        }


        setNewTask({ title: '', detail: '', priority: 1, listId: newTask.listId });
        setIsModalOpen(false);
    };




    const sortTasksByPriority = (tasks) => tasks.sort((a, b) => a.priority - b.priority);



    const toggleCompletion = (id) => {

        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );


        const updatedLists = lists.map(list =>
            list.id === Number(listId)
                ? { ...list, tasks: updatedTasks }
                : list
        );


        localStorage.setItem('taskLists', JSON.stringify(updatedLists));


        setTasks(updatedTasks);
    };

    const deleteTask = (id) => {

        const updatedTasks = tasks.filter(task => task.id !== id);


        const updatedLists = lists.map(list =>
            list.id === Number(listId)
                ? { ...list, tasks: updatedTasks }
                : list
        );


        localStorage.setItem('taskLists', JSON.stringify(updatedLists));


        setTasks(updatedTasks);
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Typography variant="h5">Tasks for {lists.find(l => l.id === Number(listId))?.name || "Unknown List"}</Typography>
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
