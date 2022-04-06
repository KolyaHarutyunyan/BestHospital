import React from "react";
import { receivableBillTHeadTBodyStyle } from "./styles";
import { SearchAndFilter } from "@eachbase/components";

export const ReceivableBillTHead = () => {
   const classes = receivableBillTHeadTBodyStyle();

   return (
      <div className={classes.tableTheadStyle}>
         <div className={classes.thStyle}>
            <SearchAndFilter title={"ID"} custom={false} />
         </div>
         <div className={classes.thStyle}>
            <SearchAndFilter title={"Date of Service"} custom={false} />
         </div>
         <div className={classes.thStyle}>
            <SearchAndFilter title={"Time of Service"} custom={false} />
         </div>
         <div className={classes.thStyle}>
            <SearchAndFilter title={"Units"} custom={false} />
         </div>
         <div className={classes.thStyle}>
            <SearchAndFilter title={"Signature"} custom={false} />
         </div>
      </div>
   );
};
