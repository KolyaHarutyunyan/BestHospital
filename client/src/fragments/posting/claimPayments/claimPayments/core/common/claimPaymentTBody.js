import React, { useContext } from "react";
import { claimPaymentTHeadTBodyStyle } from "./styles";
import { useHistory } from "react-router-dom";
import {
   addSignToValueFromStart,
   DrawerContext,
   getFullName,
   getLimitedVal,
   getValueByFixedNumber,
   manageStatus,
   showDashIfEmpty,
   useWidth,
} from "@eachbase/utils";

function getClaimPaymentData(givenData = "", isOpen, givenWidth) {
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

export const ClaimPaymentTBody = ({ claimPayments = [] }) => {
   const classes = claimPaymentTHeadTBodyStyle();

   const history = useHistory();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   function getTableData(data) {
      return showDashIfEmpty(getClaimPaymentData(data, open, width));
   }

   return (
      <div className={classes.tbodyContainerStyle}>
         {claimPayments.map((claimPayment, index) => {
            const claimPaymentId = getTableData(claimPayment._id);
            const funderFirstName = claimPayment?.funder?.firstName;
            const funderLastName = claimPayment?.funder?.lastName;
            const funder = getFullName(funderFirstName, funderLastName, getTableData);
            const clientFirstName = claimPayment?.client?.firstName;
            const clientLastName = claimPayment?.client?.firstName;
            const client = getFullName(clientFirstName, clientLastName, getTableData);
            const totalBilled = getTableData(
               addSignToValueFromStart(getValueByFixedNumber(claimPayment.totalBilled))
            );
            const totalCollected = getTableData(
               addSignToValueFromStart(getValueByFixedNumber(claimPayment.totalCollected))
            );
            const status = showDashIfEmpty(manageStatus(claimPayment.status));
            const paymentReference = getTableData(claimPayment.paymentRef);

            return (
               <div
                  key={index}
                  className={classes.tbodyRowStyle}
                  onClick={() => history.push(`/claimPayment/${claimPayment._id}`)}
               >
                  <div className={classes.tdStyle}>{claimPaymentId}</div>
                  <div className={classes.tdStyle}>{funder}</div>
                  <div className={classes.tdStyle}>{client}</div>
                  <div className={classes.tdStyle}>{totalBilled}</div>
                  <div className={classes.tdStyle}>{totalCollected}</div>
                  <div className={classes.tdStyle}>{status}</div>
                  <div className={classes.tdStyle}>{paymentReference}</div>
               </div>
            );
         })}
      </div>
   );
};
