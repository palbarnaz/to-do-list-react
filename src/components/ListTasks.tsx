import { Container, Divider, Grid, Typography } from '@mui/material';
import React from 'react';

interface ListTasksProps {
    cards: JSX.Element[];
    title: string;
}

const ListTasks: React.FC<ListTasksProps> = ({ cards, title }) => {
    return (
        <Grid container marginBottom={10}>
            <Grid item xs={12}>
                <Container sx={{ marginTop: '20px' }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography variant="h4">{title}</Typography>
                            <Divider />
                        </Grid>
                        {cards}
                    </Grid>
                </Container>
            </Grid>
        </Grid>
    );
};

export default ListTasks;
