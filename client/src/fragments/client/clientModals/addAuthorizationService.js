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
   const [error, setError] = useState("");
   const [inputs, setInputs] = useState(
      info ? { ...info, modifiers: info.serviceId.name } : { total: "" }
   );
   const [modCheck, setModCheck] = useState([]);
   const dispatch = useDispatch();
   const fSelect = useSelector((state) => state.fundingSource.fundingSourceServices);
   const classes = createClientStyle();

   useEffect(() => {
      dispatch(fundingSourceActions.getFoundingSourceServiceById(fundingId));
      let funderId;
      fSelect.forEach((item) => {
         if (inputs.modifiers === item.name) {
            funderId = item._id;
         }
      });
   }, []);

   const success = !!info ? FindSuccess("EDIT_CLIENT_AUTHORIZATION_SERV") : FindSuccess("CREATE_CLIENT_AUTHORIZATION_SERV");
   const load = !!info ? FindLoad("EDIT_CLIENT_AUTHORIZATION_SERV") : FindLoad("CREATE_CLIENT_AUTHORIZATION_SERV");

   useEffect(() => {
      if (!!success.length) {
         handleClose();
         dispatch(httpRequestsOnSuccessActions.removeSuccess(success[0].type));
      }
   }, [success]);

   const [modif, setModif] = useState("");
   const [loader, setLoader] = useState(false);

   const handleChange = (e) => {
      if (e.target.name === "modifiers") {
         setLoader(true);
         setModCheck([]);
         let id = fSelect.find((item) => item.name === e.target.value);
         axios
            .post(
               `/authorizationservice/authorization/${authId}/fundingService/${
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
   };

   const handleChangeTotal = (e) => {
      if (e.target.value >= 0 && e.target.value.indexOf(".") === -1) {
         setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
         error === e.target.name && setError(""), error === "notZero" && setError("");
      }
   };

   const handleCreate = () => {
      let modifiersPost = [];
      modCheck.forEach((item) => {
         return modif.forEach((item2, index2) => {
            if (item === index2) {
               modifiersPost.push(item2?._id);
            }
         });
      });
      let funderId;
      fSelect.forEach((item) => {
         if (inputs.modifiers === item.name) {
            funderId = item._id;
         }
      });

      if (inputs.total && inputs.total > 0 && modifiersPost?.length > 0) {
         const data = {
            total: +inputs.total,
            modifiers: modifiersPost,
         };
         if (!!info) {
            dispatch(
               clientActions.editClientsAuthorizationsServ(
                  {
                     total: +inputs.total,
                     fundingServiceId: funderId,
                     authorizationId: authId,
                  },
                  info.id,
                  authId
               )
            );
         } else {
            dispatch(
               clientActions.createClientsAuthorizationsServ(data, authId, funderId)
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
   };

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
                     label={"Service Code*"}
                     handleSelect={handleChange}
                     value={inputs.modifiers}
                     list={fSelect ? fSelect : ""}
                     typeError={error === "modifiers" ? ErrorText.field : ""}
                  />
                  <div
                     style={
                        error === "modifiersPost"
                           ? { border: `1px solid ${Colors.ThemeRed}` }
                           : {}
                     }
                     className={classes.displayCodeBlock2}
                  >
                     <p className={classes.displayCodeBlockText}>Available Modfiers </p>
                     <div className={classes.availableModfiers}>
                        {info ? (
                           info.modifiers &&
                           info.modifiers.length > 0 &&
                           info.modifiers.map((item, index) => {
                              return (
                                 <div
                                    key={index}
                                    className={classes.availableModfier}
                                    style={{
                                       background: "#347AF080",
                                       color: "#fff",
                                       border: "none",
                                       cursor: "default",
                                    }}
                                 >
                                    <p
                                       style={{
                                          width: 19,
                                          height: 20,
                                          overflow: "hidden",
                                       }}
                                    >
                                       {item.name}
                                    </p>
                                 </div>
                              );
                           })
                        ) : modif && modif.length > 0 ? (
                           modif.map((item, index) => {
                              return (
                                 <p
                                    key={index}
                                    className={classes.availableModfier}
                                    onClick={() => onModifier(index)}
                                    style={
                                       modCheck.includes(index)
                                          ? {
                                               background: "#347AF0",
                                               color: "#fff",
                                            }
                                          : {}
                                    }
                                 >
                                    {item.name}
                                 </p>
                              );
                           })
                        ) : loader === true ? (
                           <div style={{ height: "20px" }}>
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
