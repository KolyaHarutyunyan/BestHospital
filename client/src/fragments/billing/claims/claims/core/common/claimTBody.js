import React, { useContext } from "react";
import { claimTHeadTBodyStyle } from "./styles";
import { useHistory } from "react-router-dom";
import {
   addSignToValueFromStart,
   DrawerContext,
   getTableHeader,
   getTextDependsOnWidth,
   getValueByFixedNumber,
   handleCreatedAtDate,
   manageStatus,
   showDashIfEmpty,
   useWidth,
} from "@eachbase/utils";

const styles = { display: "flex", alignItems: "center" };

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
                  <div className={classes.tdStyle}>{getDisplayOf(claim._id)}</div>
                  <div className={classes.tdStyle}>
                     {getDisplayOf(`${early} - ${latest}`)}
                  </div>
                  <div className={classes.tdStyle} style={styles}>
                     {getDisplayOf(funder?.firstName)} {getDisplayOf(funder?.lastName)}
                  </div>
                  <div className={classes.tdStyle} style={styles}>
                     {getDisplayOf(client?.firstName)} {getDisplayOf(client?.lastName)}
                  </div>
                  <div className={classes.tdStyle}>
                     {getDisplayOf(
                        addSignToValueFromStart(getValueByFixedNumber(claim.totalCharge))
                     )}
                  </div>
                  <div className={classes.tdStyle}>
                     {getDisplayOf(
                        addSignToValueFromStart(getValueByFixedNumber(claim.ammountPaid))
                     )}
                  </div>
                  <div className={classes.tdStyle}>
                     {getDisplayOf(
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
                           getDisplayOf(claim.paymentRef || "www.testlink.com"),
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
