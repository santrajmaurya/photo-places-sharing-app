import React from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from '../../shared/components/FormElements/Button';

import PlaceItem from "./PlaceItem";

import "./PlaceList.scss";

interface ILocation {
    lat: number,
    lng: number
}
interface IPlace {
    id: string,
    title: string,
    description: string,
    image: string,
    address: string,
    location: ILocation,
    creator: string
}
interface PlaceListProps {
    items: IPlace[];
}

const PlaceList: React.FC<PlaceListProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <Button to='/places/new'>Share Place</Button>
        </Card>
      </div>
    );
  }
  return (
    <ul className="place-list">
      {items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
