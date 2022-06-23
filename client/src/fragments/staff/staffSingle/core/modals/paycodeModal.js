import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   ValidationInput,
   SelectInput,
   CreateChancel,
   ModalHeader,
} from "@eachbase/components";
import {
   ErrorText,
   FindError,
   FindLoad,
   FindSuccess,
   hooksForErrors,
} from "@eachbase/utils";
import {
   adminActions,
   httpRequestsOnErrorsActions,
   httpRequestsOnSuccessActions,
} from "@eachbase/store";
import { createClientStyle } from "@eachbase/fragments/client";
import { staffModalsStyle } from "./styles";

export const PaycodeModal = ({ handleClose, info, employmentId }) => {
   const classes = createClientStyle();
   const classes_v2 = staffModalsStyle();

   const dispatch = useDispatch();

   const success = FindSuccess("CREATE_PAY_CODE");
   const loader = FindLoad("CREATE_PAY_CODE");
   const backError = FindError("CREATE_PAY_CODE");

   useEffect(
      () => () => {
         dispatch(httpRequestsOnErrorsActions.removeError("CREATE_PAY_CODE"));
      },
      []
   );

   useEffect(() => {
      if (!!success.length) {
         handleClose();
         dispatch(httpRequestsOnSuccessActions.removeSuccess("CREATE_PAY_CODE"));
      }
   }, [success]);

   const globalPayCodes = useSelector((state) => state.payroll.PayCodes);

   const [error, setError] = useState("");
   const [inputs, setInputs] = useState({});
   const [payCode, setPayCode] = useState(
      info ? globalPayCodes.find((item) => item.id === info.payCodeTypeId._id) : null
   );

   const payCodeName = globalPayCodes.find(
      (item) => item.id === inputs.payCodeTypeId
   )?.name;

   const paycodeTypeErrorText = hooksForErrors.getPaycodeActiveErrorText(
      error,
      backError
   );

   function handleChange(e) {
      if (e.target.name === "payCodeTypeId") {
         setPayCode(globalPayCodes.find((item) => item.id === e.target.value));
      }
      setInputs((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
      if (
         error === e.target.name ||
         error === ErrorText.startDateError ||
         (backError && backError.length)
      ) {
         setError("");
      }
      if (backError && backError.length) {
         dispatch(httpRequestsOnErrorsActions.removeError(backError[0].type));
      }
   }

   function handleCreate() {
      const startDateIsValid =
         new Date(inputs.startDate).getTime() < new Date(new Date()).getTime();
      const payCodeDataIsValid =
         !!inputs.rate &&
         !!inputs.payCodeTypeId &&
         !!inputs.startDate &&
         startDateIsValid;
      if (payCodeDataIsValid) {
         const data = {
            name: payCodeName,
            payCodeTypeId: inputs.payCodeTypeId,
            employmentId: employmentId,
            rate: +inputs.rate,
            startDate: inputs.startDate,
         };
         dispatch(adminActions.createPayCode(data, employmentId));
      } else {
         setError(
            !inputs.payCodeTypeId
               ? "payCodeTypeId"
               : !inputs.rate
               ? "rate"
               : !inputs.startDate
               ? "startDate"
               : !startDateIsValid
               ? ErrorText.startDateError
               : ""
         );
      }
   }

   return (
      <div className={classes.createFoundingSource}>
         <ModalHeader
            className={classes_v2.paycodeModalStyle}
            handleClose={handleClose}
            title={"Add a New Paycode"}
            text={"Please fulfill the below fields to add a paycode."}
         />
         <div className={classes.createFoundingSourceBody}>
            <div className={classes.clientModalBlock}>
               <div className={classes.clientModalBox}>
                  <SelectInput
                     name={"payCodeTypeId"}
                     label={"Name*"}
                     handleSelect={handleChange}
                     value={inputs.payCodeTypeId}
                     type={"id"}
                     list={globalPayCodes}
                     typeError={paycodeTypeErrorText}
                  />
                  <div className={classes_v2.codeAndTypeBoxStyle}>
                     <div>
                        <div className={classes_v2.paycodeBox}>
                           <p className={classes_v2.paycodeBoxTitle}>Code:</p>
                           <p className={classes_v2.paycodeBoxText}>
                              {payCode?.code ? payCode.code : " N/A"}
                           </p>
                        </div>
                        <div
                           className={classes_v2.paycodeBox}
                           style={{ marginBottom: 0 }}
                        >
                           <p className={classes_v2.paycodeBoxTitle}>Type:</p>
                           <p className={classes_v2.paycodeBoxText}>
                              {payCode?.type ? payCode.type : "N/A"}
                           </p>
                        </div>
                     </div>
                  </div>
                  <ValidationInput
                     variant={"outlined"}
                     onChange={handleChange}
                     value={inputs.rate}
                     type={"number"}
                     label={"Rate*"}
                     name="rate"
                     typeError={error === "rate" && ErrorText.field}
                  />
                  <ValidationInput
                     variant={"outlined"}
                     onChange={handleChange}
                     value={inputs.startDate}
                     type={"date"}
                     label={"Start Date*"}
                     name="startDate"
                     typeError={
                        error === "startDate"
                           ? ErrorText.field
                           : error === ErrorText.startDateError
                           ? ErrorText.startDateError
                           : ""
                     }
                  />
               </div>
            </div>
            <div className={classes.clientModalBlock}>
               <CreateChancel
                  loader={!!loader.length}
                  create={"Add"}
                  chancel={"Cancel"}
                  onCreate={handleCreate}
                  onClose={handleClose}
                  buttonWidth="224px"
               />
            </div>
         </div>
      </div>
   );
};
