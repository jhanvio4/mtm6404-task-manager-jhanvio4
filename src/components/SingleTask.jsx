import React from 'react';
import { Card, CardContent, Typography, Chip, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const SingleTask = ({ task, onToggleComplete, onDelete }) => (
    <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
        <CardContent>
            <Typography variant="h5" sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ p: 1 }}>{task.detail}</Typography>
        </CardContent>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, mt: 'auto' }}>
            <IconButton color={task.completed ? 'error' : 'success'} onClick={() => onToggleComplete(task.id)}>
                {task.completed ? <CancelIcon fontSize="large" /> : <CheckCircleIcon fontSize="large" />}
            </IconButton>

            <Chip
                label={`Priority: ${task.priority === 1 ? 'High' : task.priority === 2 ? 'Medium' : 'Low'}`}
                color={task.priority === 1 ? 'error' : task.priority === 2 ? 'warning' : 'success'}
                sx={{ fontSize: '1rem', px: 2, py: 1 }}
            />

            <IconButton color="error" onClick={() => onDelete(task.id)}>
                <DeleteIcon fontSize="large" />
            </IconButton>
        </Box>
    </Card>
);

export default SingleTask;
