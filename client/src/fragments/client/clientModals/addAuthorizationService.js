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
import { Colors, ErrorText, FindLoad, FindSuccess } from "@eachbase/utils";
import {
   clientActions,
   fundingSourceActions,
   httpRequestsOnSuccessActions,
} from "@eachbase/store";
import axios from "axios";

export const AddAuthorizationService = ({ handleClose, info, fundingId, authId }) => {
   const classes = createClientStyle();

   const fSelect = useSelector((state) => state.fundingSource.fundingSourceServices);

   const dispatch = useDispatch();

   const [error, setError] = useState("");
   const [inputs, setInputs] = useState(
      info ? { ...info, modifiers: info.serviceId._id } : { total: "" }
   );
   const [modCheck, setModCheck] = useState([]);
   const [modif, setModif] = useState(!!info ? info.modifiers : []);
   const [loader, setLoader] = useState(false);

   const activeModifiers = modif.filter((modifier) => modifier.status === true);

   let modifierExists = false;
   for (let i = 0; i < info?.modifiers?.length; i++) {
      modifierExists = activeModifiers.includes(info?.modifiers[i]);
   }

   useEffect(() => {
      dispatch(fundingSourceActions.getFoundingSourceServiceById(fundingId));
      let funderId = "";
      fSelect.forEach((item) => {
         if (inputs.modifiers === item._id) {
            funderId = item._id;
         }
      });
   }, []);

   const success = !!info
      ? FindSuccess("EDIT_CLIENT_AUTHORIZATION_SERV")
      : FindSuccess("CREATE_CLIENT_AUTHORIZATION_SERV");
   const load = !!info
      ? FindLoad("EDIT_CLIENT_AUTHORIZATION_SERV")
      : FindLoad("CREATE_CLIENT_AUTHORIZATION_SERV");

   useEffect(() => {
      if (!!success.length) {
         handleClose();
         dispatch(httpRequestsOnSuccessActions.removeSuccess(success[0].type));
      }
   }, [success]);

   function handleChange(e) {
      if (e.target.name === "modifiers") {
         setLoader(true);
         setModCheck([]);
         let id = fSelect.find((item) => item._id === e.target.value);
         axios
            .post(
               `/authservice/auth/${authId}/fundingService/${
                  id && id._id
               }/checkModifiers`,
               null,
               { auth: true }
            )
            .then((res) => {
               setModif(res.data), setLoader(false);
            })
            .catch(() => {
               setLoader(false);
            });
      }
      setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
      error === e.target.name && setError(""), error === "notZero" && setError("");
   }

   function handleChangeTotal(e) {
      if (e.target.value >= 0 && e.target.value.indexOf(".") === -1) {
         setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
         error === e.target.name && setError(""), error === "notZero" && setError("");
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
      let funderId;
      fSelect.forEach((item) => {
         if (inputs.modifiers === item._id) {
            funderId = item._id;
         }
      });
      if (inputs.total && inputs.total > 0 && modifiersPost?.length > 0) {
         const createAuthServiceData = {
            total: +inputs.total,
            modifiers: modifiersPost,
         };
         if (!!info) {
            const editAuthServiceData = {
               ...createAuthServiceData,
               authorizationId: authId,
               fundingServiceId: funderId,
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
                  funderId
               )
            );
         }
      } else {
         setError(
            !inputs.modifiers
               ? "modifiers"
               : !modifiersPost.length
               ? "modifiersPost"
               : !inputs.total
               ? "total"
               : inputs.total <= 0
               ? "notZero"
               : "Input is not field"
         );
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
               "To add a new authorization service in the system, please fulfill the below fields."
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
                     list={fSelect ? fSelect : []}
                     typeError={error === "modifiers" ? ErrorText.selectField : ""}
                  />
                  <div
                     className={`${classes.displayCodeBlock2} ${
                        error === "modifiersPost" ? "error" : ""
                     }`}
                  >
                     <p className={classes.displayCodeBlockText}>Available Modfiers </p>
                     <div className={classes.availableModfiers}>
                        {activeModifiers && activeModifiers.length > 0 ? (
                           activeModifiers.map((item, index) => {
                              const modifierCardStyle = `${classes.availableModfier} ${
                                 modCheck.includes(index)
                                    ? "checked"
                                    : modifierExists
                                    ? "chosen"
                                    : ""
                              }`;
                              function handleModifierCheckup() {
                                 if (modifierExists) return;
                                 onModifier(index);
                              }
                              return (
                                 <p
                                    key={index}
                                    className={modifierCardStyle}
                                    onClick={handleModifierCheckup}
                                 >
                                    {item.name}
                                 </p>
                              );
                           })
                        ) : loader === true ? (
                           <div className={classes.loaderBoxStyle}>
                              <MinLoader margin={"0"} color={Colors.ThemeBlue} />
                           </div>
                        ) : (
                           <p>N/A</p>
                        )}
                     </div>
                  </div>
                  {error === "modifiersPost" && (
                     <ErrMessage text={"Please select some modifier"} />
                  )}
                  <p className={classes.inputInfo}>Availability</p>
                  <ValidationInput
                     variant={"outlined"}
                     onChange={handleChangeTotal}
                     value={inputs.total === 0 ? "0" : inputs.total}
                     label={"Total Units*"}
                     name="total"
                     typeError={
                        error === "total"
                           ? ErrorText.field
                           : error === "notZero"
                           ? "Total Units must be greater than 0"
                           : ""
                     }
                  />
               </div>
            </div>
            <div className={classes.clientModalBlock}>
               <CreateChancel
                  loader={!!load.length}
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
