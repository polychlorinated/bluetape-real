import React from "react";
import { Redirect, Route } from "react-router-dom";
import useApi from "../../hooks/api";
import Mangekyo from "../Loaders/Mangekyo";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const [{ error, isLoading }] = useApi.get(
    "/auth",
    {},
    { cachePolicy: "no-cache" }
  );

  return isLoading ? (
    <Mangekyo />
  ) : (
    <Route
      {...restOfProps}
      render={props =>
        error ? <Redirect to="/signin" /> : <Component {...props} />
      }
    />
  );
}

export default ProtectedRoute;
