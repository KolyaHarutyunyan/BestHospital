import React from "react";
import { SearchAndFilter, TableHeadComponent } from "@eachbase/components";
import { TableCell } from "@material-ui/core";
import { resetRadius } from "@eachbase/utils";

export const BillTHeadWithScroll = () => {
   return (
      <TableHeadComponent
         tHeadStyle={{ backgroundColor: "#EBF2FD" }}
         hasIndividualStyles
      >
         <TableCell style={resetRadius("left")}>
            <SearchAndFilter
               title={"Hrs"}
               custom={false}
               style={"scrollable"}
            />
         </TableCell>
         <TableCell>
            <SearchAndFilter
               title={"Units"}
               custom={false}
               style={"scrollable"}
            />
         </TableCell>
         <TableCell>
            <SearchAndFilter
               title={"Billed Rate"}
               custom={false}
               style={"scrollable"}
            />
         </TableCell>
         <TableCell>
            <SearchAndFilter
               title={"Total A..."}
               type={"latestEarliest"}
               style={"scrollable"}
            />
         </TableCell>
         <TableCell>
            <SearchAndFilter
               title={"Payor Bal..."}
               custom={false}
               style={"scrollable"}
            />
         </TableCell>
         <TableCell>
            <SearchAndFilter
               title={"Client Bal..."}
               custom={false}
               style={"scrollable"}
            />
         </TableCell>
         <TableCell>
            <SearchAndFilter
               title={"Total Bal..."}
               custom={false}
               style={"scrollable"}
            />
         </TableCell>
         <TableCell>
            <SearchAndFilter
               title={"Claim Status"}
               type={"arrow"}
               style={"scrollable"}
            />
         </TableCell>
         <TableCell>
            <SearchAndFilter
               title={"Invoice Status"}
               type={"arrow"}
               style={"scrollable"}
            />
         </TableCell>
         <TableCell>
            <SearchAndFilter
               title={"Status"}
               type={"arrow"}
               style={"scrollable"}
            />
         </TableCell>
      </TableHeadComponent>
   );
};
