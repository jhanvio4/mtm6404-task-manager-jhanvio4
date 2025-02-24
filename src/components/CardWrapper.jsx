import React from 'react';
import { Card } from '@mui/material';

const CardWrapper = ({ children }) => (
    <Card sx={{ padding: 2, marginBottom: 2 }}>{children}</Card>
);

export default CardWrapper;