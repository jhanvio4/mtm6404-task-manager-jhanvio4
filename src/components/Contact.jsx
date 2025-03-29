import React from "react";
import { Typography, Container } from "@mui/material";

const Contact = () => (
    <Container>
        <Typography variant="h4">Contact Us</Typography>
        <Typography variant="body1" mt={2}>
            Have questions? Reach out to us at <strong>support@taskmanager.com</strong>.
        </Typography>
    </Container>
);

export default Contact;
