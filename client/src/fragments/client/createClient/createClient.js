import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import {
   ValidationInput,
   SelectInput,
   CreateChancel,
   ModalHeader,
} from "@eachbase/components";
import { createClientStyle } from "./styles";
import {
   ErrorText,
   FindLoad,
   FindSuccess,
   isNotEmpty,
   languages,
   makeCapitalize,
} from "@eachbase/utils";
import { clientActions, httpRequestsOnSuccessActions } from "@eachbase/store";

export const CreateClient = ({ handleClose, info }) => {
   let params = useParams();
   const [error, setError] = useState("");
   const [inputs, setInputs] = useState(
      info ? { ...info, birthday: moment(info?.birthday).format("YYYY-MM-DD") } : {}
   );
   const [step, setStep] = useState("first");
   const classes = createClientStyle();
   const dispatch = useDispatch();

   const success = !!info ? FindSuccess("EDIT_CLIENT") : FindSuccess("CREATE_CLIENT");
   const loader = !!info ? FindLoad("EDIT_CLIENT") : FindLoad("CREATE_CLIENT");

   const handleChange = (e) =>
      setInputs(
         (prevState) => ({ ...prevState, [e.target.name]: e.target.value }),
         error === e.target.name && setError("")
      );

   useEffect(() => {
      if (!!success.length) {
         handleClose();
         dispatch(httpRequestsOnSuccessActions.removeSuccess(success[0].type));
      }
   }, [success]);

   const handleCreate = () => {
      if (step === "first") {
         const firstStepIsValid =
            isNotEmpty(inputs.firstName) && isNotEmpty(inputs.lastName);
         // &&
         // isNotEmpty(inputs.code);

         if (firstStepIsValid) {
            setStep("second");
         } else {
            const firstStepErrorText = !isNotEmpty(inputs.firstName)
               ? "firstName"
               : !isNotEmpty(inputs.lastName)
               ? "lastName"
               : // : !isNotEmpty(inputs.code)
                 // ? "code"
                 "";

            setError(firstStepErrorText);
         }
      } else if (step === "second") {
         const secondStepIsValid =
            isNotEmpty(inputs.gender) &&
            isNotEmpty(inputs.birthday) &&
            isNotEmpty(inputs.ethnicity) &&
            isNotEmpty(inputs.language) &&
            isNotEmpty(inputs.familyLanguage);

         if (secondStepIsValid) {
            const data = {
               firstName: inputs.firstName,
               middleName: inputs.middleName,
               lastName: inputs.lastName,
               ethnicity: inputs.ethnicity,
               language: inputs.language,
               familyLanguage: inputs.familyLanguage,
               gender: inputs.gender,
               birthday: inputs.birthday,
               status: "ACTIVE",
            };
            if (!!info) {
               dispatch(clientActions.editClient(data, params.id));
            } else {
               dispatch(clientActions.createClient(data));
            }
         } else {
            const secondStepErrorText = !isNotEmpty(inputs.gender)
               ? "gender"
               : !isNotEmpty(inputs.birthday)
               ? "birthday"
               : !isNotEmpty(inputs.ethnicity)
               ? "ethnicity"
               : !isNotEmpty(inputs.language)
               ? "language"
               : !isNotEmpty(inputs.familyLanguage)
               ? "familyLanguage"
               : "";

            setError(secondStepErrorText);
         }
      }
   };

   const list = [{ name: "male" }, { name: "female" }, { name: "other" }];

   return (
      <div className={classes.createFoundingSource}>
         <ModalHeader
            setStep={setStep}
            steps={step}
            handleClose={handleClose}
            title={info ? "Edit Client" : "Add Client"}
         />
         <div className={classes.createFoundingSourceBody}>
            <div className={classes.createFoundingSourceBodyFlex}>
               {step === "first" ? (
                  <div style={{ width: 463 }}>
                     <ValidationInput
                        variant={"outlined"}
                        onChange={handleChange}
                        value={inputs.firstName}
                        type={"text"}
                        label={"First Name*"}
                        name="firstName"
                        typeError={error === "firstName" ? ErrorText.field : ""}
                     />
                     <ValidationInput
                        variant={"outlined"}
                        onChange={handleChange}
                        value={inputs.middleName}
                        type={"text"}
                        label={"Middle Name"}
                        name="middleName"
                        typeError={error === "middleName" ? ErrorText.field : ""}
                     />
                     <ValidationInput
                        variant={"outlined"}
                        onChange={handleChange}
                        value={inputs.lastName}
                        type={"text"}
                        label={"Last Name*"}
                        name="lastName"
                        typeError={error === "lastName" ? ErrorText.field : ""}
                     />
                     {/* <ValidationInput
                        variant={"outlined"}
                        onChange={handleChange}
                        value={inputs.code}
                        type={"number"}
                        label={"Code*"}
                        name="code"
                        typeError={error === "code" ? ErrorText.field : ""}
                     /> */}
                  </div>
               ) : (
                  <div style={{ width: 463 }}>
                     <SelectInput
                        name={"gender"}
                        label={"Gender*"}
                        handleSelect={handleChange}
                        value={inputs.gender}
                        list={list}
                        typeError={error === "gender" ? ErrorText.selectField : ""}
                     />
                     <ValidationInput
                        variant={"outlined"}
                        onChange={handleChange}
                        value={inputs.birthday}
                        type={"date"}
                        label={"Date of Birth*"}
                        name="birthday"
                        typeError={error === "birthday" ? ErrorText.field : ""}
                     />
                     <ValidationInput
                        className={classes.inputTextField}
                        variant={"outlined"}
                        onChange={handleChange}
                        value={inputs.ethnicity}
                        label={"Ethnicity*"}
                        name="ethnicity"
                        typeError={error === "ethnicity" ? ErrorText.field : ""}
                        id="standard-basic"
                        fullWidth
                     />
                     <SelectInput
                        name={"language"}
                        label={"Language*"}
                        handleSelect={handleChange}
                        value={inputs.language}
                        language={languages}
                        typeError={error === "language" ? ErrorText.selectField : ""}
                     />
                     <SelectInput
                        name={"familyLanguage"}
                        label={"Family Language*"}
                        handleSelect={handleChange}
                        value={inputs.familyLanguage}
                        language={languages}
                        typeError={
                           error === "familyLanguage" ? ErrorText.selectField : ""
                        }
                     />
                  </div>
               )}
            </div>
            <div className={classes.createFoundingSourceBodyFlex}>
               <CreateChancel
                  loader={!!loader.length}
                  create={step === "first" ? "Next" : info ? "Save" : "Add"}
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
