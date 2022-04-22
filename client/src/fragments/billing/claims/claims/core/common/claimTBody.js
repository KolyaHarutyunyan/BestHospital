import React, { useContext } from "react";
import { claimTHeadTBodyStyle } from "./styles";
import { useHistory } from "react-router-dom";
import {
   addSignToValueFromStart,
   DrawerContext,
   getFullName,
   getLimitedVal,
   getTableHeader,
   getValueByFixedNumber,
   handleCreatedAtDate,
   manageStatus,
   showDashIfEmpty,
   useWidth,
} from "@eachbase/utils";

const styles = { display: "flex", alignItems: "center" };

function getClaimData(givenData = "", isOpen, givenWidth) {
   const firstSize = isOpen ? 2040 : 1940;
   const firstLimit = isOpen ? 14 : 16;

   const secondSize = isOpen ? 1680 : 1640;
   const secondLimit = isOpen ? 12 : 14;

   const thirdSize = isOpen ? 1350 : 1345;
   const thirdLimit = isOpen ? 8 : 10;

   const initialLimit = isOpen ? 21 : 23;

   const tableData =
      givenWidth <= thirdSize
         ? getLimitedVal(givenData, thirdLimit)
         : givenWidth > thirdSize && givenWidth <= secondSize
         ? getLimitedVal(givenData, secondLimit)
         : givenWidth > secondSize && givenWidth <= firstSize
         ? getLimitedVal(givenData, firstLimit)
         : getLimitedVal(givenData, initialLimit);

   return tableData;
}

export const ClaimTBody = ({ claims = [] }) => {
   const classes = claimTHeadTBodyStyle();

   const history = useHistory();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   function getTableData(data) {
      return showDashIfEmpty(getClaimData(data, open, width));
   }

   return (
      <div className={classes.tbodyContainerStyle}>
         {claims.map((claim, index) => {
            const claimId = getTableData(claim._id);
            const early = handleCreatedAtDate(claim?.dateRange?.early, 10, "/");
            const latest = handleCreatedAtDate(claim?.dateRange?.latest, 10, "/");
            const datePeriod = getTableData(`${early} - ${latest}`);
            const funderFirstName = claim?.funder?.firstName;
            const funderLastName = claim?.funder?.lastName;
            const funder = getFullName(funderFirstName, funderLastName, getTableData);
            const clientFirstName = claim?.client?.firstName;
            const clientLastName = claim?.client?.firstName;
            const client = getFullName(clientFirstName, clientLastName, getTableData);
            const totalCharged = getTableData(
               addSignToValueFromStart(getValueByFixedNumber(claim.totalCharge))
            );
            const totalPaid = getTableData(
               addSignToValueFromStart(getValueByFixedNumber(claim.amountPaid))
            );
            const remaining = getTableData(
               addSignToValueFromStart(getValueByFixedNumber(claim.remaining))
            );
            const status = showDashIfEmpty(manageStatus(claim.status));
            const paymentReference = getTableHeader(
               claim.paymentRef || "www.testlink.com",
               getTableData(claim.paymentRef || "www.testlink.com"),
               "",
               false
            );

            return (
               <div
                  key={index}
                  className={classes.tbodyRowStyle}
                  onClick={() => history.push(`/claim/${claim._id}`)}
               >
                  <div className={classes.tdStyle}>{claimId}</div>
                  <div className={classes.tdStyle}>{datePeriod}</div>
                  <div className={classes.tdStyle} style={styles}>
                     {funder}
                  </div>
                  <div className={classes.tdStyle} style={styles}>
                     {client}
                  </div>
                  <div className={classes.tdStyle}>{totalCharged}</div>
                  <div className={classes.tdStyle}>{totalPaid}</div>
                  <div className={classes.tdStyle}>{remaining}</div>
                  <div className={classes.tdStyle}>{status}</div>
                  <div className={classes.tdStyle}>
                     <a
                        className={classes.paymentRefStyle}
                        href={`https://${claim.paymentRef || "www.testlink.com"}`}
                        target="_blank"
                        rel="noreferrer noopener"
                        onClick={(event) => event.stopPropagation()}
                     >
                        {paymentReference}
                     </a>
                  </div>
               </div>
            );
         })}
      </div>
   );
};
