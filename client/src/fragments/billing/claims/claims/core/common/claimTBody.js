import React from "react";
import { useHistory } from "react-router-dom";
import { TableBodyComponent } from "@eachbase/components";
import { TableBody, TableCell } from "@material-ui/core";
import {
   addSignToValueFromStart,
   getLimitedVal,
   getValueByFixedNumber,
   handleCreatedAtDate,
   manageStatus,
   showDashIfEmpty,
} from "@eachbase/utils";

export const ClaimTBody = ({ claims = [] }) => {
   const history = useHistory();

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
                     <div>
                        {showDashIfEmpty(`${createdDate} - ${submtDate}`)}
                     </div>
                  </TableCell>
                  <TableCell>
                     <div>
                        {showDashIfEmpty(
                           getLimitedVal(claim.funder?.middleName, 13)
                        )}
                     </div>
                  </TableCell>
                  <TableCell>
                     <div>
                        {showDashIfEmpty(
                           getLimitedVal(claim.client?.middleName, 13)
                        )}
                     </div>
                  </TableCell>
                  <TableCell>
                     <div>
                        {showDashIfEmpty(
                           addSignToValueFromStart(
                              getValueByFixedNumber(claim.totalCharge)
                           )
                        )}
                     </div>
                  </TableCell>
                  <TableCell>
                     <div>
                        {showDashIfEmpty(
                           addSignToValueFromStart(
                              getValueByFixedNumber(claim.ammountPaid)
                           )
                        )}
                     </div>
                  </TableCell>
                  <TableCell>
                     <div>
                        {showDashIfEmpty(
                           addSignToValueFromStart(
                              getValueByFixedNumber(claim.remaining)
                           )
                        )}
                     </div>
                  </TableCell>
                  <TableCell>
                     <div>{showDashIfEmpty(manageStatus(claim.status))}</div>
                  </TableCell>
                  <TableCell>
                     <div>
                        {showDashIfEmpty(getLimitedVal(claim.paymentRef, 20))}
                     </div>
                  </TableCell>
               </TableBodyComponent>
            );
         })}
      </TableBody>
   );
};
