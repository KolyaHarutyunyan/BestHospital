import React from "react";
import { systemCoreCommonCoreStyle } from "./style";
import { SearchAndFilter } from "@eachbase/components";

export const SystemServiceTypeTHead = () => {
   const classes = systemCoreCommonCoreStyle();

   return (
      <div className={classes.tableTheadStyle}>
         <div className={classes.thStyle} style={{ maxWidth: "490px" }}>
            {<SearchAndFilter title={"Name"} custom={true} />}
         </div>
         <div className={classes.thStyle} style={{ maxWidth: "481px" }}>
            {"Display Code"}
         </div>
         <div className={classes.thStyle} style={{ maxWidth: "481px" }}>
            {"Category"}
         </div>
         <div className={classes.thStyle} style={{ maxWidth: "128px" }}>
            {"Action"}
         </div>
      </div>
   );
};
