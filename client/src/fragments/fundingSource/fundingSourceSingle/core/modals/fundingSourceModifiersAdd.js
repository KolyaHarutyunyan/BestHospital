import React, { useEffect, useState } from "react";
import {
   ValidationInput,
   SelectInput,
   CreateChancel,
   ModalHeader,
} from "@eachbase/components";
import { foundingSourceModalStyle } from "./styles";
import { ErrorText, FindLoad, FindSuccess, isNotEmpty } from "@eachbase/utils";
import { useDispatch } from "react-redux";
import { fundingSourceActions, httpRequestsOnSuccessActions } from "@eachbase/store";
import { useParams } from "react-router";
import { getModifierTypes } from "../constants";

export const FundingSourceModifiersAdd = ({
   info,
   credentials = [],
   handleClose,
   currentService,
}) => {
   const classes = foundingSourceModalStyle();

   const params = useParams();

   const dispatch = useDispatch();

   const [error, setError] = useState("");
   const [inputs, setInputs] = useState(!!info ? { ...info } : {});

   const success = !!info
      ? FindSuccess("EDIT_FUNDING_MODIFIER")
      : FindSuccess("CREATE_FUNDING_MODIFIER");
   const loader = !!info
      ? FindLoad("EDIT_FUNDING_MODIFIER")
      : FindLoad("CREATE_FUNDING_MODIFIER");

   useEffect(() => {
      if (!!success.length) {
         handleClose();
         dispatch(httpRequestsOnSuccessActions.removeSuccess(success[0].type));
      }
   }, [success]);

   const modifierTypes = getModifierTypes();

   const handleChange = (e) => {
      setInputs(
         (prevState) => ({ ...prevState, [e.target.name]: e.target.value }),
         error === e.target.name && setError("")
      );
   };

   const handleCreate = () => {
      const modifierDataIsValid =
         isNotEmpty(inputs.name) &&
         isNotEmpty(inputs.chargeRate) &&
         isNotEmpty(inputs.credentialId) &&
         isNotEmpty(inputs.type);
      if (modifierDataIsValid) {
         if (!!info) {
            const modifierDataEdit = {
               modifiers: [
                  {
                     credentialId: inputs.credentialId,
                     chargeRate: +inputs.chargeRate,
                     name: inputs.name,
                     type: +inputs.type,
                     _id: info._id,
                  },
               ],
            };
            dispatch(
               fundingSourceActions.editFundingModifier(
                  params.id,
                  currentService?._id,
                  modifierDataEdit
               )
            );
         } else {
            const modifierDataCreate = {
               modifiers: [
                  {
                     credentialId: inputs.credentialId,
                     chargeRate: +inputs.chargeRate,
                     name: inputs.name,
                     type: +inputs.type,
                  },
               ],
               serviceId: currentService?._id,
            };
            dispatch(
               fundingSourceActions.createFundingModifier(params.id, modifierDataCreate)
            );
         }
      } else {
         const errorText = !isNotEmpty(inputs.name)
            ? "name"
            : !isNotEmpty(inputs.chargeRate)
            ? "chargeRate"
            : !isNotEmpty(inputs.credentialId)
            ? "credentialId"
            : !isNotEmpty(inputs.type)
            ? "type"
            : "";
         setError(errorText);
      }
   };

   return (
      <div>
         <ModalHeader
            handleClose={handleClose}
            title={!!info ? "Edit Modifier" : "Add Modifier"}
         />
         <div className={classes.modifierBoxStyle}>
            <ValidationInput
               onChange={handleChange}
               value={inputs.name}
               variant={"outlined"}
               type={"text"}
               label={"Modifier Name*"}
               name={"name"}
               typeError={error === "name" && ErrorText.field}
            />
            <ValidationInput
               onChange={handleChange}
               value={inputs.chargeRate}
               variant={"outlined"}
               type={"number"}
               label={"Charge Rate*"}
               name={"chargeRate"}
               typeError={error === "chargeRate" && ErrorText.field}
            />
            <SelectInput
               name={"credentialId"}
               label={"Credential*"}
               type={"id"}
               handleSelect={handleChange}
               value={inputs.credentialId}
               list={credentials}
               typeError={error === "credentialId" ? ErrorText.field : ""}
            />
            <SelectInput
               name={"type"}
               label={"Type*"}
               handleSelect={handleChange}
               value={inputs.type?.toString()}
               language={modifierTypes}
               typeError={error === "type" ? ErrorText.field : ""}
            />
            <div className={classes.foundingSourceModalsBodyBlock}>
               <CreateChancel
                  loader={!!loader.length}
                  create={!!info ? "Save" : "Add"}
                  chancel={"Cancel"}
                  onCreate={handleCreate}
                  onClose={handleClose}
                  buttonWidth={"192px"}
                  createButnMargin={"16px"}
               />
            </div>
         </div>
      </div>
   );
};
