import React from 'react';

import UsersList from '../../user/components/UsersList';

interface IUser {
    id: string;
    name: string;
    image: string;
    places: number;
}

const Users: React.FC<IUser> = () => {

    const USERS: IUser[] = [
        {
        id: 'u1',
        name: 'Max',
        image: 'https://www.cricbuzz.com/stats/img/faceImages/25.jpg',
        places: 3
    }
]

    return <UsersList items={USERS}/>;
}

export default Users;


