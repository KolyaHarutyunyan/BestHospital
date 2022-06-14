import React, { useEffect, useState } from "react";
import {
   AddModalButton,
   CheckboxesTags,
   CloseButton,
   UserTextArea,
   ValidationInput,
} from "@eachbase/components";
import { managementFragments } from "./style";
import {
   ErrorText,
   FindError,
   FindLoad,
   FindSuccess,
   getValTillTenDig,
   globalModals,
   hooksForErrors,
   isNotEmpty,
   useGlobalTextStyles,
} from "@eachbase/utils";
import { useDispatch } from "react-redux";
import {
   httpRequestsOnErrorsActions,
   httpRequestsOnSuccessActions,
   roleActions,
} from "@eachbase/store";

export const AddRoleModal = ({ handleClose, permissionsList }) => {
   const classes = managementFragments();
   const globalModalsClasses = globalModals();
   const globalText = useGlobalTextStyles();

   const dispatch = useDispatch();

   const [error, setError] = useState("");
   const [roleName, setRoleName] = useState("");
   const [permissions, setPermissions] = useState("");
   const [description, setDescription] = useState("");

   const success = FindSuccess("CREATE_ROLE");
   const loader = FindLoad("CREATE_ROLE");
   const backError = FindError("CREATE_ROLE");

   const roleNameErrorText = hooksForErrors.getRoleNameErrorText(error, backError);

   useEffect(() => {
      if (!!success.length) {
         handleClose();
         dispatch(httpRequestsOnSuccessActions.removeSuccess("CREATE_ROLE"));
      }
   }, [success]);

   useEffect(() => {
      return () => {
         dispatch(httpRequestsOnErrorsActions.removeError("CREATE_ROLE"));
      };
   }, []);

   function handleChange(ev) {
      setRoleName(ev.target.value);
      if (error === "role" || (backError && backError.length)) setError("");
      if (backError && backError.length) {
         dispatch(httpRequestsOnErrorsActions.removeError(backError[0].type));
      }
   }

   function changePermissions(ev) {
      setPermissions(ev);
      if (error === "permissions" || (backError && backError.length)) setError("");
      if (backError && backError.length) {
         dispatch(httpRequestsOnErrorsActions.removeError(backError[0].type));
      }
   }

   function changeDescription(ev) {
      setDescription(getValTillTenDig(ev.target.value, 100));
      if (error === "description" || (backError && backError.length)) setError("");
      if (backError && backError.length) {
         dispatch(httpRequestsOnErrorsActions.removeError(backError[0].type));
      }
   }

   function addRole() {
      const permissionsList = [];
      for (let i of permissions) {
         permissionsList.push(i.id);
      }
      const roleDataIsValid =
         isNotEmpty(roleName) && !!permissions && isNotEmpty(description);
      if (roleDataIsValid) {
         const body = {
            title: roleName,
            description: description,
            permissions: permissionsList,
         };
         dispatch(roleActions.createRole(body));
      } else {
         const errorText = !isNotEmpty(roleName)
            ? "role"
            : !permissions
            ? "permissions"
            : !isNotEmpty(description)
            ? "description"
            : "";
         setError(errorText);
      }
   }

   return (
      <div className={globalModalsClasses.smallModalWrapper}>
         <div className={globalModalsClasses.smallModalClose}>
            <CloseButton handleCLic={handleClose} isInModal />
         </div>
         <div className={globalModalsClasses.modalWrapperContent}>
            <p className={globalText.modalTitle}>Want to Add Role?</p>
            <p className={globalText.modalText}>
               To add new role in the system, please set the name and assign permissions
               to that role.
            </p>
            <div style={{ marginBottom: "8px" }}>
               <ValidationInput
                  onChange={handleChange}
                  typeError={roleNameErrorText}
                  style={classes.input}
                  value={roleName}
                  variant={"outlined"}
                  name={"outlined"}
                  label={"Set Role Name*"}
                  type={"text"}
               />
            </div>
            <CheckboxesTags
               typeError={error === "permissions" ? ErrorText.selectField : ""}
               handleChange={changePermissions}
               permissionsList={permissionsList}
               label={"Select Permissions*"}
               placeholder={"Permissions"}
            />
            <UserTextArea
               id={"roleDescription"}
               name={"description"}
               label={"Role Description*"}
               value={description}
               onChange={changeDescription}
               typeError={error === "description" ? ErrorText.field : ""}
               hasText={!!description}
               maxCharsLabel={"Max 100 characters"}
            />
            <AddModalButton
               loader={!!loader.length}
               styles={{ marginTop: "16px" }}
               handleClick={addRole}
               text={"Add"}
            />
         </div>
      </div>
   );
};
