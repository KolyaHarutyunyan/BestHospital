import React from "react";
import { SearchAndFilter, TableHeadComponent } from "@eachbase/components";
import { TableCell } from "@material-ui/core";
import { resetRadius } from "@eachbase/utils";

const tHeadStyle = {
   boxShadow: "0px 4px 2px #347af01a",
   ...resetRadius(),
   backgroundColor: "#EBF2FD",
};

export const BillTHeadWithoutScroll = () => {
   return (
      <TableHeadComponent tHeadStyle={tHeadStyle} hasIndividualStyles>
         <TableCell>
            <SearchAndFilter title={"ID"} custom={false} />
         </TableCell>
         <TableCell>
            <SearchAndFilter title={"DoS"} type={"latestEarliest"} />
         </TableCell>
         <TableCell>
            <SearchAndFilter title={"Payor"} />
         </TableCell>
         <TableCell>
            <SearchAndFilter title={"Client"} />
         </TableCell>
         <TableCell style={resetRadius("right")}>
            <SearchAndFilter title={"Service"} custom={false} />
         </TableCell>
      </TableHeadComponent>
   );
};
