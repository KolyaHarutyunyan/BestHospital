import { Route, Switch, Redirect } from "react-router-dom";
import {
    Staff,
    Management,
    FundingSource,
    Single,
    FundingSourceSingle,
    SingleStaff,
    Client,
    ClientSingle
} from "@eachbase/pages";
import React from "react";


export const Router = ({}) => {
  return (

    <Switch>
      {/*<Route path='/' exact component={Offices}/>*/}

      <Route path="/fundingSource" exact component={FundingSource} />
      <Route path="/fundingSource/:id" exact component={FundingSourceSingle} />

      <Route path="/staff" exact component={Staff} />
      <Route path="/staff/:id" exact component={SingleStaff} />

      <Route path="/client" exact component={Client} />
      <Route path="/client/:id" exact component={ClientSingle} />

      <Route path="/single" component={Single} />
      <Route path="/management" component={Management} />

      <Redirect to={"/"} />
    </Switch>
  );
};
