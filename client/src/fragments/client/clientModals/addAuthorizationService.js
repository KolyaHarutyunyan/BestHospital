import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   ValidationInput,
   SelectInput,
   CreateChancel,
   ModalHeader,
   ErrMessage,
   MinLoader,
} from "@eachbase/components";
import { createClientStyle } from "./styles";
import {
   Colors,
   ErrorText,
   FindError,
   FindLoad,
   FindSuccess,
   hooksForErrors,
   isNotEmpty,
} from "@eachbase/utils";
import {
   clientActions,
   fundingSourceActions,
   httpRequestsOnErrorsActions,
   httpRequestsOnSuccessActions,
} from "@eachbase/store";
import axios from "axios";

export const AddAuthorizationService = ({ handleClose, info, fundingId, authId }) => {
   const classes = createClientStyle();

   const fSelect = useSelector((state) => state.fundingSource.fundingSourceServices);

   const dispatch = useDispatch();

   const [error, setError] = useState("");
   const [inputs, setInputs] = useState(
      info ? { ...info, name: info.serviceId?.name, modifiers: info.serviceId?._id } : {}
   );
   const [modCheck, setModCheck] = useState([]);
   const [modif, setModif] = useState(!!info ? info.authModifiers : []);
   const [checkModifiersLoader, setCheckModifiersLoader] = useState(false);
   const [defaultIsChecked, setDefaultIsChecked] = useState(
      !!info ? info.serviceId?.default : false
   );

   const _defaultIsChosen = info?.default === true;
   const activeModifiers = modif.filter((modifier) => modifier.status === true);

   let modifierExists = false;
   for (let i = 0; i < info?.authModifiers?.length; i++) {
      modifierExists = activeModifiers.includes(info?.authModifiers[i]);
   }

   useEffect(() => {
      dispatch(fundingSourceActions.getFoundingSourceServiceById(fundingId));
   }, []);

   const success = !!info
      ? FindSuccess("EDIT_CLIENT_AUTHORIZATION_SERV")
      : FindSuccess("CREATE_CLIENT_AUTHORIZATION_SERV");
   const loader = !!info
      ? FindLoad("EDIT_CLIENT_AUTHORIZATION_SERV")
      : FindLoad("CREATE_CLIENT_AUTHORIZATION_SERV");
   const backError = !!info
      ? FindError("EDIT_CLIENT_AUTHORIZATION_SERV")
      : FindError("CREATE_CLIENT_AUTHORIZATION_SERV");

   const authServiceDefaultErrorText = hooksForErrors.getAuthServiceDefaultErrorText(
      error,
      backError
   );

   useEffect(
      () => () => {
         if (!!info) {
            dispatch(
               httpRequestsOnErrorsActions.removeError("EDIT_CLIENT_AUTHORIZATION_SERV")
            );
         } else {
            dispatch(
               httpRequestsOnErrorsActions.removeError("CREATE_CLIENT_AUTHORIZATION_SERV")
            );
         }
      },
      []
   );

   useEffect(() => {
      if (!!success.length) {
         handleClose();
         dispatch(httpRequestsOnSuccessActions.removeSuccess(success[0].type));
      }
   }, [success]);

   function handleChange(e) {
      if (e.target.name === "modifiers") {
         if (e.target.value === "") return;
         if (defaultIsChecked) setDefaultIsChecked(false);
         setCheckModifiersLoader(true);
         setModCheck([]);
         const _fundingService = fSelect.find((item) => item.id === e.target.value);
         axios
            .post(
               `/authservice/auth/${authId}/fundingService/${_fundingService?.id}/checkModifiers`,
               null,
               { auth: true }
            )
            .then((res) => {
               setModif(res.data), setCheckModifiersLoader(false);
            })
            .catch(() => {
               setCheckModifiersLoader(false);
            });
      }
      setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
      if (error === e.target.name || (backError && backError.length)) {
         setError("");
      }
      if (backError && backError.length) {
         dispatch(httpRequestsOnErrorsActions.removeError(backError[0].type));
      }
   }

   function handleChangeTotal(e) {
      if (e.target.value >= 0 && e.target.value.indexOf(".") === -1) {
         setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
         if (error === e.target.name || (backError && backError.length)) {
            setError("");
         }
         if (backError && backError.length) {
            dispatch(httpRequestsOnErrorsActions.removeError(backError[0].type));
         }
      }
   }

   function handleChangeDefault() {
      setDefaultIsChecked((prevState) => !prevState);
      if (error === "modifiersPost" || (backError && backError.length)) {
         setError("");
      }
      if (backError && backError.length) {
         dispatch(httpRequestsOnErrorsActions.removeError(backError[0].type));
      }
   }

   function handleCreate() {
      let modifiersPost = [];
      modCheck.forEach((item) => {
         return activeModifiers.forEach((item2, index2) => {
            if (item === index2) {
               modifiersPost.push(item2?._id);
            }
         });
      });
      const modifiersAreValid = defaultIsChecked || !!modifiersPost?.length;
      const authServiceDataIsValid = !!info
         ? isNotEmpty(inputs.total)
         : isNotEmpty(inputs.total) && modifiersAreValid;
      if (authServiceDataIsValid) {
         const createAuthServiceData = {
            total: +inputs.total,
            default: defaultIsChecked,
            modifiers: modifiersPost,
         };
         if (!!info) {
            const editAuthServiceData = {
               ...createAuthServiceData,
               authorizationId: authId,
               fundingServiceId: inputs.modifiers,
            };
            dispatch(
               clientActions.editClientsAuthorizationsServ(
                  editAuthServiceData,
                  info.id,
                  authId
               )
            );
         } else {
            dispatch(
               clientActions.createClientsAuthorizationsServ(
                  createAuthServiceData,
                  authId,
                  inputs.modifiers
               )
            );
         }
      } else {
         const authServiceDataErrorText = !!info
            ? !isNotEmpty(inputs.total)
               ? "total"
               : ""
            : !inputs.modifiers
            ? "modifiers"
            : !modifiersAreValid
            ? "modifiersPost"
            : !isNotEmpty(inputs.total)
            ? "total"
            : "";
         setError(authServiceDataErrorText);
      }
   }

   function onModifier(index) {
      error === "modifiersPost" && setError("");
      let arr = new Set([...modCheck]);
      if (arr.has(index)) {
         arr.delete(index);
      } else {
         arr.add(index);
      }
      let newArr = [];
      arr.forEach((item) => {
         newArr.push(item);
      });
      setModCheck(newArr);
   }

   return (
      <div className={classes.createFoundingSource}>
         <ModalHeader
            handleClose={handleClose}
            title={info ? "Edit Authorization Service" : "Add Authorized Service"}
            text={
               info
                  ? "To edit this authorization service, please modify the below fields."
                  : "To add a new authorization service in the system, please fulfill the below fields."
            }
         />
         <div className={classes.createFoundingSourceBody}>
            <div className={classes.clientModalBlock}>
               <div className={classes.clientModalBox}>
                  <p className={classes.inputInfo}>Service</p>
                  <SelectInput
                     name={"modifiers"}
                     type={"id"}
                     label={"Service Code*"}
                     handleSelect={handleChange}
                     value={inputs.modifiers}
                     list={
                        fSelect
                           ? fSelect.map((item) => ({
                                ...item,
                                name: item.serviceId?.name,
                             }))
                           : []
                     }
                     typeError={error === "modifiers" ? ErrorText.selectField : ""}
                     disabled={!!info}
                  />
                  <div
                     className={`${classes.displayCodeBlock2} ${
                        error === "modifiersPost" || (backError && backError.length)
                           ? "error"
                           : ""
                     }`}
                  >
                     <p className={classes.displayCodeBlockText}>Available Modfiers </p>
                     <div
                        className={`${classes.availableModfiers} ${
                           !inputs.modifiers || checkModifiersLoader === true
                              ? "notApplicable"
                              : ""
                        }`}
                     >
                        {checkModifiersLoader === true ? (
                           <div className={classes.loaderBoxStyle}>
                              <MinLoader margin={"0"} color={Colors.ThemeBlue} />
                           </div>
                        ) : (
                           <div className={classes.serviceModifiersContainerStyle}>
                              {!inputs.modifiers ? (
                                 <div className={classes.notApplicableStyle}>N/A</div>
                              ) : (
                                 <button
                                    className={`${classes.availableModfier} ${
                                       defaultIsChecked
                                          ? "checked"
                                          : _defaultIsChosen
                                          ? "chosen"
                                          : ""
                                    }`}
                                    onClick={handleChangeDefault}
                                    disabled={_defaultIsChosen}
                                 >
                                    {"default"}
                                 </button>
                              )}
                              {activeModifiers && activeModifiers.length
                                 ? activeModifiers.map((item, index) => {
                                      const modifierButnStyle = `${
                                         classes.availableModfier
                                      } ${
                                         modCheck.includes(index)
                                            ? "checked"
                                            : modifierExists
                                            ? "chosen"
                                            : ""
                                      }`;
                                      return (
                                         <button
                                            key={index}
                                            className={modifierButnStyle}
                                            onClick={() => onModifier(index)}
                                            disabled={modifierExists}
                                         >
                                            {item.name}
                                         </button>
                                      );
                                   })
                                 : null}
                           </div>
                        )}
                     </div>
                  </div>
                  <ErrMessage text={authServiceDefaultErrorText} />
                  <p className={classes.inputInfo}>Availability</p>
                  <ValidationInput
                     variant={"outlined"}
                     onChange={handleChangeTotal}
                     value={inputs.total === 0 ? "0" : inputs.total}
                     label={"Total Units*"}
                     name="total"
                     typeError={error === "total" ? ErrorText.field : ""}
                  />
               </div>
            </div>
            <div className={classes.clientModalBlock}>
               <CreateChancel
                  loader={!!loader.length}
                  create={!!info ? "Save" : "Add"}
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
