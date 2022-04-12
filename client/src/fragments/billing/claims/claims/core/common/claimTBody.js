import React, { useContext } from "react";
import { claimTHeadTBodyStyle } from "./styles";
import { useHistory } from "react-router-dom";
import { TableBodyComponent } from "@eachbase/components";
import { TableBody, TableCell } from "@material-ui/core";
import {
   addSignToValueFromStart,
   DrawerContext,
   getLimitedVal,
   getTextDependsOnWidth,
   getValueByFixedNumber,
   handleCreatedAtDate,
   manageStatus,
   showDashIfEmpty,
   useWidth,
} from "@eachbase/utils";

export const ClaimTBody = ({ claims = [] }) => {
   const classes = claimTHeadTBodyStyle();

   const history = useHistory();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   const size = open ? 1830 : 1680;
   const limit = open ? 4 : 5;

   function getDisplayOf(givenText = "") {
      if (typeof givenText !== "string") return givenText;
      return showDashIfEmpty(getTextDependsOnWidth(width, size, givenText, limit));
   }

   return (
      <TableBody>
         {claims.map((claim, index) => {
            const { dateRange, funder, client } = claim || {};
            const early = handleCreatedAtDate(dateRange?.early, 10, "/");
            const latest = handleCreatedAtDate(dateRange?.latest, 10, "/");

            return (
               <TableBodyComponent
                  key={index}
                  handleOpenInfo={() => history.push(`/claim/${claim._id}`)}
                  className={"billingSystem claimTBody"}
               >
                  <TableCell>
                     <div>{showDashIfEmpty(getLimitedVal(claim._id, 13))}</div>
                  </TableCell>
                  <TableCell>
                     <div>{getDisplayOf(`${early} - ${latest}`)}</div>
                  </TableCell>
                  <TableCell>
                     <div>{getDisplayOf(funder?.middleName)}</div>
                  </TableCell>
                  <TableCell>
                     <div>{getDisplayOf(client?.middleName)}</div>
                  </TableCell>
                  <TableCell>
                     <div>
                        {getDisplayOf(
                           addSignToValueFromStart(
                              getValueByFixedNumber(claim.totalCharge)
                           )
                        )}
                     </div>
                  </TableCell>
                  <TableCell>
                     <div>
                        {getDisplayOf(
                           addSignToValueFromStart(
                              getValueByFixedNumber(claim.ammountPaid)
                           )
                        )}
                     </div>
                  </TableCell>
                  <TableCell>
                     <div>
                        {getDisplayOf(
                           addSignToValueFromStart(getValueByFixedNumber(claim.remaining))
                        )}
                     </div>
                  </TableCell>
                  <TableCell>
                     <div>{showDashIfEmpty(manageStatus(claim.status))}</div>
                  </TableCell>
                  <TableCell>
                     <a
                        className={classes.paymentRefStyle}
                        href={`https://${claim.paymentRef || "www.testlink.com"}`}
                        target="_blank"
                        rel="noreferrer noopener"
                        onClick={(event) => event.stopPropagation()}
                     >
                        {showDashIfEmpty(
                           getLimitedVal(claim.paymentRef || "www.testlink.com", 20)
                        )}
                     </a>
                  </TableCell>
               </TableBodyComponent>
            );
         })}
      </TableBody>
   );
};
