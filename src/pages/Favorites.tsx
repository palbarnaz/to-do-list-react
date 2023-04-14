import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import { Card, CardActions, CardContent, Container, Divider, Grid, IconButton, Typography } from '@mui/material';
import React, { useMemo } from 'react';

import { useAppSelector } from '../store/hooks';
import { selectAll } from '../store/modules/usersSlice';
import Users from '../types/Users';

const Favorites: React.FC = () => {
    const userLoggedEmail = useAppSelector((state) => state.userLogged.value);
    const users = useAppSelector(selectAll);
    const userLogged = users.find((item) => item.emailUser === userLoggedEmail) as Users;
    const memo = useMemo(() => {
        return userLogged.tasks
            .filter((item) => item.favorite === true)
            .map((item: any) => {
                return (
                    <Grid key={item.id} item xs={12} sm={6} md={3}>
                        <Card>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.description}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.detail}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton size="small">
                                    <FavoriteSharpIcon color="error" />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                );
            });
    }, [userLogged]);

    return (
        <>
            <Grid container marginBottom={10}>
                <Grid item xs={12}>
                    <Container sx={{ marginTop: '20px' }}>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Typography variant="h4">Recados Favoritos</Typography>
                                <Divider />
                            </Grid>
                            {memo}
                        </Grid>
                    </Container>
                </Grid>
            </Grid>
        </>
    );
};

export default Favorites;
