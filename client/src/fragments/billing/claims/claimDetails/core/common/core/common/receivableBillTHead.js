import React from "react";
import { receivableBillTHeadTBodyStyle } from "./styles";
import { SearchAndFilter } from "@eachbase/components";

export const ReceivableBillTHead = () => {
   const classes = receivableBillTHeadTBodyStyle();

   function getReceivableBillTitle(givenTitle = "") {
      return <SearchAndFilter title={givenTitle} custom={false} />;
   }

   const receivableBillId = getReceivableBillTitle("ID");
   const dateOfService = getReceivableBillTitle("Date of Service");
   const timeOfService = getReceivableBillTitle("Time of Service");
   const units = getReceivableBillTitle("Units");
   const signature = getReceivableBillTitle("Signature");

   return (
      <div className={classes.tableTheadStyle}>
         <div className={classes.thStyle}> {receivableBillId}</div>
         <div className={classes.thStyle}> {dateOfService}</div>
         <div className={classes.thStyle}>{timeOfService}</div>
         <div className={classes.thStyle}>{units}</div>
         <div className={classes.thStyle}>{signature}</div>
      </div>
   );
};
