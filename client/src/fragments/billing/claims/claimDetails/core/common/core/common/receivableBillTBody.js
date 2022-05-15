import React from "react";
import { hooksForTable, manageStatus } from "@eachbase/utils";
import { receivableBillTHeadTBodyStyle } from "./styles";
import { DownloadLink } from "@eachbase/components";

export const ReceivableBillTBody = ({ receivableBill }) => {
   const classes = receivableBillTHeadTBodyStyle();

   const { showDashIfEmpty, handleCreatedAtDate } = hooksForTable;

   const receivableBillId = showDashIfEmpty(receivableBill._id);
   const dateOfService = showDashIfEmpty(
      handleCreatedAtDate(receivableBill.dateOfService)
   );
   const timeOfService = showDashIfEmpty(manageStatus(receivableBill.timeOfService));
   const units = showDashIfEmpty(receivableBill.units);
   const signature = receivableBill.signature;

   return (
      <div className={classes.tbodyContainerStyle}>
         <div className={classes.tbodyRowStyle}>
            <div className={classes.tdStyle}>{receivableBillId}</div>
            <div className={classes.tdStyle}>{dateOfService}</div>
            <div className={classes.tdStyle}>{timeOfService}</div>
            <div className={classes.tdStyle}>{units}</div>
            <div className={classes.tdStyle}>
               <DownloadLink
                  linkHref={signature}
                  linkInnerText={"Signature"}
                  linkDownload={true}
               />
            </div>
         </div>
      </div>
   );
};
