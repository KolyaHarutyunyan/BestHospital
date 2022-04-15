import React, { useContext } from "react";
import { claimTHeadTBodyStyle } from "./styles";
import { useHistory } from "react-router-dom";
import {
   addSignToValueFromStart,
   DrawerContext,
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
            const { dateRange, funder, client } = claim || {};
            const early = handleCreatedAtDate(dateRange?.early, 10, "/");
            const latest = handleCreatedAtDate(dateRange?.latest, 10, "/");

            return (
               <div
                  key={index}
                  className={classes.tbodyRowStyle}
                  onClick={() => history.push(`/claim/${claim._id}`)}
               >
                  <div className={classes.tdStyle}>{getTableData(claim._id)}</div>
                  <div className={classes.tdStyle}>
                     {getTableData(`${early} - ${latest}`)}
                  </div>
                  <div className={classes.tdStyle} style={styles}>
                     {getTableData(funder?.firstName)} {getTableData(funder?.lastName)}
                  </div>
                  <div className={classes.tdStyle} style={styles}>
                     {getTableData(client?.firstName)} {getTableData(client?.lastName)}
                  </div>
                  <div className={classes.tdStyle}>
                     {getTableData(
                        addSignToValueFromStart(getValueByFixedNumber(claim.totalCharge))
                     )}
                  </div>
                  <div className={classes.tdStyle}>
                     {getTableData(
                        addSignToValueFromStart(getValueByFixedNumber(claim.ammountPaid))
                     )}
                  </div>
                  <div className={classes.tdStyle}>
                     {getTableData(
                        addSignToValueFromStart(getValueByFixedNumber(claim.remaining))
                     )}
                  </div>
                  <div className={classes.tdStyle}>
                     {showDashIfEmpty(manageStatus(claim.status))}
                  </div>
                  <div className={classes.tdStyle}>
                     <a
                        className={classes.paymentRefStyle}
                        href={`https://${claim.paymentRef || "www.testlink.com"}`}
                        target="_blank"
                        rel="noreferrer noopener"
                        onClick={(event) => event.stopPropagation()}
                     >
                        {getTableHeader(
                           claim.paymentRef || "www.testlink.com",
                           getTableData(claim.paymentRef || "www.testlink.com"),
                           "",
                           false
                        )}
                     </a>
                  </div>
               </div>
            );
         })}
      </div>
   );
};
