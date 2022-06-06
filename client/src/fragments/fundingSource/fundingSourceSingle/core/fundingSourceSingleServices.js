import React from "react";
import { NoItemText } from "@eachbase/components";
import { fundingSourceSingleStyles } from "./styles";
import { ServiceTable } from "./common";

export const FundingSourceSingleServices = ({ data }) => {
   const classes = fundingSourceSingleStyles();

   return (
      <div className={classes.fundindServiceItems}>
         {!!data.length ? (
            <ServiceTable services={data} />
         ) : (
            <NoItemText text={"No Services Yet"} />
         )}
      </div>
   );
};
