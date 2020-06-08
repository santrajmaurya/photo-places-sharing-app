import React, { useState, useEffect } from 'react';

import UsersList from '../../user/components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

interface IPlaces {
    id: string
}
interface IUser {
    id: string;
    name: string;
    email: string;
    image: string;
    password: string;
    places: IPlaces[];
}

const Users: React.FC<IUser> = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedUsers, setLoadedUser] = useState <IUser[] | []>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const responseData = await sendRequest('http://localhost:5000/api/users');
                
                setLoadedUser(responseData.users);
            } catch (err) {
            }
        };
        fetchUsers();
    }, [sendRequest]);

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
            <div className='center'>
                <LoadingSpinner />
            </div>
            )}
            {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
        </>
    );
}

export default Users;


