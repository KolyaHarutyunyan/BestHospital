import { Route, Switch, Redirect } from "react-router-dom";
import {
    Branches,
    Staff,
    HumanResources,
    Customers,
    Factoring,
    Management,
    Authorities,
    Agents,
    Carriers,
    FundingSource,
    Single,
    FundingSourceSingle,
    SingleStaff,
    Client,
    ClientSingle
} from "@eachbase/pages";
import React from "react";
import {
    CreateAdminTable,
    // CreateOfficeTable,
    CreateBranchTable,
    CreateAuthorities,
    CreateAgent,
    CreateFactoringTable,
    CreateCarrier,
} from "@eachbase/fragments";

export const Router = ({}) => {
  return (

    <Switch>
      {/*<Route path='/' exact component={Offices}/>*/}

      <Route path="/fundingSource" exact component={FundingSource} />
      <Route path="/fundingSource/:id" exact component={FundingSourceSingle} />
      {/*<Route path="/createOffice" exact component={CreateOfficeTable} />*/}
      <Route path="/staff" exact component={Staff} />
      <Route path="/staff/:id" exact component={SingleStaff} />

      <Route path="/branches" component={Branches} />
      <Route path="/client" exact component={Client} />
      <Route path="/client/:id" exact component={ClientSingle} />
      {/*<Route path="/createBranch" component={CreateBranchTable} />*/}

      <Route path="/humanResources" component={HumanResources} />
      <Route path="/humanResources" component={HumanResources} />
      <Route path="/createAdmin" component={CreateAdminTable} />

      <Route path="/management" component={Management} />
      <Route path="/single" component={Single} />

      {/*<Route path="/customers" component={Customers} />*/}


      {/*<Route path="/factoring" component={Factoring} />*/}
      {/*<Route path="/createFactoring" component={CreateFactoringTable} />*/}


      {/*<Route path="/authorities" component={Authorities} />*/}
      {/*<Route path="/createAuthorities" component={CreateAuthorities} />*/}


      {/*<Route path="/agents" component={Agents} />*/}
      {/*<Route path="/createAgent" component={CreateAgent} />*/}


      {/*<Route path="/carriers" component={Carriers} />*/}
      {/*<Route path="/createCarriers" component={CreateCarrier} />*/}


      <Redirect to={"/"} />
    </Switch>
  );
};
