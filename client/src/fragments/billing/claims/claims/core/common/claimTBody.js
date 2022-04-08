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

   const size = open ? 1575 : 1560;
   const limit = open ? 4 : 10;

   function getDisplayOf(givenText = "") {
      if (typeof givenText !== "string") return givenText;

      return showDashIfEmpty(getTextDependsOnWidth(width, size, givenText, limit));
   }

   return (
      <TableBody>
         {claims.map((claim, index) => {
            const createdDate = handleCreatedAtDate(claim.createdDate, 10, "/");
            const submtDate = handleCreatedAtDate(claim.submittedDate, 10, "/");

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
                     <div>{getDisplayOf(`${createdDate} - ${submtDate}`)}</div>
                  </TableCell>
                  <TableCell>
                     <div>{getDisplayOf(claim.funder?.middleName)}</div>
                  </TableCell>
                  <TableCell>
                     <div>{getDisplayOf(claim.client?.middleName)}</div>
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
                        href={`https://${claim.paymentRef}`}
                        target="_blank"
                        rel="noreferrer noopener"
                        onClick={(event) => event.stopPropagation()}
                     >
                        {showDashIfEmpty(getLimitedVal(claim.paymentRef, 20))}
                     </a>
                  </TableCell>
               </TableBodyComponent>
            );
         })}
      </TableBody>
   );
};
