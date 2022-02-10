import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { ValidationInput, SelectInput, CreateChancel, ModalHeader } from "@eachbase/components";
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
                 info?.terminationDate && moment(info?.terminationDate).format("YYYY-MM-DD"),
           }
         : {
              funding: "",
              startDate: "",
              terminationDate: "",
           }
   );
   const [checked, setChecked] = useState(info ? !info.terminationDate : true);
   const classes = createClientStyle();
   const params = useParams();
   const dispatch = useDispatch();

   let fSelect = useSelector((state) => state.fundingSource.fSelect.funders);

   const success = info
      ? FindSuccess("EDIT_CLIENT_ENROLLMENT")
      : FindSuccess("CREATE_CLIENT_ENROLLMENT");
   const loader = info ? FindLoad("EDIT_CLIENT_ENROLLMENT") : FindLoad("CREATE_CLIENT_ENROLLMENT");

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

   const handleChange = (e) =>
      setInputs(
         (prevState) => ({ ...prevState, [e.target.name]: e.target.value }),
         error === e.target.name && setError("")
      );

   const handleCreate = () => {
      if (inputs.funding && inputs.startDate && checked ? "Present" : inputs.terminationDate) {
         let funderId;
         fSelect.forEach((item) => {
            if (inputs.funding === item.name) {
               funderId = item.id;
            }
         });
         console.log(inputs.funding,'inputsinputsinputs');
         const data = {
            primary: info ? info.primary : true,
            startDate: inputs.startDate,
            terminationDate: checked
               ? null
               : inputs.terminationDate
               ? inputs.terminationDate
               : null,
         };

         console.log(funderId,'datadatadata');
         if (info) {
            dispatch(clientActions.editClientEnrollment(data, params.id, funderId, info.id));
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
               : "Input is not field"
         );
      }
   };

   let onCheck = (e) => {
      setChecked(e.target.checked);
      error === "terminationDate" && setError("");
   };

   return (
      <div className={classes.createFoundingSource}>
         <ModalHeader
            handleClose={handleClose}
            title={info ? "Edit an Enrollment" : "Add an Enrollment"}
            text={"To add a new enrollment in the system, please fulfill the below fields."}
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
                     <Checkbox checked={checked} onClick={onCheck} color="primary" />
                     <p className={classes.curently}>Currently works in this role</p>
                  </div>

                  <ValidationInput
                     variant={"outlined"}
                     disabled={checked}
                     onChange={handleChange}
                     value={checked ? "Present" : inputs.terminationDate}
                     type={checked ? "text" : "date"}
                     label={"Terminated Date"}
                     name="terminationDate"
                     typeError={error === "terminationDate" && ErrorText.field}
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
