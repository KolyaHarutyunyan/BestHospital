import React, { useEffect, useState } from "react";
import { modalsStyle } from "@eachbase/components/modal/styles";
import {
   ErrorText,
   FindLoad,
   FindSuccess,
   isNotEmpty,
   useGlobalTextStyles,
} from "@eachbase/utils";
import { CloseButton, CreateChancel } from "@eachbase/components/buttons";
import { SelectInput, ValidationInput } from "@eachbase/components/inputs";
import { httpRequestsOnSuccessActions, systemActions } from "@eachbase/store";
import { useDispatch, useSelector } from "react-redux";

const credentialsList = [{ name: "Degree" }, { name: "Clearance" }, { name: "licence" }];

export const SystemItemAddService = ({ modalInformation, modalType, handleClose }) => {
   const dispatch = useDispatch();
   const [mType] = useState(modalType);
   const [mInformation] = useState(modalInformation);
   const [inputs, setInputs] = useState(mInformation ? mInformation : {});

   const [error, setError] = useState("");

   const classes = modalsStyle();
   const globalText = useGlobalTextStyles();

   const title = (mType) => {
      if (mType === "editService") {
         return "Edit Service Type";
      } else if (mType === "editCredential") {
         return "Edit Credential";
      } else if (mType === "editJobTitles") {
         return "Edit Job Title";
      } else if (mType === "editPlaceTitles") {
         return "Edit Place Of Service";
      }
      return "Edit Department";
   };

   const checkType = (type) => {
      if (type === "Degree") {
         return 0;
      } else if (type === "Clearance") {
         return 1;
      } else if (type === "licence") {
         return 2;
      }
   };

   const handleSubmit = () => {
      let credentialData = {
         name: inputs.credentialName,
         type: checkType(inputs.credentialType),
      };

      let serviceData = {
         name: inputs.name,
         displayCode: inputs.displayCode,
         category: inputs.category,
      };
      let departmentData = {
         name: inputs.departmentName,
      };
      let jobData = {
         name: inputs.jobTitle,
      };
      let placeData = {
         name: inputs.name,
         code: inputs.code,
      };

      switch (mType) {
         case "editService":
            const serviceDataIsValid =
               isNotEmpty(inputs.name) &&
               isNotEmpty(inputs.displayCode) &&
               isNotEmpty(inputs.category);

            if (serviceDataIsValid) {
               dispatch(
                  systemActions.editServiceByIdGlobal(serviceData, mInformation.id)
               );
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
            break;

         case "editCredential":
            const credentialDataIsValid =
               isNotEmpty(inputs.credentialType) && isNotEmpty(inputs.credentialName);

            if (credentialDataIsValid) {
               dispatch(
                  systemActions.editCredentialByIdGlobal(
                     credentialData,
                     mInformation.credentialId
                  )
               );
            } else {
               const credentialDataErrorText = !isNotEmpty(inputs.credentialType)
                  ? "credentialType"
                  : !isNotEmpty(inputs.credentialName)
                  ? "credentialName"
                  : "";

               setError(credentialDataErrorText);
            }
            break;

         case "editJobTitles":
            if (isNotEmpty(inputs.jobTitle)) {
               dispatch(systemActions.editJobByIdGlobal(jobData, mInformation.jobId));
            } else {
               setError(!isNotEmpty(inputs.jobTitle) ? "jobTitle" : "");
            }
            break;

         case "editPlaceTitles":
            if (isNotEmpty(inputs.name) && isNotEmpty(inputs.code)) {
               dispatch(systemActions.editPlaceByIdGlobal(placeData, mInformation.jobId));
            } else {
               setError(
                  !isNotEmpty(inputs.name)
                     ? "name"
                     : !isNotEmpty(inputs.code)
                     ? "code"
                     : ""
               );
            }
            break;

         default:
            if (isNotEmpty(inputs.departmentName)) {
               dispatch(
                  systemActions.editDepartmentByIdGlobal(
                     departmentData,
                     mInformation.departmentID
                  )
               );
            } else {
               setError(!isNotEmpty(inputs.departmentName) ? "departmentName" : "");
            }
      }
   };

   const handleChange = (e) => {
      setInputs((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
      error === e.target.name && setError("");
   };

   const serviceType =
      mType === "editService"
         ? "EDIT_SERVICE_BY_ID_GLOBAL"
         : mType === "editCredential"
         ? "EDIT_CREDENTIAL_BY_ID_GLOBAL"
         : mType === "editJobTitles"
         ? "EDIT_JOB_BY_ID_GLOBAL"
         : mType === "editPlaceTitles"
         ? "EDIT_PLACE_BY_ID_GLOBAL"
         : "EDIT_DEPARTMENT_BY_ID_GLOBAL";

   const success = FindSuccess(serviceType);
   const loader = FindLoad(serviceType);

   useEffect(() => {
      if (!!success.length) {
         handleClose();
         dispatch(httpRequestsOnSuccessActions.removeSuccess(success[0].type));
      }
   }, [success]);

   return (
      <div className={classes.inactiveModalBody}>
         <h1 className={`${globalText.modalTitle} ${classes.modalTitleMargin}`}>
            {title(mType)}
         </h1>
         <div className={classes.positionedButton}>
            <CloseButton handleCLic={handleClose} />
         </div>
         {mType === "editPlaceTitles" ? (
            <>
               <ValidationInput
                  variant={"outlined"}
                  onChange={handleChange}
                  type={"text"}
                  label={"Name*"}
                  name="name"
                  value={inputs.name}
                  typeError={error === "name" && ErrorText.field}
               />
               <ValidationInput
                  variant={"outlined"}
                  onChange={handleChange}
                  type={"number"}
                  label={"Code*"}
                  name="code"
                  value={inputs.code}
                  typeError={error === "code" && ErrorText.field}
               />
            </>
         ) : mType === "editService" ? (
            <>
               <ValidationInput
                  variant={"outlined"}
                  onChange={handleChange}
                  type={"text"}
                  label={"Service Type*"}
                  name="name"
                  value={inputs.name}
                  typeError={error === "name" && ErrorText.field}
               />
               <ValidationInput
                  variant={"outlined"}
                  onChange={handleChange}
                  type={"text"}
                  label={"Display Name*"}
                  name="displayCode"
                  value={inputs.displayCode}
                  typeError={error === "displayCode" && ErrorText.field}
               />
               <ValidationInput
                  variant={"outlined"}
                  onChange={handleChange}
                  type={"text"}
                  label={"Category*"}
                  name="category"
                  value={inputs.category}
                  typeError={error === "category" && ErrorText.field}
               />
            </>
         ) : mType === "editCredential" ? (
            <>
               <ValidationInput
                  variant={"outlined"}
                  onChange={handleChange}
                  type={"text"}
                  label={"Credential Name*"}
                  name="credentialName"
                  value={inputs.credentialName}
                  typeError={error === "credentialName" && ErrorText.field}
               />
               <SelectInput
                  style={classes.credentialInputStyle}
                  name={"credentialType"}
                  placeholder={"Type*"}
                  list={credentialsList}
                  handleSelect={handleChange}
                  value={inputs.credentialType}
                  typeError={error === "credentialType" && ErrorText.field}
               />
            </>
         ) : mType === "editDepartment" ? (
            <ValidationInput
               variant={"outlined"}
               onChange={handleChange}
               type={"text"}
               name="departmentName"
               value={inputs.departmentName}
               typeError={error === "departmentName" && ErrorText.field}
            />
         ) : (
            <ValidationInput
               variant={"outlined"}
               onChange={handleChange}
               type={"text"}
               label={"Job Title*"}
               name="jobTitle"
               value={inputs.jobTitle}
               typeError={error === "jobTitle" && ErrorText.field}
            />
         )}
         <>
            <CreateChancel
               loader={!!loader.length}
               buttonWidth="192px"
               create="Save"
               chancel="Cancel"
               onClose={handleClose}
               onCreate={handleSubmit}
            />
         </>
      </div>
   );
};
