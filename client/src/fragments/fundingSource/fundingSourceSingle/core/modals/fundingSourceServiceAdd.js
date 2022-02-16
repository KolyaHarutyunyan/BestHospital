import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ValidationInput, SelectInput, CreateChancel, ModalHeader } from "@eachbase/components";
import { foundingSourceModalStyle } from "./styles";
import { ErrorText, FindLoad, FindSuccess } from "@eachbase/utils";
import {
   fundingSourceActions,
   httpRequestsOnErrorsActions,
   httpRequestsOnSuccessActions,
} from "@eachbase/store";
import { FundingSourceModifiersAdd } from "./fundingSourceModifiersAdd";
import axios from "axios";
import { httpRequestsOnLoadActions } from "../../../../../store/http_requests_on_load";
import {getFoundingSourceServiceByIdNoLoad} from "../../../../../store/fundingSource/fundingSource.action";

export const FundingSourceServiceAdd = ({ handleClose, info, modifiersID }) => {
   const systemServices = useSelector((state) => state.system.services);
   const globalCredentials = useSelector((state) => state.system.credentials);
   const [error, setError] = useState("");
   const [inputs, setInputs] = useState(
      info
         ? { ...info }
         : {
              name: "",
              cptCode: "",
              size: "",
              min: "",
              max: "",
           }
   );
   const [sysServiceItem, setSysServiceItem] = useState(null);
   const [postModifiers, setPostModifiers] = useState();
   const [modifiersEdit, setModifiersEdit] = useState([]);
   const [getLastMod, setGetLastMod] = useState(null);
   const params = useParams();
   let dispatch = useDispatch();

   const [cre, setCre] = useState([]);
   const classes = foundingSourceModalStyle();
   let addNewMod = (newMod) => {
      setModifiersEdit([...modifiersEdit, newMod]);
   };

   const handleNew = (item) => {
      setGetLastMod(item);

      if (item !== null) {
         setCre([...cre, item]);
      }
   };

   const success = FindSuccess("EDIT_FUNDING_SOURCE_SERVICE");
   const successCreate = FindSuccess("CREATE_FUNDING_SOURCE_SERVICE_BY_ID");
   const loader = info ? FindLoad("EDIT_FUNDING_SOURCE_SERVICE") : FindLoad("CREATE_FUNDING_SOURCE_SERVICE_BY_ID");

   const handleChange = (e) => {
      setInputs(
         (prevState) => ({ ...prevState, [e.target.name]: e.target.value }),
         error === e.target.name && setError("")
      );
   };

   useEffect(() => {
      if (success) {
         handleClose();
         dispatch(httpRequestsOnSuccessActions.removeSuccess("EDIT_FUNDING_SOURCE_SERVICE"));
         dispatch(httpRequestsOnErrorsActions.removeError("EDIT_FUNDING_SOURCE_SERVICE"));
      }
      if (successCreate) {

         setTimeout(() => {
            dispatch(fundingSourceActions.getFoundingSourceServiceByIdNoLoad(params.id,))
            dispatch(httpRequestsOnSuccessActions.removeSuccess("CREATE_FUNDING_SOURCE_SERVICE_BY_ID"));
            dispatch(httpRequestsOnErrorsActions.removeError("CREATE_FUNDING_SOURCE_SERVICE_BY_ID"));
            handleClose();
         }, 1000)

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

   const handleCreate = () => {
      if (inputs.name && inputs.cptCode && inputs.size && inputs.min && inputs.max) {
         const data = {
            name: inputs.name,
            serviceId: sysServiceItem?.id,
            rate: 0,
            cptCode: inputs.cptCode,
            size: +inputs.size,
            min: +inputs.min,
            max: +inputs.max,
         };
         let arr = postModifiers;
         if (!info) {
            dispatch(fundingSourceActions.createFoundingSourceServiceById(params.id, data, arr));
         } else {
            if (cre.length) {
               const date = { modifiers: [...cre], serviceId: info._id };
               const newArr = arr && arr.length && arr.filter((i) => i._id);

               dispatch(httpRequestsOnLoadActions.appendLoading("EDIT_FUNDING_SOURCE_SERVICE"));
               axios
                  .post(`/modifier`, date, { auth: true })
                  .then(
                     (res) =>
                        dispatch(
                           fundingSourceActions.editFoundingSourceServiceById(
                              info?._id,
                              data,
                              newArr,
                              params.id
                           )
                        ),
                     setCre([])
                  )
                  .then(dispatch(fundingSourceActions.getFoundingSourceServiceById(params.id)));
            } else {
               dispatch(
                  fundingSourceActions.editFoundingSourceServiceById(
                     info?._id,
                     data,
                     arr,
                     params.id
                  )
               );
            }
         }
      } else {
         setError(
            !inputs.name
               ? "name"
               : !inputs.cptCode
               ? "cptCode"
               : !inputs.size
               ? "size"
               : !inputs.min
               ? "min"
               : !inputs.max
               ? "max"
               : "Input is not field"
         );
      }
   };

   return (
      <div className={classes.createFoundingSource}>
         <ModalHeader
            handleClose={handleClose}
            title={info ? "Edit Service" : "Add a New Service"}
         />
         <div className={classes.createFoundingSourceBody}>
            <p className={classes.fundingSourceModalsTitle}>Service</p>
            <div className={classes.foundingSourceModalsBodyBlock}>
               <div className={classes.foundingSourceModalsBodyBox}>
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
               <div className={classes.foundingSourceModalsBodyBox}>
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
                        styles={{ width: 192 }}
                     />
                     <ValidationInput
                        onChange={handleChange}
                        value={inputs.max}
                        variant={"outlined"}
                        type={"number"}
                        label={"Max Unit*"}
                        name={"max"}
                        typeError={error === "max" && ErrorText.field}
                        styles={{ width: 192, marginLeft: 10 }}
                     />
                  </div>
               </div>
            </div>

            <FundingSourceModifiersAdd
               info={info}
               addNewMod={addNewMod}
               modifiersServ={modifiersID}
               setPostModifiers={setPostModifiers}
               globalCredentials={globalCredentials}
               setGetLastMod={handleNew}
            />

            <div className={classes.foundingSourceModalsBodyBlock}>
               <CreateChancel
                  loader={!!loader.length}
                  create={info ? "Save" : "Add"}
                  chancel={"Cancel"}
                  onCreate={handleCreate}
                  onClose={handleClose}
                  buttonWidth="400px"
               />
            </div>
         </div>
      </div>
   );
};
