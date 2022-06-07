import { SearchAndFilter } from "@eachbase/components";
import React from "react";
import { fundingSourceCommonCoreStyle } from "./styles";

export const ServiceTHead = () => {
   const classes = fundingSourceCommonCoreStyle();

   return (
      <div className={classes.tableTheadStyle}>
         <div className={classes.thStyle}>
            {<SearchAndFilter title={"Service"} custom={true} />}
         </div>
         <div className={classes.thStyle}>{"CPT Code"}</div>
         <div className={classes.thStyle}>{"Unit Size"}</div>
         <div className={classes.thStyle}>{"Min Unit"}</div>
         <div className={classes.thStyle}>{"Max Unit"}</div>
         <div className={classes.thStyle}>{"Charge Rate"}</div>
         <div className={classes.thStyle}>{"Credential"}</div>
         <div className={classes.thStyle}>{"Actions"}</div>
      </div>
   );
};
