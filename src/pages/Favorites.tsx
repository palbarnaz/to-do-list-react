import React, { useMemo } from 'react';

import CardTask from '../components/CardTask';
import ListTasks from '../components/ListTasks';
import { useAppSelector } from '../store/hooks';
import { selectAll } from '../store/modules/usersSlice';
import Users from '../types/Users';

const Favorites: React.FC = () => {
    const userLoggedEmail = useAppSelector((state) => state.userLogged.value);
    const users = useAppSelector(selectAll);
    const userLogged = users.find((item) => item.emailUser === userLoggedEmail) as Users;

    const favoriteTasks = useMemo(() => {
        return userLogged.tasks
            .filter((item) => item.favorite === true)
            .map((item: any) => {
                return <CardTask mode="favorites" id={item.id} description={item.description} detail={item.detail} favorite={item.favorite} />;
            });
    }, [userLogged]);

    return (
        <>
            <ListTasks title="Recados Favoritos" cards={favoriteTasks} />
        </>
    );
};

export default Favorites;
