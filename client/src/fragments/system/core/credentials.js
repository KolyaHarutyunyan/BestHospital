import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AddButton, NoItemText, ValidationInput } from "@eachbase/components";
import { systemItemStyles } from "./styles";
import {
   ErrorText,
   FindLoad,
   FindSuccess,
   Images,
   isNotEmpty,
   makeCapitalize,
} from "@eachbase/utils";
import { SelectInputPlaceholder } from "@eachbase/components";
import { httpRequestsOnSuccessActions, systemActions } from "@eachbase/store";
import { checkType, convertType, credentialBtn, credentialsList } from "../constants";

export const Credentials = ({ removeItem, openModal, globalCredentials }) => {
   const classes = systemItemStyles();

   const dispatch = useDispatch();

   const [inputs, setInputs] = useState({});
   const [error, setError] = useState("");

   function editCredential(modalType, modalId) {
      openModal(modalType, modalId);
   }

   function handleChange(e) {
      setInputs((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
      error === e.target.name && setError("");
   }

   function handleSubmit() {
      const dataIsValid = isNotEmpty(inputs.name) && isNotEmpty(inputs.type);
      if (dataIsValid) {
         const data = {
            name: inputs.name,
            type: checkType(inputs.type),
         };
         dispatch(systemActions.createCredentialGlobal(data));
      } else {
         const dataErrorText = !isNotEmpty(inputs.name)
            ? "name"
            : !isNotEmpty(inputs.type)
            ? "type"
            : "";
         setError(dataErrorText);
      }
   }

   const loader = FindLoad("CREATE_CREDENTIAL_GLOBAL");
   const success = FindSuccess("CREATE_CREDENTIAL_GLOBAL");

   useEffect(() => {
      if (!!success.length) {
         setInputs({});
         dispatch(httpRequestsOnSuccessActions.removeSuccess("CREATE_CREDENTIAL_GLOBAL"));
      }
   }, [success]);

   return (
      <Fragment>
         <div className={`${classes.flexContainer} ${classes.headerSize}`}>
            <ValidationInput
               style={classes.credentialInputStyle}
               onChange={handleChange}
               value={inputs.name}
               variant={"outlined"}
               name={"name"}
               type={"text"}
               placeholder={"Name*"}
               typeError={error === "name" ? ErrorText.field : ""}
            />
            <SelectInputPlaceholder
               placeholder="Type*"
               status="CREATE_CREDENTIAL_GLOBAL"
               style={classes.credentialInputStyle}
               name={"type"}
               handleSelect={handleChange}
               value={inputs.type}
               list={credentialsList}
               typeError={error === "type" ? ErrorText.selectField : ""}
            />
            <AddButton
               loader={!!loader.length}
               type={"CREATE_CREDENTIAL_GLOBAL"}
               styles={credentialBtn}
               handleClick={handleSubmit}
               text="Add Credential"
            />
         </div>
         <p className={classes.title}>Credentials</p>
         <div className={classes.credentialTable}>
            {globalCredentials && globalCredentials.length ? (
               globalCredentials.map((credentialItem, index) => {
                  return (
                     <div className={classes.item} key={index}>
                        <p className={classes.credentialNameTypeStyle}>
                           <em>{makeCapitalize(credentialItem.name)}</em>
                           {" - "}
                           {convertType(credentialItem.type)}
                        </p>
                        <div className={classes.icons}>
                           <img
                              src={Images.edit}
                              onClick={() =>
                                 editCredential("editCredential", {
                                    credentialId: credentialItem._id,
                                    credentialName: credentialItem.name,
                                    credentialType: convertType(credentialItem.type),
                                 })
                              }
                              alt="edit"
                           />
                           {/* <img
                              src={Images.remove}
                              alt="delete"
                              onClick={() =>
                                 removeItem({
                                    id: credentialItem._id,
                                    name: credentialItem.name,
                                    type: "editCredential",
                                 })
                              }
                           /> */}
                        </div>
                     </div>
                  );
               })
            ) : (
               <NoItemText text="No Credentials Yet" />
            )}
         </div>
      </Fragment>
   );
};
