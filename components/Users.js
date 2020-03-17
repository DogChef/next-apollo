import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Typography } from "@material-ui/core";

import { GET_USERS } from "./core/users";

const Users = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <Typography variant="h4">
        There are currently {data.getUsers.length} users registered in the
        system.
      </Typography>

      {data.getUsers.length > 0 && (
        <Typography variant="h5">They are:</Typography>
      )}
      {data.getUsers.map(({ id, name, email }, index) => (
        <ul key={index}>
          <li>id: {id} </li>
          <li>name: {name} </li>
          <li>email: {email} </li>
        </ul>
      ))}
    </>
  );
};

export default Users;
