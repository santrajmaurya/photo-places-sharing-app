import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/Validators";
import Card from "../../shared/components/UIElements/Card";

import { useForm } from "../../shared/hooks/form-hook";

import "./PlaceForm.scss";

const DUMMY_PLACES: any = [
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
      title: "Akshardham Temple",
      description:
          "Swaminarayan Akshardham (New Delhi) is a Hindu temple, and a spiritual-cultural campus in New Delhi, India.",
      imageUrl:
          "https://www.makemytrip.com/travel-guide/media/dg_image/delhi/Swaminarayan-Akshardham-Temple-Delhi.jpg",
      address: "Noida Mor, Pandav Nagar, New Delhi, Delhi 110092",
      location: {
          lat: 28.6126735,
          lng: 77.2750732,
      },
      creator: "u1",
  },
  {
      id: "p3",
      title: "Nalanda University",
      description:
          "Nalanda University is an international and research-intensive class located in the historical city of Rajgir, in Bihar, India.",
      imageUrl:
          "https://images.newindianexpress.com/uploads/user/imagelibrary/2016/11/19/w600X300/BuildingAA.PNG",
      address: "Rajgir, Bihar, India",
      location: {
          lat: 25.1388526,
          lng: 85.4489793,
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

type Event = React.ChangeEvent<HTMLFormElement>;

interface RouteParams {
  placeId: string;
}

const UpdatePlace: React.FC = () => {
  const placeId = useParams<RouteParams>().placeId;
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: true,
      },
      description: {
        value: "",
        isValid: true,
      },
    },
    true
  );

  const identifiedPlace = DUMMY_PLACES.find((p: any) => p.id === placeId);
  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace?.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace?.description,
            isValid: true,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedPlace]);

  const placeUpdateSubmitHandler = (e: Event) => {
    e.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
