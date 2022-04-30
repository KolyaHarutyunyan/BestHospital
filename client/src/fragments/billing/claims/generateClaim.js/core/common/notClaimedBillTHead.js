import React, { useContext, useEffect, useState } from "react";
import { notClaimedBillTHeadTBodyStyle } from "./styles";
import {
   CheckupContext,
   DrawerContext,
   getTableHeader,
   getTextDependsOnWidth,
   useWidth,
} from "@eachbase/utils";
import { CheckBoxInput, SimpleTooltip } from "@eachbase/components";

export const NotClaimedBillTHead = ({ uncheckAllBills }) => {
   const classes = notClaimedBillTHeadTBodyStyle();

   const width = useWidth();

   const { open } = useContext(DrawerContext);
   const { itemsAreChecked, handleItemsCheckup } = useContext(CheckupContext);

   const [checked, setChecked] = useState(false);

   useEffect(() => {
      if (checked) return;

      uncheckAllBills && uncheckAllBills();
   }, [checked]);

   function getNotClaimedBillTitle(givenTitle = "", ...rest) {
      const size = open ? 1650 : 1500;
      const limit = open ? 6 : 8;

      return getTableHeader(
         givenTitle,
         getTextDependsOnWidth(width, size, givenTitle, limit),
         ...rest
      );
   }

   const dateOfService = getNotClaimedBillTitle("Date of Service", "", false);
   const placeOfService = getNotClaimedBillTitle("Place of Service", "", false);
   const service = getNotClaimedBillTitle("Service", "", false);
   const fundingSource = getNotClaimedBillTitle("Funding Source", "", false);
   const client = getNotClaimedBillTitle("Client", "", false);
   const units = getNotClaimedBillTitle("Units", "", false);
   const claimAmount = getNotClaimedBillTitle("Claim Amount", "", false);
   const signature = getNotClaimedBillTitle("Signature", "", false);

   return (
      <div className={classes.tableTheadStyle}>
         <SimpleTooltip title={"Select"} placement={"top-start"}>
            <div className={`${classes.thStyle} checkbox-th`}>
               <CheckBoxInput
                  inputId={"notClaimedBills"}
                  inputClassName={classes.billCheckboxStyle}
                  inputChecked={itemsAreChecked}
                  onInputChange={(event) => {
                     handleItemsCheckup(event.target.checked);
                     setChecked(event.target.checked);
                  }}
                  uniqueCheckbox
               />
            </div>
         </SimpleTooltip>
         <div className={classes.thStyle}>{dateOfService}</div>
         <div className={classes.thStyle}>{placeOfService}</div>
         <div className={classes.thStyle}>{service}</div>
         <div className={classes.thStyle}>{fundingSource}</div>
         <div className={classes.thStyle}>{client}</div>
         <div className={classes.thStyle}>{units}</div>
         <div className={classes.thStyle}>{claimAmount}</div>
         <div className={classes.thStyle}>{signature}</div>
      </div>
   );
};
