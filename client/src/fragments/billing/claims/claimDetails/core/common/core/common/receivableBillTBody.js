import React from "react";
import { manageStatus, showDashIfEmpty } from "@eachbase/utils";
import { receivableBillTHeadTBodyStyle } from "./styles";
import { DownloadLink } from "@eachbase/components";

export const ReceivableBillTBody = ({ receivableBill }) => {
   const classes = receivableBillTHeadTBodyStyle();

   return (
      <div className={classes.tbodyContainerStyle}>
         <div className={classes.tbodyRowStyle}>
            <div className={classes.tdStyle}>
               {showDashIfEmpty(receivableBill._id)}
            </div>
            <div className={classes.tdStyle}>
               {showDashIfEmpty(receivableBill.dateOfService)}
            </div>
            <div className={classes.tdStyle}>
               {showDashIfEmpty(manageStatus(receivableBill.timeOfService))}
            </div>
            <div className={classes.tdStyle}>
               {showDashIfEmpty(receivableBill.units)}
            </div>
            <div className={classes.tdStyle}>
               <DownloadLink
                  linkHref={receivableBill.signature}
                  linkInnerText={"Signature"}
                  linkDownload={true}
               />
            </div>
         </div>
      </div>
   );
};
