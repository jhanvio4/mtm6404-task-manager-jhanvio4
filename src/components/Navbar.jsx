import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);

    const toggleDrawer = () => setIsMobile(!isMobile);

    const menuItems = (
        <>
            <Button color="inherit">Dashboard</Button>
            <Button color="inherit">About Us</Button>
            <Button color="inherit">Tasks</Button>
            <Button color="inherit">Contact</Button>
        </>
    );

    return (
        <AppBar position="sticky" color="primary">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer} sx={{ display: { xs: 'block', md: 'none' } }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1, width: '20%' }}>Task Manager</Typography>
                <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', width: '100%' }}>{menuItems}</Box>
                <Drawer anchor="top" open={isMobile} onClose={toggleDrawer}>
                    <Box sx={{ width: '100%' }} role="presentation" onClick={toggleDrawer}>
                        {menuItems}
                    </Box>
                </Drawer>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;