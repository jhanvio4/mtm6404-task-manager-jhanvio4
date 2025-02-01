import React from "react";
import { Container, Grid } from "@mui/material";
import SingleTask from "./SingleTask";

const sampletTasks = [
    { id: 1, title: "Design Website Mockup", detail: "Create a high-fidelity design mockup for the new project management platform." },
    { id: 2, title: "Set Up Server", detail: "Set up the production server environment on AWS, including configuring the web server, database server." },
    { id: 3, title: "User Testing", detail: "Conduct user testing on the latest mobile app version. Collect feedback from at least 10 users, focusing on usability and identifying any pain points." },
    { id: 4, title: "Documentation", detail: " Write comprehensive documentation for the newly developed RESTful API, including detailed explanations of each endpoint, request parameters, and response structure." },
    { id: 5, title: "Deployment", detail: "Final delpoyment on live server." },
]

const Tasks = () => {
    return (
        <Container sx={{ mt: 4 }}>
            <Grid container spacing={5}>
                {sampletTasks.map((task) => (
                    <SingleTask key={task.id} task={task} />
                ))}
            </Grid>
        </Container>
    );
};

export default Tasks;
