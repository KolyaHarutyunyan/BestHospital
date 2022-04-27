import React, { useEffect, useState } from "react";
import {
   getLimitedVal,
   handleCreatedAtDate,
   Images,
   isNotEmpty,
   manageStatus,
   showDashIfEmpty,
   useWidth,
} from "@eachbase/utils";
import { claimModalTHeadTBodyStyle } from "./styles";
import { EditablePaymentInput } from "@eachbase/components";

function getReceivData(givenData = "", givenWidth) {
   const firstSize = 2561;
   const firstLimit = 14;

   const secondSize = 1680;
   const secondLimit = 10;

   const initialLimit = 23;

   const tableData =
      givenWidth <= secondSize
         ? getLimitedVal(givenData, secondLimit)
         : givenWidth > secondSize && givenWidth <= firstSize
         ? getLimitedVal(givenData, firstLimit)
         : getLimitedVal(givenData, initialLimit);

   return tableData;
}

export const ClaimReceivableModalTBody = ({ receivable, passReceivable }) => {
   const classes = claimModalTHeadTBodyStyle();

   const width = useWidth();

   function getTableData(data) {
      return showDashIfEmpty(getReceivData(data, width));
   }

   const [edit, setEdit] = useState(false);
   const [allowedAMT, setAllowedAMT] = useState("");
   const [deductible, setDeductible] = useState("");
   const [copay, setCopay] = useState("");
   const [coINS, setCoINS] = useState("");
   const [paidAMT, setPaidAMT] = useState("");

   const receivInputsAreFilled =
      isNotEmpty(allowedAMT) &&
      isNotEmpty(deductible) &&
      isNotEmpty(copay) &&
      isNotEmpty(coINS) &&
      isNotEmpty(paidAMT);

   useEffect(() => {
      if (receivInputsAreFilled) {
         passReceivable && passReceivable({ ...receivable, filled: true });
      }
   }, [receivInputsAreFilled]);

   const serviceStart = handleCreatedAtDate(receivable.dateOfService?.start, 10, "/");
   const serviceEnd = handleCreatedAtDate(receivable.dateOfService?.end, 10, "/");
   const cptCode = !!receivable.cptCode
      ? getTableData(manageStatus(receivable.cptCode))
      : "--";
   const modifier = !!receivable.modifier ? getTableData(receivable.modifier) : "--";
   const actionImageUrl = receivInputsAreFilled ? Images.successGreen : Images.success;

   const dateOfService = getTableData(`${serviceStart} - ${serviceEnd}`);
   const cptCodeAndModif = `${cptCode} (${modifier})`;
   const totalUnits = getTableData(receivable.totalUnits);
   const action = <img src={actionImageUrl} alt="" />;

   return (
      <div className={classes.tbodyContainerStyle}>
         <div className={`${classes.tbodyRowStyle} ${edit ? "active" : ""}`}>
            <div className={classes.tdStyle}>{dateOfService}</div>
            <div className={classes.tdStyle}>{cptCodeAndModif}</div>
            <div className={classes.tdStyle}>{totalUnits}</div>
            <EditablePaymentInput
               triggerInputValue={(allowedAMT) => setAllowedAMT(allowedAMT)}
               triggerEditBool={(editBool) => setEdit(editBool)}
            />
            <EditablePaymentInput
               triggerInputValue={(deductible) => setDeductible(deductible)}
               triggerEditBool={(editBool) => setEdit(editBool)}
            />
            <EditablePaymentInput
               triggerInputValue={(copay) => setCopay(copay)}
               triggerEditBool={(editBool) => setEdit(editBool)}
            />
            <EditablePaymentInput
               triggerInputValue={(coINS) => setCoINS(coINS)}
               triggerEditBool={(editBool) => setEdit(editBool)}
            />
            <EditablePaymentInput
               triggerInputValue={(paidAMT) => setPaidAMT(paidAMT)}
               triggerEditBool={(editBool) => setEdit(editBool)}
            />
            <div className={classes.tdStyle}>{action}</div>
         </div>
      </div>
   );
};
