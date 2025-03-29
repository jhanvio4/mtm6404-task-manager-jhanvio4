import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <Box textAlign="center" mt={5}>
            <Typography variant="h3">Welcome to Task Manager</Typography>
            <Typography variant="h5" mt={2}>Efficiently manage your tasks and lists.</Typography>
            <Box mt={3}>
                <Button variant="contained" color="secondary" component={Link} to="/lists" sx={{ mx: 1 }}>Manage Lists</Button>
            </Box>
        </Box>
    );
};

export default Dashboard;
