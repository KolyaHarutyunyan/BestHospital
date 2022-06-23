import React, { useEffect, useState } from "react";
import { systemCoreCommonStyle } from "./style";
import { AddButton, CreateChancel, ValidationInput } from "@eachbase/components";
import { ErrorText, FindLoad, FindSuccess, isNotEmpty } from "@eachbase/utils";
import { useDispatch } from "react-redux";
import { httpRequestsOnSuccessActions, systemActions } from "@eachbase/store";

const credentialBtn = {
   maxWidth: "174px",
   width: "100%",
   flex: "0 0 174px",
   padding: 0,
};

export const CreateEditServiceType = ({ info, handleClose }) => {
   const classes = systemCoreCommonStyle();

   const dispatch = useDispatch();

   const loader = !!info
      ? FindLoad("EDIT_SERVICE_BY_ID_GLOBAL")
      : FindLoad("CREATE_SERVICE_GLOBAL");
   const success = !!info
      ? FindSuccess("EDIT_SERVICE_BY_ID_GLOBAL")
      : FindSuccess("CREATE_SERVICE_GLOBAL");

   useEffect(() => {
      if (!!success.length) {
         if (!!info) {
            handleClose();
            dispatch(
               httpRequestsOnSuccessActions.removeSuccess("EDIT_SERVICE_BY_ID_GLOBAL")
            );
         } else {
            setInputs({});
            dispatch(httpRequestsOnSuccessActions.removeSuccess("CREATE_SERVICE_GLOBAL"));
         }
      }
   }, [success]);

   const [inputs, setInputs] = useState(!!info ? { ...info } : {});
   const [error, setError] = useState("");

   function handleChange(e) {
      setInputs((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
      error === e.target.name && setError("");
   }

   function handleSubmit() {
      const serviceDataIsValid =
         isNotEmpty(inputs.name) &&
         isNotEmpty(inputs.displayCode) &&
         isNotEmpty(inputs.category);
      if (serviceDataIsValid) {
         const serviceData = {
            name: inputs.name,
            displayCode: inputs.displayCode,
            category: inputs.category,
         };
         if (!!info) {
            dispatch(systemActions.editServiceByIdGlobal(serviceData, info.id));
         }
         dispatch(systemActions.createServiceGlobal(serviceData));
      } else {
         const serviceDataErrorText = !isNotEmpty(inputs.name)
            ? "name"
            : !isNotEmpty(inputs.displayCode)
            ? "displayCode"
            : !isNotEmpty(inputs.category)
            ? "category"
            : "";
         setError(serviceDataErrorText);
      }
   }

   return (
      <div style={!info ? { display: "flex", alignItems: "flex-start" } : {}}>
         <ValidationInput
            style={`${classes.systemInputStyles} ${!info ? "create" : ""}`}
            onChange={handleChange}
            value={inputs.name}
            variant={"outlined"}
            name={"name"}
            type={"text"}
            label={!!info && "Service Name*"}
            placeholder={"Service Name*"}
            typeError={error === "name" ? ErrorText.field : ""}
         />
         <ValidationInput
            style={`${classes.systemInputStyles} ${!info ? "create" : ""}`}
            onChange={handleChange}
            value={inputs.displayCode}
            variant={"outlined"}
            name={"displayCode"}
            type={"text"}
            label={!!info && "Display Code*"}
            placeholder={"Display Code*"}
            typeError={error === "displayCode" ? ErrorText.field : ""}
         />
         <ValidationInput
            style={`${classes.systemInputStyles} ${!info ? "create" : ""}`}
            onChange={handleChange}
            value={inputs.category}
            variant={"outlined"}
            name={"category"}
            type={"text"}
            label={!!info && "Category*"}
            placeholder={"Category*"}
            typeError={error === "category" ? ErrorText.field : ""}
         />
         {!!info ? (
            <CreateChancel
               loader={!!loader.length}
               create={"Save"}
               chancel={"Cancel"}
               onCreate={handleSubmit}
               onClose={handleClose}
               buttonWidth="192px"
               createButnMargin={"16px"}
            />
         ) : (
            <AddButton
               loader={!!loader.length}
               type={"CREATE_SERVICE_GLOBAL"}
               styles={credentialBtn}
               handleClick={handleSubmit}
               text="Add Service Type"
            />
         )}
      </div>
   );
};
