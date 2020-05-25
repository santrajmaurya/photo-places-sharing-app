import React from "react";

import Card from "../../shared/components/UIElements/Card";

import './PlaceItem.scss';

interface ILocation {
    lat: number,
    lng: number
}

interface PlaceItemProps {
    id: string,
    title: string,
    description: string,
    image: string,
    address: string,
    coordinates: ILocation,
    creatorId: string
}

const PlaceItem: React.FC<PlaceItemProps> = ({ id, title, description, image, address, coordinates, creatorId }) => {
  return (
    <li className="place-item">
      <Card className="place-item__content">
        <div className="place-item__image">
          <img src={image} alt={title} />
        </div>
        <div className="place-item__info">
          <h2>{title}</h2>
          <h3>{address}</h3>
          <p>{description}</p>
        </div>
        <div className="place-item__actions">
          <button>VIEW ON MAP</button>
          <button>EDIT</button>
          <button>DELETE</button>
        </div>
      </Card>
    </li>
  );
};

export default PlaceItem;
