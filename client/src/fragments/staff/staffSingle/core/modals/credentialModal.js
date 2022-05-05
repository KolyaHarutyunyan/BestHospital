import React, { useState, useEffect } from "react";
import { modalsStyle } from "@eachbase/components/modal/styles";
import { ErrorText, FindLoad, FindSuccess, useGlobalTextStyles } from "@eachbase/utils";
import { AddModalButton, CloseButton, CreateChancel } from "@eachbase/components/buttons";
import {
   SelectInput,
   RadioButton,
   ValidationInput,
   SelectInputPlaceholder,
} from "@eachbase/components";
import { useDispatch } from "react-redux";
import { adminActions } from "@eachbase/store";
import { useParams } from "react-router-dom";
import moment from "moment";

const radioData = [
   {
      label: "Non-Expiring",
      value: "nonExpiring",
   },
   {
      label: "Expiring",
      value: "expiring",
   },
];

const checkboxStyle = {
   display: "flex",
   alignItems: "center",
   flexDirection: "row",
};

export const CredentialModal = ({
   globalCredentialInformation,
   globalCredentials,
   credModalType,
   handleClose,
}) => {
   const dispatch = useDispatch();
   const params = useParams();

   const classes = modalsStyle();
   const globalText = useGlobalTextStyles();

   const [mType, setMType] = useState(credModalType);
   const [checkboxValue, setCheckboxValue] = useState("nonExpiring");

   const [error, setError] = useState("");
   const [inputs, setInputs] = useState(
      globalCredentialInformation ? globalCredentialInformation : { expirationDate: "" }
   );

   const [globalCredId, setGlobalCredId] = useState("");

   const change = (event) => {
      setCheckboxValue(event.target.value);
   };

   const title = (type) => {
      if (type === "addCredential") {
         return "Add a New Credential";
      } else if (type === "editCredential") {
         return "Edit Credential";
      }
      return "HB (License)";
   };

   const getGlobalCredentialID = (name) => {
      for (let i = 0; i < globalCredentials.length; i++) {
         if (globalCredentials[i].name === name) {
            return globalCredentials[i]._id;
         }
      }
   };

   useEffect(() => {
      setGlobalCredId(getGlobalCredentialID(inputs.type));
   }, [inputs.type]);

   const handleSubmit = () => {
      let data, editData;
      data = {
         staffId: params.id,
         credentialId: globalCredId,
         expirationDate: inputs.expirationDate
            ? new Date(inputs.expirationDate).toISOString()
            : null,
         receiveData: new Date().toISOString(),
      };
      editData = {
         credentialId: globalCredId ? globalCredId : globalCredentialInformation?.credId,
         expirationDate:
            inputs.expirationDate && checkboxValue === "expiring"
               ? new Date(inputs.expirationDate).toISOString()
               : null,
         receiveData: "",
      };

      const credentialDataIsValid =
         !!inputs.type && (checkboxValue === "expiring" ? !!inputs.expirationDate : true);

      const errorText = !inputs.type
         ? "type"
         : !inputs.expirationDate
         ? "expirationDate"
         : "";

      switch (mType) {
         case "addCredential":
            if (credentialDataIsValid) {
               dispatch(adminActions.createCredential(data));
            } else {
               setError(errorText);
            }
            break;
         case "editCredential":
            if (credentialDataIsValid) {
               dispatch(
                  adminActions.editCredentialById(
                     editData,
                     globalCredentialInformation?.id,
                     params.id
                  )
               );
            } else {
               setError(errorText);
            }
            break;
         case "credentialPreview":
            setMType("editCredential");
            break;
         default:
      }
   };

   const loader = FindLoad("CREATE_CREDENTIAL");
   const loaderEdit = FindLoad("EDIT_CREDENTIAL_BY_ID");
   const success = FindSuccess("CREATE_CREDENTIAL");
   const edit = FindSuccess("EDIT_CREDENTIAL_BY_ID");

   const handleChange = (e) => {
      setInputs((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
      error === e.target.name && setError("");
   };

   useEffect(() => {
      if (success) {
         handleClose();
      }
   }, [success.length]);

   useEffect(() => {
      if (edit) {
         handleClose() && handleClose();
      }
   }, [edit.length]);

   useEffect(() => {
      if (globalCredentialInformation?.expirationDate) {
         setCheckboxValue("expiring");
      } else {
         setCheckboxValue("nonExpiring");
      }
   }, [globalCredentialInformation]);

   return (
      <div className={classes.inactiveModalBody}>
         <h1 className={`${globalText.modalTitle}`}>{title(mType)}</h1>
         <div className={classes.positionedButton}>
            <CloseButton handleCLic={handleClose} />
         </div>
         <p className={classes.inactiveModalInfo}>
            {" "}
            {mType === "addCredential" &&
               "Please fulfill the below fields to add a system."}
         </p>
         {mType === "credentialPreview" ? (
            <SelectInput
               style={classes.credentialInputStyle}
               name={"type"}
               placeholder={"Select Type*"}
               list={globalCredentials}
               value={inputs.type}
               disabled={true}
            />
         ) : mType === "editCredential" ? (
            <SelectInput
               style={classes.credentialInputStyle}
               name={"type"}
               placeholder={"Select Credential*"}
               list={globalCredentials}
               value={inputs.type}
               handleSelect={handleChange}
               typeError={error === "type" && ErrorText.field}
            />
         ) : (
            <SelectInputPlaceholder
               style={classes.credentialInputStyle}
               name={"type"}
               placeholder={"Select Credential*"}
               list={globalCredentials}
               value={inputs.type}
               handleSelect={handleChange}
               typeError={error === "type" && ErrorText.field}
            />
         )}

         <p className={classes.title}>Expiration</p>
         <div className={classes.checkboxWrapper}>
            <RadioButton
               styles={checkboxStyle}
               value={checkboxValue}
               onChange={change}
               radioData={radioData}
            />
            {checkboxValue !== "nonExpiring" && (
               <ValidationInput
                  style={classes.datePickerStyle}
                  variant={"outlined"}
                  value={
                     inputs.expirationDate &&
                     moment(inputs.expirationDate).format().substring(0, 10)
                  }
                  type={"date"}
                  name="expirationDate"
                  onChange={handleChange}
                  typeError={error === "expirationDate" && ErrorText.field}
               />
            )}
         </div>
         {mType === "credentialPreview" ? (
            <AddModalButton
               loader={!!loader.length}
               text="Edit"
               handleClick={handleSubmit}
            />
         ) : (
            <CreateChancel
               loader={!!loaderEdit.length || !!loader.length}
               buttonWidth="192px"
               create={mType === "addCredential" ? "Add" : "Save"}
               chancel="Cancel"
               onClose={handleClose}
               onCreate={handleSubmit}
            />
         )}
      </div>
   );
};
