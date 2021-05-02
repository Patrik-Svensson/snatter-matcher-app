import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  loggedIn: loggedIn,
  ...rest
}) => {
  const token = rest["token"];
  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? (
          <Component token={token} {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
