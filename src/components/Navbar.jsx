import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Drawer, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleDrawer = () => setIsMobile(!isMobile);

    const handleNavigate = (path) => {
        navigate(path);
        setIsMobile(false);
    };

    const isActive = (path) => location.pathname === path;

    const menuItems = (
        <>
            <Button
                color={isActive("/") ? "secondary" : "inherit"}
                onClick={() => handleNavigate("/")}
            >
                Dashboard
            </Button>
            <Button
                color={isActive("/lists") ? "secondary" : "inherit"}
                onClick={() => handleNavigate("/lists")}
            >
                Lists
            </Button>
            <Button
                color={isActive("/about") ? "secondary" : "inherit"}
                onClick={() => handleNavigate("/about")}
            >
                About Us
            </Button>
            <Button
                color={isActive("/contact") ? "secondary" : "inherit"}
                onClick={() => handleNavigate("/contact")}
            >
                Contact
            </Button>
        </>
    );

    return (
        <AppBar position="sticky" color="primary">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleDrawer}
                    sx={{ display: { xs: 'block', md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1, width: '20%' }}>
                    Task Manager
                </Typography>
                <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', width: '100%' }}>
                    {menuItems}
                </Box>
                <Drawer anchor="top" open={isMobile} onClose={toggleDrawer}>
                    <Box
                        sx={{
                            width: '100%',
                            p: 2,
                            backgroundColor: 'background.paper'
                        }}
                        role="presentation"
                        onClick={toggleDrawer}
                    >
                        <Stack spacing={2}>{menuItems}</Stack>
                    </Box>
                </Drawer>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
