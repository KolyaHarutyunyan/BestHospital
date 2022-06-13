import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
   ValidationInput,
   SelectInput,
   CreateChancel,
   ModalHeader,
} from "@eachbase/components";
import { createClientStyle } from "./styles";
import {
   ErrorText,
   FindError,
   FindLoad,
   FindSuccess,
   hooksForErrors,
} from "@eachbase/utils";
import {
   clientActions,
   httpRequestsOnErrorsActions,
   httpRequestsOnSuccessActions,
} from "@eachbase/store";
import { Checkbox } from "@material-ui/core";

export const AddEnrollment = ({ handleClose, info }) => {
   const classes = createClientStyle();

   const params = useParams();

   let fSelect = useSelector((state) => state.fundingSource.fSelect.funders);

   const dispatch = useDispatch();

   const [error, setError] = useState("");
   const [inputs, setInputs] = useState(
      info
         ? {
              ...info,
              funding: info.funderId?.name,
              startDate: info.startDate && moment(info.startDate).format("YYYY-MM-DD"),
           }
         : {}
   );
   const [isPrimaryEnrol, setIsPrimaryEnrol] = useState(info ? info.primary : false);

   const success = info
      ? FindSuccess("EDIT_CLIENT_ENROLLMENT")
      : FindSuccess("CREATE_CLIENT_ENROLLMENT");
   const loader = info
      ? FindLoad("EDIT_CLIENT_ENROLLMENT")
      : FindLoad("CREATE_CLIENT_ENROLLMENT");
   const backError = info
      ? FindError("EDIT_CLIENT_ENROLLMENT")
      : FindError("CREATE_CLIENT_ENROLLMENT");

   const enrollmentErrorText = hooksForErrors.getEnrollmentErrorText(error, backError);

   useEffect(() => {
      return () => {
         if (info) {
            dispatch(httpRequestsOnErrorsActions.removeError("EDIT_CLIENT_ENROLLMENT"));
         } else {
            dispatch(httpRequestsOnErrorsActions.removeError("CREATE_CLIENT_ENROLLMENT"));
         }
      };
   }, []);

   useEffect(() => {
      if (!!success.length) {
         handleClose();
         dispatch(httpRequestsOnSuccessActions.removeSuccess(success[0].type));
      }
   }, [success]);

   function handleChange(e) {
      setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
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
         new Date(inputs.startDate).getTime() <= new Date(new Date()).getTime();
      const enrollmentDataIsValid =
         !!inputs.funding && !!inputs.startDate && startDateIsValid;
      if (enrollmentDataIsValid) {
         let funderId;
         fSelect.forEach((item) => {
            if (inputs.funding === item.name) {
               funderId = item.id;
            }
         });
         const data = {
            primary: isPrimaryEnrol,
            startDate: inputs.startDate,
         };
         if (info) {
            dispatch(
               clientActions.editClientEnrollment(data, params.id, funderId, info.id)
            );
         } else {
            dispatch(clientActions.createClientEnrollment(data, params.id, funderId));
         }
      } else {
         setError(
            !inputs.funding
               ? "funding"
               : !inputs.startDate
               ? "startDate"
               : !startDateIsValid
               ? ErrorText.startDateError
               : "Input is not field"
         );
      }
   }

   return (
      <div className={classes.createFoundingSource}>
         <ModalHeader
            handleClose={handleClose}
            title={info ? "Edit an Enrollment" : "Add an Enrollment"}
            text={
               info
                  ? "To edit this enrollment, please modify the below fields."
                  : "To add a new enrollment in the system, please fulfill the below fields."
            }
         />
         <div className={classes.createFoundingSourceBody}>
            <div className={classes.clientModalBlock}>
               <div className={classes.clientModalBox}>
                  <SelectInput
                     language={null}
                     name={"funding"}
                     label={"Funding Source*"}
                     handleSelect={handleChange}
                     value={inputs?.funding}
                     list={fSelect ? fSelect : []}
                     typeError={enrollmentErrorText}
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
                  <div className={classes.curentlyCheckbox}>
                     <Checkbox
                        checked={isPrimaryEnrol}
                        onClick={(e) => setIsPrimaryEnrol(e.target.checked)}
                        color="primary"
                     />
                     <p className={classes.curently}>Set as primary enrollment</p>
                  </div>
               </div>
            </div>
            <div className={classes.clientModalBlock}>
               <CreateChancel
                  loader={!!loader.length}
                  create={info ? "Save" : "Add"}
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
