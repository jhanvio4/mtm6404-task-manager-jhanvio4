import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";

const SingleTask = ({ task }) => {
    return (
        <Grid item xs={12} md={12}>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {task.title}
                    </Typography>
                    <Typography variant="body2" color="secondary">
                        {task.detail}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>

    );
};

export default SingleTask;
