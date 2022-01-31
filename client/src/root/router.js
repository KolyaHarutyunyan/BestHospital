import React from "react";
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
   Schedule,
   Billings,
   BillingDetails,
} from "@eachbase/pages";

export const Router = ({}) => {
   return (
      <Switch>
         <Route path="/" exact component={FundingSource} />

         <Route path="/fundingSource" exact component={FundingSource} />
         <Route path="/fundingSource/:id" exact component={FundingSourceSingle} />

         <Route path="/staff" exact component={Staff} />
         <Route path="/staff/:id" exact component={SingleStaff} />

         <Route path="/client" exact component={Client} />
         <Route path="/client/:id" exact component={ClientSingle} />

         <Route path="/single" component={Single} />
         <Route path="/management" component={Management} />
         <Route path="/system" component={System} />

         <Route path="/schedule" exact component={Schedule} />

         <Route path="/billing" exact component={Billings} />
         <Route path="/billing/:id" exact component={BillingDetails} />

         <Redirect to={"/"} />
      </Switch>
   );
};
