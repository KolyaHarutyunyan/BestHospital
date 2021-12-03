import React, {useEffect} from "react";
import {Redirect, Route, Switch, useParams} from "react-router-dom";
import { MenuBar } from "@eachbase/fragments";
import { useSelector } from "react-redux";
import { LoginPage } from "../pages";


export const RouterSwitcher = ({}) => {
  const { accessToken } = useSelector((state) => ({
    accessToken: state.auth.accessToken,
    isAuthenticated: state.auth.isAuthenticated,
  }));

  const Token = accessToken ? accessToken : localStorage.getItem("access-token");
  
  return (
      <React.Fragment>
        {!Token ? (
            <Switch>
              <Route path="/login" exact component={LoginPage} />
              <Route path="/resetPassword/:resetToken?" exact component={LoginPage} />
              <Route path="/register/:token?" exact component={LoginPage} />
              <Redirect to={"/login"} />
            </Switch>
        ) : (
            <MenuBar />
        )}
      </React.Fragment>
  );
};
