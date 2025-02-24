import React from 'react';
import { Grid, Typography } from '@mui/material';
import SingleTask from './SingleTask';
import CardWrapper from './CardWrapper';

const tasks = [
    { id: 1, title: 'Design Website Mockup', detail: 'Create a high-fidelity design mockup.' },
    { id: 2, title: 'Set Up Server', detail: 'Configure production environment on AWS.' },
    { id: 3, title: 'User Testing', detail: 'Conduct usability testing on the app.' },
    { id: 4, title: 'Documentation', detail: 'Write API documentation.' },
    { id: 5, title: 'Deployment', detail: 'Deploy the app to the live server.' },
];

const Tasks = () => (
    <Grid container spacing={3}>
        {tasks.length > 0 ? (
            tasks.map(task => (
                <Grid item xs={12} sm={6} md={4} key={task.id}>
                    <CardWrapper>
                        <SingleTask title={task.title} detail={task.detail} />
                    </CardWrapper>
                </Grid>
            ))
        ) : (
            <Typography variant="h6">No tasks available.</Typography>
        )}
    </Grid>
);

export default Tasks;
