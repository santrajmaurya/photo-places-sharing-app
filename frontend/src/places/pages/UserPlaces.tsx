import React from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../../places/components/PlaceList";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://banner2.cleanpng.com/20180323/zyw/kisspng-empire-state-building-manhattan-4k-resolution-aspe-skyscraper-5ab5c25a2a99c5.5236467015218612101745.jpg",
    address: "20 W 34th St, New York, NY 10001, United States",
    location: {
      lat: 40.7484405,
      lng: -73.9878531,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://banner2.cleanpng.com/20180323/zyw/kisspng-empire-state-building-manhattan-4k-resolution-aspe-skyscraper-5ab5c25a2a99c5.5236467015218612101745.jpg",
    address: "20 W 34th St, New York, NY 10001, United States",
    location: {
      lat: 40.7484405,
      lng: -73.9878531,
    },
    creator: "u2",
  },
];

interface RouteParams {
  userId: string;
}

const UserPlaces: React.FC = () => {
  const userId = useParams<RouteParams>().userId;
  const loadedPlace = DUMMY_PLACES.filter((place) => place.creator === userId);
  return <PlaceList items={loadedPlace} />;
};

export default UserPlaces;
