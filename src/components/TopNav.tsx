import MenuIcon from '@mui/icons-material/Menu';
import { Box, Drawer, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import React, { useState } from 'react';
import ThemeSwitcher from './ThemeSwitcher';

const TopNav: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    const menuItems = ['Home', 'Skills', 'Experience', 'Education', 'Projects', 'Contact'];

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ position: 'absolute', right: 0, top: 0, m: 2 }}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                AKM
            </Typography>
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                sx={{ width: 250, flexShrink: 0, [`& .MuiDrawer-paper`]: { width: 250, boxSizing: 'border-box' } }}
            >
                <Box
                    sx={{ width: 250, display: 'flex', flexDirection: 'column', height: '100%' }}
                    role="presentation"
                >
                    <List>
                        {menuItems.map((text) => (
                            <ListItem button key={text}>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            p: 2,
                        }}
                    >
                        <ThemeSwitcher />
                    </Box>
                </Box>
            </Drawer>
        </Box>
    );
};

export default TopNav;
