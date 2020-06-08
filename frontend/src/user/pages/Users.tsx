import React, { useState, useEffect } from 'react';

import UsersList from '../../user/components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

interface IUser {
    id: string;
    name: string;
    image: string;
    places: number;
}

const Users: React.FC<IUser> = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState(null);
    const [loadedUsers, setLoadedUser] = useState([]);

    useEffect(() => {
        const sendRequest = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:5000/api/users');
                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(responseData.message);
                }
                setLoadedUser(responseData.users);
            } catch (err) {
                setError(err.message);
            }
            setIsLoading(false);
        };
        sendRequest();
    }, []);

    const errorHandler = () => {
        setError(null);
    }

    return (
        <>
            <ErrorModal error={error} onClear={errorHandler} />
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


