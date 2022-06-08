import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
   ValidationInput,
   SelectInput,
   CreateChancel,
   ModalHeader,
} from "@eachbase/components";
import { foundingSourceModalStyle } from "./styles";
import { ErrorText, FindLoad, FindSuccess, isNotEmpty } from "@eachbase/utils";
import { fundingSourceActions, httpRequestsOnSuccessActions } from "@eachbase/store";

export const FundingSourceServiceAdd = ({ handleClose, info }) => {
   const classes = foundingSourceModalStyle();

   const params = useParams();

   const dispatch = useDispatch();

   const systemServices = useSelector((state) => state.system.services);
   const systemCredentials = useSelector((state) => state.system.credentials);

   const success = FindSuccess("EDIT_FUNDING_SOURCE_SERVICE");
   const successCreate = FindSuccess("CREATE_FUNDING_SOURCE_SERVICE_BY_ID");
   const loader = !!info
      ? FindLoad("EDIT_FUNDING_SOURCE_SERVICE")
      : FindLoad("CREATE_FUNDING_SOURCE_SERVICE_BY_ID");

   useEffect(() => {
      if (!!success.length) {
         handleClose();
         dispatch(
            httpRequestsOnSuccessActions.removeSuccess("EDIT_FUNDING_SOURCE_SERVICE")
         );
      }
   }, [success]);

   useEffect(() => {
      if (!!successCreate.length) {
         handleClose();
         dispatch(
            httpRequestsOnSuccessActions.removeSuccess(
               "CREATE_FUNDING_SOURCE_SERVICE_BY_ID"
            )
         );
      }
   }, [successCreate]);

   const [error, setError] = useState("");
   const [inputs, setInputs] = useState(
      info ? { ...info, name: info.serviceId, credential: info.credentialId?._id } : {}
   );

   const sysServiceItem = systemServices.find((service) => service.id === inputs?.name);

   function handleChange(e) {
      setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
      if (
         error === e.target.name ||
         error === ErrorText.equalityError("Min Unit", "Max Unit")
      ) {
         setError("");
      }
   }

   function handleCreate() {
      const unitsAreValid = inputs.min < inputs.max;
      const serviceDataIsValid =
         isNotEmpty(inputs.name) &&
         isNotEmpty(inputs.cptCode) &&
         isNotEmpty(inputs.size) &&
         isNotEmpty(inputs.min) &&
         isNotEmpty(inputs.max) &&
         unitsAreValid &&
         isNotEmpty(inputs.chargeRate) &&
         isNotEmpty(inputs.credential);
      if (serviceDataIsValid) {
         const data = {
            name: sysServiceItem?.name,
            serviceId: inputs.name,
            rate: 0,
            cptCode: inputs.cptCode,
            size: +inputs.size,
            min: +inputs.min,
            max: +inputs.max,
            chargeRate: +inputs.chargeRate,
            credentialId: inputs.credential,
         };
         if (!!info) {
            dispatch(fundingSourceActions.editFoundingSourceServiceById(info?.id, data));
         } else {
            dispatch(
               fundingSourceActions.createFoundingSourceServiceById(params.id, data)
            );
         }
      } else {
         const serviceDataErrorText = !isNotEmpty(inputs.name)
            ? "name"
            : !isNotEmpty(inputs.cptCode)
            ? "cptCode"
            : !isNotEmpty(inputs.size)
            ? "size"
            : !isNotEmpty(inputs.min)
            ? "min"
            : !isNotEmpty(inputs.max)
            ? "max"
            : !unitsAreValid
            ? ErrorText.equalityError("Min Unit", "Max Unit")
            : !isNotEmpty(inputs.chargeRate)
            ? "chargeRate"
            : !isNotEmpty(inputs.credential)
            ? "credential"
            : "";
         setError(serviceDataErrorText);
      }
   }

   return (
      <div className={classes.createFoundingSource}>
         <ModalHeader
            handleClose={handleClose}
            title={info ? "Edit Service" : "Add a New Service"}
         />
         <div className={classes.createFoundingSourceBody}>
            <p className={classes.fundingSourceModalsTitle}>Service</p>
            <div className={classes.serviceInputsContainerStyle}>
               <div className={classes.leftInputsBoxStyle}>
                  <SelectInput
                     name={"name"}
                     type={"id"}
                     label={"Service*"}
                     handleSelect={handleChange}
                     value={inputs.name}
                     typeError={error === "name" ? ErrorText.selectField : ""}
                     list={systemServices}
                  />
                  <div className={classes.displayCodeBlock}>
                     <p className={classes.displayCodeBlockText}>
                        Display Code:{" "}
                        <span className={classes.displayCode}>
                           {sysServiceItem !== null &&
                           sysServiceItem?.displayCode !== "displayCode" &&
                           inputs?.name !== ""
                              ? sysServiceItem?.displayCode
                              : "N/A"}
                        </span>
                     </p>
                     <p
                        className={classes.displayCodeBlockText}
                        style={{ marginTop: 16 }}
                     >
                        Category:{" "}
                        <span className={classes.displayCode}>
                           {sysServiceItem !== null &&
                           sysServiceItem?.category !== "category" &&
                           inputs?.name !== ""
                              ? sysServiceItem?.category
                              : "N/A"}
                        </span>
                     </p>
                  </div>
                  <ValidationInput
                     onChange={handleChange}
                     value={inputs.cptCode}
                     variant={"outlined"}
                     type={"text"}
                     label={"CPT Code*"}
                     name={"cptCode"}
                     typeError={error === "cptCode" ? ErrorText.field : ""}
                  />
               </div>
               <div className={classes.rightInputsBoxStyle}>
                  <ValidationInput
                     onChange={handleChange}
                     value={inputs.size}
                     variant={"outlined"}
                     type={"number"}
                     label={"Unit Size*"}
                     name={"size"}
                     typeError={error === "size" ? ErrorText.field : ""}
                  />
                  <div className={classes.foundingSourceModalsBodyBlock}>
                     <ValidationInput
                        onChange={handleChange}
                        value={inputs.min}
                        variant={"outlined"}
                        type={"number"}
                        label={"Min Unit*"}
                        name={"min"}
                        typeError={
                           error === "min"
                              ? ErrorText.field
                              : error === ErrorText.equalityError("Min Unit", "Max Unit")
                              ? ErrorText.equalityError("Min Unit", "Max Unit")
                              : ""
                        }
                        styles={{ width: "192px" }}
                     />
                     <ValidationInput
                        onChange={handleChange}
                        value={inputs.max}
                        variant={"outlined"}
                        type={"number"}
                        label={"Max Unit*"}
                        name={"max"}
                        typeError={error === "max" ? ErrorText.field : ""}
                        styles={{ width: "192px", marginLeft: "16px" }}
                     />
                  </div>
                  <ValidationInput
                     onChange={handleChange}
                     value={inputs.chargeRate}
                     variant={"outlined"}
                     type={"number"}
                     label={"Charge Rate*"}
                     name={"chargeRate"}
                     typeError={error === "chargeRate" ? ErrorText.field : ""}
                  />
                  <SelectInput
                     name={"credential"}
                     type={"id"}
                     label={"Select the credential*"}
                     handleSelect={handleChange}
                     value={inputs.credential}
                     typeError={error === "credential" ? ErrorText.selectField : ""}
                     list={systemCredentials}
                  />
               </div>
            </div>
            <div className={classes.foundingSourceModalsBodyBlock}>
               <CreateChancel
                  loader={!!loader.length}
                  create={info ? "Save" : "Add"}
                  chancel={"Cancel"}
                  onCreate={handleCreate}
                  onClose={handleClose}
                  buttonWidth={"400px"}
               />
            </div>
         </div>
      </div>
   );
};
