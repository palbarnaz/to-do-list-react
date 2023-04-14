import { FavoriteBorderSharp } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import { Container, Divider, Fab, Grid, IconButton, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DialogTask from '../components/DialogTask';
import ModalConfirm from '../components/ModalConfirm';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { saveTask, selectAll } from '../store/modules/usersSlice';
import { Task } from '../types/Task';
import Users from '../types/Users';

const Tasks: React.FC = () => {
    const navigate = useNavigate();
    const [detail, setDetail] = useState('');
    const [description, setDescription] = useState('');
    const [valid, setValid] = useState<boolean>(false);
    const [openDialogCreate, setOpenDialogCreate] = React.useState(false);
    const [openDialogEdit, setOpenDialogEdit] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const userLoggedEmail = useAppSelector((state) => state.userLogged.value);
    const [taskRemove, setTaskRemove] = useState<Task | undefined>();
    const [taskEdit, setTaskEdit] = useState<Task | undefined>();
    const users = useAppSelector(selectAll);
    const userLogged = users.find((item) => item.emailUser === userLoggedEmail) as Users;
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!userLoggedEmail) {
            navigate('/');
        }
    }, []);

    useEffect(() => {
        if (description.length > 3) {
            setValid(true);
        } else {
            setValid(false);
        }
    }, [description]);

    const saveTasks = () => {
        const userTasks = userLogged?.tasks || [];
        const newTasks = [...userTasks, { id: Date.now(), description, detail, favorite: false }];
        dispatch(saveTask({ id: userLogged?.id, changes: { tasks: newTasks } }));
        setDescription('');
        setDetail('');
        setOpenDialogCreate(false);
    };

    const handleClickOpen = () => {
        setOpenDialogCreate(true);
    };

    const openModalEdit = (itemEdit: Task) => {
        setTaskEdit(itemEdit);
        setDescription(itemEdit.description);
        setDetail(itemEdit.detail);
        setOpenDialogEdit(true);
    };

    const handleClose = () => {
        setOpenDialogCreate(false);
    };

    const handleCloseEdit = () => {
        setOpenDialogEdit(false);
    };
    const closeModalConfirm = useCallback(() => {
        setOpen(false);
        setTaskRemove(undefined);
    }, []);

    const editTask = useCallback(() => {
        const newTasks = userLogged.tasks.map((item) => {
            if (item.id === taskEdit?.id) {
                return { ...item, description, detail, favorite: item.favorite };
            }
            return item;
        });

        dispatch(saveTask({ id: userLogged.id, changes: { tasks: newTasks } }));
        setDescription('');
        setDetail('');
        setOpenDialogEdit(false);
    }, [userLogged, taskEdit, description, detail]);

    const removeTask = useCallback(() => {
        const index = userLogged.tasks.findIndex((item) => item.id === taskRemove?.id);

        if (index !== -1) {
            const newTasks = [...userLogged.tasks];
            newTasks.splice(index, 1);

            dispatch(saveTask({ id: userLogged.id, changes: { tasks: newTasks } }));
            closeModalConfirm();
        }
    }, [userLogged, taskRemove]);

    const addFavorite = (recado: Task) => {
        const newTasks = userLogged.tasks.map((item) => {
            if (item.id === recado.id) {
                return { ...item, favorite: !item.favorite };
            }

            return item;
        });

        dispatch(saveTask({ id: userLogged.id, changes: { tasks: newTasks } }));
    };

    const openModalDelete = (itemRemove: Task) => {
        setTaskRemove(itemRemove);
        setOpen(true);
    };

    const memo = useMemo(() => {
        return userLogged.tasks.map((item: any) => {
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
                            <IconButton size="small" onClick={() => addFavorite(item)}>
                                {item.favorite ? <FavoriteSharpIcon color="error" /> : <FavoriteBorderSharp />}
                            </IconButton>
                            <IconButton onClick={() => openModalEdit(item)} size="small">
                                <EditSharpIcon sx={{ color: '#ab47bc' }} />
                            </IconButton>
                            <IconButton onClick={() => openModalDelete(item)} size="small">
                                <DeleteSharpIcon />
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
                                <Typography variant="h4">Recados</Typography>
                                <Divider />
                            </Grid>
                            {memo}
                        </Grid>
                    </Container>
                </Grid>
                <DialogTask
                    title="Adicionar recado"
                    titleBtn="Cadastrar"
                    valid={!valid}
                    openModal={openDialogCreate}
                    detail={detail}
                    description={description}
                    actionDetail={(ev) => setDetail(ev.target.value)}
                    actionDescription={(ev) => setDescription(ev.target.value)}
                    actionCancel={handleClose}
                    actionConfirm={saveTasks}
                />
                <DialogTask
                    title="Editar recado"
                    titleBtn="Editar"
                    valid={!valid}
                    openModal={openDialogEdit}
                    description={description}
                    detail={detail}
                    actionDetail={(ev) => {
                        setDetail(ev.target.value);
                        console.log(ev.target.value);
                    }}
                    actionDescription={(ev) => setDescription(ev.target.value)}
                    actionCancel={handleCloseEdit}
                    actionConfirm={editTask}
                />
            </Grid>
            <ModalConfirm
                actionCancel={closeModalConfirm}
                actionConfirm={removeTask}
                tittle="Deseja realmente excluir o recado?"
                description={taskRemove?.description || ''}
                detail={taskRemove?.detail || ''}
                openModal={open}
            />
            <Fab
                onClick={handleClickOpen}
                sx={{
                    position: 'fixed',
                    bottom: '35px',
                    right: '35px',
                }}
                color="secondary"
                aria-label="add"
            >
                <AddIcon />
            </Fab>
        </>
    );
};

export default Tasks;
