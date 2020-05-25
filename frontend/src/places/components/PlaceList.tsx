import React from "react";

import Card from "../../shared/components/UIElements/Card";
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
    imageUrl: string,
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
          <button>Share Place</button>
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
          image={place.imageUrl}
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
