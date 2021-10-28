import { Route, Switch, Redirect } from "react-router-dom";
import {
    FundingSource,
    FundingSourceSingle,
    Management,
    Staff,
    SingleStaff,
    Client,
    ClientSingle,
    System,
    Single,
    Schedule
} from "@eachbase/pages";
import React from "react";


export const Router = ({}) => {
  return (

    <Switch>
      <Route path='/' exact component={FundingSource}/>

      <Route path="/fundingSource" exact component={FundingSource} />
      <Route path="/fundingSource/:id" exact component={FundingSourceSingle} />

      <Route path="/staff" exact component={Staff} />
      <Route path="/staff/:id" exact component={SingleStaff} />

      <Route path="/client" exact component={Client} />
      <Route path="/client/:id" exact component={ClientSingle} />

      <Route path="/single" component={Single} />
      <Route path="/management" component={Management} />
      <Route path="/system" component={System} />

      <Route path='/schedule'  exact component={Schedule}/>
      <Redirect to={"/"} />
    </Switch>
  );
};
