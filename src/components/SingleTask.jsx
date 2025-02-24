import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const SingleTask = ({ title, detail }) => (
    <>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2" color="text.secondary">{detail}</Typography>
    </>
);

export default SingleTask;