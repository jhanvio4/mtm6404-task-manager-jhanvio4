import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Box
            sx={{
                backgroundColor: "primary.main",
                color: "white",
                py: 3,
                mt: "30px",
                textAlign: "center",
            }}
        >
            <Typography variant="body1">&copy; 2025 Task Manager mtm6404. All Rights Reserved.</Typography>
        </Box>
    );
};

export default Footer;
