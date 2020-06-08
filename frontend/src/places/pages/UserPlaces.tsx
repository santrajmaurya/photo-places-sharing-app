import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../../places/components/PlaceList";
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

interface RouteParams {
  userId: string;
}

const UserPlaces: React.FC = () => {
  const [loadedPlace, setLoadedPlace] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const userId = useParams<RouteParams>().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try{
        const responseData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
        setLoadedPlace(responseData.places);
      } catch(err) {

      }
    };
    fetchPlaces();

  }, [sendRequest, userId]);
  return (
    <>
    <ErrorModal error={error} onClear={clearError} />
    {isLoading && (
      <div className='center'>
        <LoadingSpinner />
      </div>
    )}
   {!isLoading && loadedPlace && <PlaceList items={loadedPlace} />}
  </>
  );
};

export default UserPlaces;
