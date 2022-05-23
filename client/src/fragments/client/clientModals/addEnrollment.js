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
import { ErrorText, FindLoad, FindSuccess } from "@eachbase/utils";
import {
   clientActions,
   httpRequestsOnErrorsActions,
   httpRequestsOnSuccessActions,
} from "@eachbase/store";
import { Checkbox } from "@material-ui/core";

export const AddEnrollment = ({ handleClose, info }) => {
   const [error, setError] = useState("");
   const [inputs, setInputs] = useState(
      info
         ? {
              ...info,
              funding: info.funderId.name,
              startDate: info?.startDate && moment(info?.startDate).format("YYYY-MM-DD"),
              terminationDate:
                 info?.terminationDate &&
                 moment(info?.terminationDate).format("YYYY-MM-DD"),
           }
         : {}
   );

   const [isPrimaryEnrol, setIsPrimaryEnrol] = useState(false);
   const [checked, setChecked] = useState(info ? info.terminationDate === null : true);
   const classes = createClientStyle();
   const params = useParams();
   const dispatch = useDispatch();

   let fSelect = useSelector((state) => state.fundingSource.fSelect.funders);

   const success = info
      ? FindSuccess("EDIT_CLIENT_ENROLLMENT")
      : FindSuccess("CREATE_CLIENT_ENROLLMENT");
   const loader = info
      ? FindLoad("EDIT_CLIENT_ENROLLMENT")
      : FindLoad("CREATE_CLIENT_ENROLLMENT");

   useEffect(() => {
      if (!success) return;
      handleClose();
      dispatch(httpRequestsOnErrorsActions.removeError("GET_CLIENT_ENROLLMENT"));
      if (info) {
         dispatch(httpRequestsOnSuccessActions.removeSuccess("EDIT_CLIENT_ENROLLMENT"));
      } else {
         dispatch(httpRequestsOnSuccessActions.removeSuccess("CREATE_CLIENT_ENROLLMENT"));
      }
   }, [success]);

   const handleChange = (e) => {
      setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
      (error === e.target.name || error === ErrorText.dateError) && setError("");
   };

   const onCheck = (e) => {
      setChecked(e.target.checked);
      // inputs["terminationDate"] = null;
      // (error === "terminationDate" || error === ErrorText.dateError) && setError("");
   };

   const handleCreate = () => {
      const dateComparingIsValid =
         inputs.terminationDate &&
         new Date(inputs.startDate).getTime() <
            new Date(inputs.terminationDate).getTime();

      const enrollmentDataIsValid =
         inputs.funding && inputs.startDate && checked ? "Present" : dateComparingIsValid;

      if (enrollmentDataIsValid) {
         let funderId;
         fSelect.forEach((item) => {
            if (inputs.funding === item.name) {
               funderId = item.id;
            }
         });

         const data = {
            primary: info ? info.primary : true,
            startDate: inputs.startDate,
            terminationDate: inputs.terminationDate ? inputs.terminationDate : null,
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
               : !inputs.terminationDate
               ? "terminationDate"
               : !dateComparingIsValid
               ? ErrorText.dateError
               : "Input is not field"
         );
      }
   };

   return (
      <div className={classes.createFoundingSource}>
         <ModalHeader
            handleClose={handleClose}
            title={info ? "Edit an Enrollment" : "Add an Enrollment"}
            text={
               "To add a new enrollment in the system, please fulfill the below fields."
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
                     typeError={error === "funding" ? ErrorText.field : ""}
                  />
                  <ValidationInput
                     variant={"outlined"}
                     onChange={handleChange}
                     value={inputs.startDate}
                     type={"date"}
                     label={"Start Date*"}
                     name="startDate"
                     typeError={error === "startDate" && ErrorText.field}
                  />
                  <div className={classes.curentlyCheckbox}>
                     <Checkbox
                        checked={isPrimaryEnrol}
                        onClick={() => setIsPrimaryEnrol((prevState) => !prevState)}
                        color="primary"
                     />
                     <p className={classes.curently}>Set as primary enrollment</p>
                  </div>
                  <div className={classes.curentlyCheckbox}>
                     <Checkbox checked={checked} onClick={onCheck} color="primary" />
                     <p className={classes.curently}>Terminate</p>
                  </div>

                  <ValidationInput
                     variant={"outlined"}
                     disabled={checked}
                     onChange={handleChange}
                     value={checked ? "Present" : inputs.terminationDate}
                     type={checked ? "text" : "date"}
                     label={"Terminated Date"}
                     name="terminationDate"
                     typeError={
                        error === "terminationDate"
                           ? ErrorText.field
                           : error === ErrorText.dateError
                           ? ErrorText.dateError
                           : ""
                     }
                  />

                  {/*<ValidationInput*/}
                  {/*    variant={"outlined"}*/}
                  {/*    onChange={handleChange}*/}
                  {/*    value={inputs.terminationDate}*/}
                  {/*    type={"date"}*/}
                  {/*    label={"Terminated Date"}*/}
                  {/*    name='terminationDate'*/}
                  {/*    typeError={error === 'terminationDate' && ErrorText.field}*/}
                  {/*/>*/}
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
