import React, { useEffect, useState } from "react";
import {
   handleCreatedAtDate,
   Images,
   isNotEmpty,
   manageStatus,
   showDashIfEmpty,
   useWidth,
} from "@eachbase/utils";
import { claimModalTHeadTBodyStyle } from "./styles";
import { EditablePaymentInput } from "@eachbase/components";
import { getReceivData } from "./constants";

export const ClaimReceivableModalTBody = ({ receivable, passReceivable }) => {
   const classes = claimModalTHeadTBodyStyle();

   const width = useWidth();

   function getTableData(data) {
      return showDashIfEmpty(getReceivData(data, width));
   }

   const [edit, setEdit] = useState(false);
   const [inputs, setInputs] = useState({});

   const receivInputsAreFilled =
      isNotEmpty(inputs.allowedAMT) &&
      isNotEmpty(inputs.deductible) &&
      isNotEmpty(inputs.copay) &&
      isNotEmpty(inputs.coINS) &&
      isNotEmpty(inputs.paidAMT);

   useEffect(() => {
      passReceivable &&
         passReceivable({ ...receivable, filled: receivInputsAreFilled, ...inputs });
   }, [receivInputsAreFilled, inputs]);

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
               triggerInputValue={(allowedAMT) => setInputs({ ...inputs, allowedAMT })}
               triggerEditBool={(editBool) => setEdit(editBool)}
            />
            <EditablePaymentInput
               triggerInputValue={(deductible) => setInputs({ ...inputs, deductible })}
               triggerEditBool={(editBool) => setEdit(editBool)}
            />
            <EditablePaymentInput
               triggerInputValue={(copay) => setInputs({ ...inputs, copay })}
               triggerEditBool={(editBool) => setEdit(editBool)}
            />
            <EditablePaymentInput
               triggerInputValue={(coINS) => setInputs({ ...inputs, coINS })}
               triggerEditBool={(editBool) => setEdit(editBool)}
            />
            <EditablePaymentInput
               triggerInputValue={(paidAMT) => setInputs({ ...inputs, paidAMT })}
               triggerEditBool={(editBool) => setEdit(editBool)}
            />
            <div className={classes.tdStyle}>{action}</div>
         </div>
      </div>
   );
};