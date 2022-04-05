import React from "react";
import { SearchAndFilter } from "@eachbase/components";
import { tableTheadTbodyStyle } from "./styles";

export const ReceivableTHead = () => {
   const classes = tableTheadTbodyStyle();

   return (
      <div className={classes.tableTheadStyle}>
         <SearchAndFilter
            title={"Date of Service"}
            type={"latestEarliest"}
            iconsAreLight
         />
         <SearchAndFilter
            title={"Place of Service"}
            custom={false}
            iconsAreLight
         />
         <SearchAndFilter title={"CPT Code"} custom={false} iconsAreLight />
         <SearchAndFilter title={"Modifier"} custom={false} iconsAreLight />
         <SearchAndFilter title={"Total Units"} custom={false} iconsAreLight />
         <SearchAndFilter title={"Total Billed"} custom={false} iconsAreLight />
         <SearchAndFilter
            title={"Rendering Provider"}
            custom={false}
            iconsAreLight
         />
         <SearchAndFilter title={""} custom={false} iconsAreLight />
      </div>
   );
};
