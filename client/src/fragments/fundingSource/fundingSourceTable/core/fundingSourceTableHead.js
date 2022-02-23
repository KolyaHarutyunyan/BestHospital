import React from "react";
import { SearchAndFilter, TableHeadComponent } from "@eachbase/components";
import { TableCell } from "@material-ui/core";

export const FundingSourceTableHead = ({}) => {
   return (
      <TableHeadComponent>
         {
            <>
               <TableCell>
                  <SearchAndFilter title={"Name"} />
               </TableCell>

               <TableCell>
                  <SearchAndFilter title={"Type"} type={"arrow"} />
               </TableCell>

               <TableCell>
                  <SearchAndFilter title={"Address"} />
               </TableCell>
               <TableCell>
                  <SearchAndFilter title={"Email"} />
               </TableCell>

               <TableCell>
                  <SearchAndFilter title={"Phone Number"} custom={false} />
               </TableCell>
            </>
         }
      </TableHeadComponent>
   );
};
