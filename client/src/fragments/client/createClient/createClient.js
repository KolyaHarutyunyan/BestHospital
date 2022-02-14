import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import { ValidationInput, SelectInput, CreateChancel, ModalHeader } from "@eachbase/components";
import { createClientStyle } from "./styles";
import { ErrorText, FindLoad, FindSuccess, languages } from "@eachbase/utils";
import { clientActions, httpRequestsOnSuccessActions } from "@eachbase/store";

export const CreateClient = ({ handleClose, info }) => {
   let params = useParams();
   const [error, setError] = useState("");
   const [inputs, setInputs] = useState(
      info
         ? { ...info, birthday: moment(info?.birthday).format("YYYY-MM-DD") }
         : {
              firstName: "",
              middleName: "",
              lastName: "",
              ethnicity: "",
              code: "",
              language: "",
              familyLanguage: "",
              gender: "",
              birthday: "",
           }
   );
   const [step, setStep] = useState("first");
   const classes = createClientStyle();
   const dispatch = useDispatch();

   const success = info ? FindSuccess("EDIT_CLIENT") : FindSuccess("CREATE_CLIENT");
   const loader = info ? FindLoad("EDIT_CLIENT") : FindLoad("CREATE_CLIENT");

   const handleChange = (e) =>
      setInputs(
         (prevState) => ({ ...prevState, [e.target.name]: e.target.value }),
         error === e.target.name && setError("")
      );

   useEffect(() => {
      if (!success) return;
      handleClose();
      if (info) {
         dispatch(httpRequestsOnSuccessActions.removeSuccess("EDIT_CLIENT"));
      } else {
         dispatch(httpRequestsOnSuccessActions.removeSuccess("CREATE_CLIENT"));
      }
   }, [success]);

   const handleCreate = () => {
      if (step === "first") {
         if (inputs.firstName && inputs.lastName && inputs.code) {
            setStep("second");
         } else {
            setError(
               !inputs.firstName
                  ? "firstName"
                  : !inputs.lastName
                  ? "lastName"
                  : !inputs.code
                  ? "code"
                  : "Input is not field"
            );
         }
      } else if (step === "second") {
         if (
            inputs.gender &&
            inputs.birthday &&
            inputs.ethnicity &&
            inputs.language &&
            inputs.familyLanguage
         ) {
            const data = {
               firstName: inputs.firstName,
               middleName: inputs.middleName,
               lastName: inputs.lastName,
               ethnicity: inputs.ethnicity,
               code: inputs.code,
               language: inputs.language,
               familyLanguage: inputs.familyLanguage,
               gender: inputs.gender,
               birthday: inputs.birthday,
               status: "ACTIVE",
            };
            if (!info) {
               dispatch(clientActions.createClient(data));
            } else if (info) {
               dispatch(clientActions.editClient(data, params.id));
            }
         } else {
            setError(
               !inputs.gender
                  ? "gender"
                  : !inputs.birthday
                  ? "birthday"
                  : !inputs.ethnicity
                  ? "ethnicity"
                  : !inputs.language
                  ? "language"
                  : !inputs.familyLanguage
                  ? "familyLanguage"
                  : "Input is not field"
            );
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
                        label={"First Name"}
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
                     <ValidationInput
                        variant={"outlined"}
                        onChange={handleChange}
                        value={inputs.code}
                        type={"number"}
                        label={"Code*"}
                        name="code"
                        typeError={error === "code" ? ErrorText.field : ""}
                     />
                  </div>
               ) : (
                  <div style={{ width: 463 }}>
                     <SelectInput
                        name={"gender"}
                        label={"Gender*"}
                        handleSelect={handleChange}
                        value={inputs.gender}
                        list={list}
                        typeError={error === "gender" ? ErrorText.field : ""}
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
                        typeError={error === "language" ? ErrorText.field : ""}
                     />
                     <SelectInput
                        name={"familyLanguage"}
                        label={"Family Language*"}
                        handleSelect={handleChange}
                        value={inputs.familyLanguage}
                        language={languages}
                        typeError={error === "familyLanguage" ? ErrorText.field : ""}
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
