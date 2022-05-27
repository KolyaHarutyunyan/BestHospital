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
import {
   fundingSourceActions,
   httpRequestsOnErrorsActions,
   httpRequestsOnSuccessActions,
} from "@eachbase/store";

export const FundingSourceServiceAdd = ({ handleClose, info }) => {
   const systemServices = useSelector((state) => state.system.services);

   const [error, setError] = useState("");
   const [inputs, setInputs] = useState(info ? { ...info } : {});
   const [sysServiceItem, setSysServiceItem] = useState(null);

   const params = useParams();

   let dispatch = useDispatch();

   const classes = foundingSourceModalStyle();

   const success = FindSuccess("EDIT_FUNDING_SOURCE_SERVICE");
   const successCreate = FindSuccess("CREATE_FUNDING_SOURCE_SERVICE_BY_ID");
   const loader = !!info
      ? FindLoad("EDIT_FUNDING_SOURCE_SERVICE")
      : FindLoad("CREATE_FUNDING_SOURCE_SERVICE_BY_ID");

   useEffect(() => {
      if (success) {
         handleClose();
         dispatch(
            httpRequestsOnSuccessActions.removeSuccess("EDIT_FUNDING_SOURCE_SERVICE")
         );
         dispatch(httpRequestsOnErrorsActions.removeError("EDIT_FUNDING_SOURCE_SERVICE"));
      }
      if (successCreate) {
         setTimeout(() => {
            dispatch(fundingSourceActions.getFoundingSourceServiceByIdNoLoad(params.id));
            dispatch(
               httpRequestsOnSuccessActions.removeSuccess(
                  "CREATE_FUNDING_SOURCE_SERVICE_BY_ID"
               )
            );
            dispatch(
               httpRequestsOnErrorsActions.removeError(
                  "CREATE_FUNDING_SOURCE_SERVICE_BY_ID"
               )
            );
            handleClose();
         }, 1000);
      }
   }, [success, successCreate]);

   useEffect(() => {
      systemServices &&
         systemServices.length > 0 &&
         systemServices.forEach((item, index) => {
            if (inputs.name === item.name) {
               setSysServiceItem(item);
            }
         });
   }, [inputs]);

   function handleChange(e) {
      setInputs(
         (prevState) => ({ ...prevState, [e.target.name]: e.target.value }),
         error === e.target.name && setError("")
      );
   }

   function handleCreate() {
      const serviceDataIsValid =
         isNotEmpty(inputs.name) &&
         isNotEmpty(inputs.cptCode) &&
         isNotEmpty(inputs.size) &&
         isNotEmpty(inputs.min) &&
         isNotEmpty(inputs.max);
      if (serviceDataIsValid) {
         const data = {
            name: inputs.name,
            serviceId: sysServiceItem?.id,
            rate: 0,
            cptCode: inputs.cptCode,
            size: +inputs.size,
            min: +inputs.min,
            max: +inputs.max,
         };
         if (!!info) {
            dispatch(fundingSourceActions.editFoundingSourceServiceById(info?._id, data));
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
            <div className={classes.modifierServiceBoxStyle}>
               <SelectInput
                  name={"name"}
                  label={"Service*"}
                  handleSelect={handleChange}
                  value={inputs.name}
                  typeError={error === "name" ? ErrorText.field : ""}
                  list={systemServices ? systemServices : []}
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
                  <p className={classes.displayCodeBlockText} style={{ marginTop: 16 }}>
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
            </div>
            <div className={classes.modifierInputsBoxStyle}>
               <ValidationInput
                  onChange={handleChange}
                  value={inputs.cptCode}
                  variant={"outlined"}
                  type={"text"}
                  label={"CPT Code*"}
                  name={"cptCode"}
                  typeError={error === "cptCode" && ErrorText.field}
               />
               <ValidationInput
                  onChange={handleChange}
                  value={inputs.size}
                  variant={"outlined"}
                  type={"number"}
                  label={"Unit Size*"}
                  name={"size"}
                  typeError={error === "size" && ErrorText.field}
               />
               <div className={classes.foundingSourceModalsBodyBlock}>
                  <ValidationInput
                     onChange={handleChange}
                     value={inputs.min}
                     variant={"outlined"}
                     type={"number"}
                     label={"Min Unit*"}
                     name={"min"}
                     typeError={error === "min" && ErrorText.field}
                     styles={{ width: "192px" }}
                  />
                  <ValidationInput
                     onChange={handleChange}
                     value={inputs.max}
                     variant={"outlined"}
                     type={"number"}
                     label={"Max Unit*"}
                     name={"max"}
                     typeError={error === "max" && ErrorText.field}
                     styles={{ width: "192px", marginLeft: 10 }}
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
                  buttonWidth={"192px"}
                  createButnMargin={"16px"}
               />
            </div>
         </div>
      </div>
   );
};
