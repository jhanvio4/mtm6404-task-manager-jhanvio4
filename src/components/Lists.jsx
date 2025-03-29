import React, { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";
import {
    Box,
    TextField,
    Button,
    ListItem,
    ListItemText,
    IconButton,
    Typography,
    Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Lists = () => {
    const { lists, addList, deleteList, setSelectedListId } = useTaskContext();
    const [listName, setListName] = useState("");
    const navigate = useNavigate();

    const handleAddList = () => {
        if (listName.trim() !== "") {
            addList(listName);
            setListName("");
        }
    };

    const handleSelectList = (id) => {
        setSelectedListId(id);
        navigate(`/tasks/${id}`);
    };

    const handleDeleteList = (e, id) => {
        e.stopPropagation();
        deleteList(id);
    };

    return (
        <>
            <Typography variant="h5" gutterBottom>
                Manage Lists (Click on List to view tasks)
            </Typography>
            <Box sx={{ p: 3, mx: "auto" }}>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={9}>
                        <TextField
                            fullWidth
                            label="Enter list name"
                            value={listName}
                            onChange={(e) => setListName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleAddList}
                            sx={{
                                height: "100%"
                            }}
                        >
                            Add List
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={3} sx={{ mt: 2 }}>
                    {Array.isArray(lists) && lists.map((list) => (
                        <Grid item xs={12} sm={4} key={list.id}>
                            <ListItem
                                button
                                onClick={() => handleSelectList(list.id)}
                                sx={{
                                    boxShadow: 3,
                                    mb: 2,
                                    borderRadius: 2,
                                    "&:hover": {
                                        boxShadow: 6,
                                    },
                                    backgroundColor: "#f5f5f5",
                                    transition: "all 0.3s ease",
                                }}
                            >
                                <ListItemText primary={list.name} />
                                <IconButton
                                    edge="end"
                                    onClick={(e) => handleDeleteList(e, list.id)}
                                    sx={{
                                        color: "#f44336",
                                        "&:hover": {
                                            color: "#d32f2f",
                                        },
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
};

export default Lists;
