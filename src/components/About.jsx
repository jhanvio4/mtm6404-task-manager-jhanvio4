import React from "react";
import { Typography, Container } from "@mui/material";

const About = () => (
    <Container>
        <Typography variant="h4">About Task Manager</Typography>
        <Typography variant="body1" mt={2}>
            Task Manager helps you organize and track tasks efficiently.
            Create multiple lists and manage tasks effortlessly.
        </Typography>
    </Container>
);

export default About;
