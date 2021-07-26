import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { MenuBar } from "@eachbase/fragments";
import { useSelector } from "react-redux";
import { LoginPage } from "../pages";

export const RouterSwitcher = ({}) => {
  const { accessToken } = useSelector((state) => ({
    accessToken: state.auth.accessToken,
    isAuthenticated: state.auth.isAuthenticated,
  }));

  const Token = accessToken
    ? accessToken
    : localStorage.getItem("access-token");

  if (window.location.href.length > 150) {
    localStorage.setItem("Reset", window.location.href);
  }

  return (
    <React.Fragment>
      {/*{!Token ? (*/}
      {/*  <Switch>*/}
      {/*    <Route path="/login" exact component={LoginPage} />*/}
      {/*    <Redirect to={"/login"} />*/}
      {/*  </Switch>*/}
      {/*) : (*/}
        <MenuBar />
      {/*)}*/}
    </React.Fragment>
  );
};
