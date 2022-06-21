import React from "react";
import { Card } from "@eachbase/components";
import { fundingSourceSingleStyles } from "./styles";
import {
   getFundingSourceAddressInfo,
   getFundingSourceContactInfo,
   getFundingSourceGeneralInfo,
} from "./constants";

export const FundingSourceSingleGeneral = ({ data }) => {
   const classes = fundingSourceSingleStyles();

   return (
      <React.Fragment>
         <div className={classes.fundingSourceSingleGeneralStyles}>
            <Card cardInfo={getFundingSourceGeneralInfo(data)} width={"32.5%"} />
            <Card cardInfo={getFundingSourceContactInfo(data)} width={"32.5%"} />
            <Card cardInfo={getFundingSourceAddressInfo(data)} width={"32.5%"} />
         </div>
      </React.Fragment>
   );
};
