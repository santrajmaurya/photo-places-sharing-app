import React from "react";
import UserItem from "./UserItem";
import Card from '../../shared/components/UIElements/Card';

import "./UsersList.scss";

interface IUser {
  id?: any;
  name?: any;
  image?: any;
  places?: any;
}
interface UsersListProps {
  items: IUser[];
}

const UsersList: React.FC<UsersListProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="center">
        <Card>
        <h2>No Users Found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {items.map((user) => {
        return (
          <UserItem
            key={user.id}
            id={user.id}
            image={user.image}
            name={user.name}
            placeCount={user.places.length}
          />
        );
      })}
    </ul>
  );
};

export default UsersList;
