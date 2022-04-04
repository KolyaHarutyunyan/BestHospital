import React, { useContext } from "react";
import {
   HtmlTooltip,
   SearchAndFilter,
   TableHeadComponent,
} from "@eachbase/components";
import { TableCell } from "@material-ui/core";
import {
   DrawerContext,
   getTextDependsOnWidth,
   useWidth,
} from "@eachbase/utils";

const tHeadStyle = {
   boxShadow: "0px 4px 2px #347af01a",
   backgroundColor: "#EBF2FD",
};

function getTheadDisplay(
   tooltipTitle = "",
   theadTitle = "",
   theadType = "",
   theadCustom = true,
   tooltipPlace = "top-start"
) {
   if (tooltipTitle.length !== theadTitle.length) {
      return (
         <HtmlTooltip title={<p>{tooltipTitle}</p>} placement={tooltipPlace}>
            <div>
               <SearchAndFilter
                  title={theadTitle}
                  custom={theadCustom}
                  type={theadType}
               />
            </div>
         </HtmlTooltip>
      );
   }
   return (
      <SearchAndFilter
         title={theadTitle}
         custom={theadCustom}
         type={theadType}
      />
   );
}

export const ClaimTHead = () => {
   const width = useWidth();

   const { open } = useContext(DrawerContext);

   const size = open ? 1575 : 1560;
   const limit = open ? 3 : 5;

   return (
      <TableHeadComponent tHeadStyle={tHeadStyle}>
         <TableCell>
            <SearchAndFilter title={"ID"} custom={false} />
         </TableCell>
         <TableCell>
            {getTheadDisplay(
               "Date Period",
               getTextDependsOnWidth(width, size, "Date Period", limit),
               "latestEarliest"
            )}
         </TableCell>
         <TableCell>
            {getTheadDisplay(
               "Funding Source",
               getTextDependsOnWidth(width, size, "Funding Source", limit)
            )}
         </TableCell>
         <TableCell>
            <SearchAndFilter title={"Client"} />
         </TableCell>
         <TableCell>
            {getTheadDisplay(
               "Total Charged",
               getTextDependsOnWidth(width, size, "Funding Source", limit),
               "",
               false
            )}
         </TableCell>
         <TableCell>
            {getTheadDisplay(
               "Total Paid",
               getTextDependsOnWidth(width, size, "Total Paid", limit),
               "",
               false
            )}
         </TableCell>
         <TableCell>
            <SearchAndFilter title={"Remaining"} custom={false} />
         </TableCell>
         <TableCell>
            <SearchAndFilter title={"Status"} type={"arrow"} />
         </TableCell>
         <TableCell>
            {getTheadDisplay(
               "Payment Reference",
               getTextDependsOnWidth(width, size, "Payment Reference", limit),
               "",
               false
            )}
         </TableCell>
      </TableHeadComponent>
   );
};
