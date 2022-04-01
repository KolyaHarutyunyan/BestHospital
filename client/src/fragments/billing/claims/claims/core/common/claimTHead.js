import React from "react";
import {
   HtmlTooltip,
   SearchAndFilter,
   TableHeadComponent,
} from "@eachbase/components";
import { TableCell } from "@material-ui/core";
import { getLimitedVal, useWidth } from "@eachbase/utils";

const tHeadStyle = {
   boxShadow: "0px 4px 2px #347af01a",
   backgroundColor: "#EBF2FD",
};

const getTheadTitle = (innerWidth, size, title = "", limit = 5) => {
   return innerWidth < size ? getLimitedVal(title, limit) : title;
};

const getTheadDisplay = (
   tooltipTitle = "",
   theadTitle = "",
   theadType = "",
   theadCustom = true,
   tooltipPlace = "top-start"
) => {
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
};

export const ClaimTHead = () => {
   const width = useWidth();

   return (
      <TableHeadComponent tHeadStyle={tHeadStyle}>
         <TableCell>
            <SearchAndFilter title={"ID"} custom={false} />
         </TableCell>
         <TableCell>
            {getTheadDisplay(
               "Date Period",
               getTheadTitle(width, 1550, "Date Period"),
               "latestEarliest"
            )}
         </TableCell>
         <TableCell>
            {getTheadDisplay(
               "Funding Source",
               getTheadTitle(width, 1560, "Funding Source")
            )}
         </TableCell>
         <TableCell>
            <SearchAndFilter title={"Client"} />
         </TableCell>
         <TableCell>
            {getTheadDisplay(
               "Total Charged",
               getTheadTitle(width, 1560, "Funding Source"),
               "",
               false
            )}
         </TableCell>
         <TableCell>
            {getTheadDisplay(
               "Total Paid",
               getTheadTitle(width, 1560, "Total Paid"),
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
               getTheadTitle(width, 1560, "Payment Reference"),
               "",
               false
            )}
         </TableCell>
      </TableHeadComponent>
   );
};
