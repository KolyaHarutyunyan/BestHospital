import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
   ValidationInput,
   SelectInput,
   CreateChancel,
   ModalHeader,
   AddressInput,
} from "@eachbase/components";
import { createClientStyle } from "./styles";
import { ErrorText, FindLoad, FindSuccess, isNotEmpty } from "@eachbase/utils";
import {
   clientActions,
   fundingSourceActions,
   httpRequestsOnErrorsActions,
   httpRequestsOnSuccessActions,
} from "@eachbase/store";
import moment from "moment";

export const AddAuthorization = ({ handleClose, info }) => {
   const [error, setError] = useState("");
   const [inputs, setInputs] = useState(
      info
         ? { ...info, funding: info?.funderId?.name, status: String(info.status) }
         : {
              authId: "",
              startDate: "",
              endDate: "",
              status: "",
           }
   );
   const params = useParams();
   const dispatch = useDispatch();
   // const fSelect = useSelector(state => state?.fundingSource?.fSelect?.funders)
   const enrolment = useSelector((state) => state.client.clientEnrollment);

   let enrolments = useSelector((state) => state?.client?.clientEnrollment).filter(
      (item) => item.funderId
   );

   let fSelect = useSelector((state) => state.fundingSource.fSelect.funders);

   const classes = createClientStyle();
   const [fullAddress, setFullAddress] = useState(info  ? info.location : "");

   const [enteredAddress, setEnteredAddress] = useState(info?.location ? info.location : "");

   const success = info
      ? FindSuccess("EDIT_CLIENT_AUTHORIZATION")
      : FindSuccess("CREATE_CLIENT_AUTHORIZATION");
   const loader = info
      ? FindLoad("EDIT_CLIENT_AUTHORIZATION")
      : FindLoad("CREATE_CLIENT_AUTHORIZATION");

   useEffect(() => {
      if (!success) return;
      handleClose();
      dispatch(httpRequestsOnErrorsActions.removeError("GET_CLIENT_AUTHORIZATION"));
      if (info) {
         dispatch(httpRequestsOnSuccessActions.removeSuccess("EDIT_CLIENT_AUTHORIZATION"));
      } else {
         dispatch(httpRequestsOnSuccessActions.removeSuccess("CREATE_CLIENT_AUTHORIZATION"));
      }
   }, [success]);

   useEffect(() => {
      dispatch(fundingSourceActions.getFundingSource());
   }, []);

   const handleChange = (e) => {
      setInputs((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value === 0 ? "0" : e.target.value,
      }));
      (error === e.target.name || error === ErrorText.dateError) && setError("");
   };

   const handleAddressChange = (selectedAddress) => {
      setEnteredAddress(selectedAddress);
      error === "enteredAddress" && setError("");
   };



   const handleCreate = () => {
      const dateComparingIsValid =
         inputs.startDate &&
         inputs.endDate &&
         new Date(inputs.startDate).getTime() < new Date(inputs.endDate).getTime();


      const authorizationDataIsValid =
         inputs.authId &&
         inputs.funding &&
         dateComparingIsValid &&
         inputs.status &&
         enteredAddress
      ;
      if (authorizationDataIsValid) {
         let funderId;
         enrolments.forEach((item) => {
            if (inputs.funding === item.name) {
               funderId = item._id;
            }
         });
         let id = fSelect.filter((i) => i.name === inputs.funding);

         const data = {
            authId: inputs.authId,
            startDate: inputs.startDate,
            endDate: inputs.endDate,
            location: fullAddress,
            status: +inputs.status,
         };
         if (info) {
            dispatch(clientActions.editClientsAuthorizations(data, info.id, params.id));
         } else {
            dispatch(clientActions.createClientsAuthorizations(data, params.id, id[0].id));
         }
      } else {
         setError(
            !inputs.authId
               ? "authId"
               : !inputs.funding
               ? "funding"
               : !inputs.startDate
               ? "startDate"
               : !inputs.endDate
               ? "endDate"
               : !dateComparingIsValid
               ? ErrorText.dateError
               : !inputs.status
               ? "status"
               : !enteredAddress
               ? "enteredAddress"
               : "Input is not field"
         );
      }
   };

   const list = [
      { name: "0", id: 0, code: 0 },
      { name: 1, id: 1, code: 1 },
   ];



   return (
      <div className={classes.createFoundingSource}>
         <ModalHeader
            handleClose={handleClose}
            title={info ? "Edit Authorization" : "Add Authorization"}
            text={"Please fulfill the below fields to add an authorization."}
         />
         <div className={classes.createFoundingSourceBody}>
            <div className={classes.clientModalBlock}>
               <div className={classes.clientModalBox}>
                  <ValidationInput
                     variant={"outlined"}
                     onChange={handleChange}
                     value={inputs.authId}
                     type={"text"}
                     label={"Auth#*"}
                     name="authId"
                     typeError={error === "authId" ? ErrorText.field : ""}
                  />
                  <SelectInput
                     language={null}
                     name={"funding"}
                     label={"Funding Source*"}
                     handleSelect={handleChange}
                     value={inputs.funding}
                     list={fSelect ? fSelect : []}
                     typeError={error === "funding" ? ErrorText.field : ""}
                  />
                  <div style={{ display: "flex" }}>
                     <ValidationInput
                        variant={"outlined"}
                        onChange={handleChange}
                        value={
                           inputs.startDate
                               ? moment(inputs.startDate).format("YYYY-MM-DD")
                               : inputs.startDate
                        }
                        type={"date"}
                        label={"Start Date*"}
                        name="startDate"
                        typeError={error === "startDate" ? ErrorText.field : ""}
                     />
                     <div style={{ width: 16 }} />
                     <ValidationInput
                        variant={"outlined"}
                        onChange={handleChange}
                        value={
                           inputs.endDate
                               ? moment(inputs.endDate).format("YYYY-MM-DD")
                               : inputs.endDate
                        }
                        type={"date"}
                        label={"End Date*"}
                        name="endDate"
                        typeError={
                           error === "endDate"
                              ? ErrorText.field
                              : error === ErrorText.dateError
                              ? ErrorText.dateError
                              : ""
                        }
                     />
                  </div>
                  <SelectInput
                     type={"status"}
                     name={"status"}
                     label={"Status*"}
                     handleSelect={handleChange}
                     value={String(inputs.status)}
                     list={list}
                     typeError={error === "status" ? ErrorText.field : ""}
                  />
                  <AddressInput
                     name={"location"}
                     auth={true}
                     oneInput={true}
                     flex={true}
                     handleSelectValue={handleAddressChange}
                     onTrigger={setFullAddress}
                     info={info ? info : ""}
                     errorBoolean={error === "enteredAddress" ? ErrorText.field : ""}
                  />
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
