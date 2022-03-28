import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
   AddressInput,
   ValidationInput,
   SelectInput,
   Steps,
   CloseButton,
} from "@eachbase/components";
import { createStaffModalStyle } from "./style";
import {
   useGlobalTextStyles,
   EmailValidator,
   ErrorText,
   isNotEmpty,
   FindSuccess,
   FindError,
   FindLoad,
} from "@eachbase/utils";
import {
   adminActions,
   httpRequestsOnErrorsActions,
   httpRequestsOnSuccessActions,
} from "@eachbase/store";
import { inputStyle } from "../../../fundingSource/createFundingSource/core/styles";

const steps = ["General Info", "Address", "Other Details"];

const issuingStateList = [{ name: "1" }, { name: "2" }];
const residencyList = [{ name: "7" }, { name: "8" }];

const genderList = [{ name: "Male" }, { name: "Female" }, { name: "Other" }];

export const CreateStaff = ({ handleClose, resetData, staffGeneral }) => {
   const [error, setError] = useState("");
   const [emailError, setEmailError] = useState("");
   const [errorSec, setErrorSec] = useState("");
   const [inputs, setInputs] = useState(staffGeneral ? staffGeneral : {});
   const [fullAddress, setFullAddress] = useState(
      staffGeneral ? staffGeneral.address?.formattedAddress : ""
   );
   const [enteredAddress, setEnteredAddress] = useState(
      staffGeneral ? staffGeneral.address?.formattedAddress : ""
   );

   const [license, setLicense] = useState(
      staffGeneral
         ? staffGeneral.license
         : { driverLicense: "", expireDate: "", state: "" }
   );

   const phoneIsValid =
      isNotEmpty(inputs.phone) &&
      inputs.phone.trim().length >= 10 &&
      !/[a-zA-Z]/g.test(inputs.phone);

   const emailIsValid =
      isNotEmpty(inputs.email) && EmailValidator.test(inputs.email);
   const secEmailIsValid =
      isNotEmpty(inputs.secondaryEmail) &&
      EmailValidator.test(inputs.secondaryEmail);

   const disabledOne =
      isNotEmpty(inputs.firstName) &&
      isNotEmpty(inputs.lastName) &&
      phoneIsValid &&
      emailIsValid &&
      (isNotEmpty(inputs.secondaryEmail) ? secEmailIsValid : true);

   const disableSecond =
      !isNotEmpty(fullAddress) && !isNotEmpty(enteredAddress);

   const dispatch = useDispatch();

   const classes = createStaffModalStyle();
   const globalText = useGlobalTextStyles();

   const handleCheck = (bool) => {
      if (bool === true) {
         setEmailError("Not valid email");
      } else {
         setEmailError("");
      }
   };
   const handleCheckSecondary = (bool) => {
      if (bool === true) {
         setErrorSec("Not valid email");
      } else {
         setErrorSec("");
      }
   };

   const handleChange = (e) => {
      setInputs((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
      error === e.target.name && setError("");
   };

   const handleChangeLicense = (e) => {
      setLicense((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
      error === e.target.name && setError("");
   };

   const handleAddressChange = (selectedAddress) => {
      setEnteredAddress(selectedAddress);
      error === "enteredAddress" && setError("");
   };

   const handleCreate = () => {
      const staffDataIsValid =
         isNotEmpty(inputs.firstName) &&
         isNotEmpty(inputs.lastName) &&
         isNotEmpty(inputs.email) &&
         isNotEmpty(inputs.phone) &&
         isNotEmpty(inputs.gender) &&
         isNotEmpty(inputs.birthday) &&
         isNotEmpty(inputs.residency) &&
         isNotEmpty(inputs.ssn) &&
         isNotEmpty(fullAddress) &&
         isNotEmpty(enteredAddress) &&
         isNotEmpty(license.driverLicense) &&
         isNotEmpty(license.state) &&
         isNotEmpty(license.expireDate);

      if (staffDataIsValid) {
         const data = {
            firstName: inputs.firstName,
            middleName: inputs.middleName,
            lastName: inputs.lastName,
            email: inputs.email,
            secondaryEmail: inputs.secondaryEmail,
            phone: inputs.phone,
            secondaryPhone: inputs.secondaryPhone,
            state: "state",
            gender: inputs.gender,
            birthday:
               inputs.birthday && new Date(inputs.birthday).toISOString(),
            residency: inputs.residency,
            ssn: parseInt(inputs.ssn),
            status: staffGeneral ? staffGeneral.status : 1,
            address: fullAddress,
            license:
               license.driverLicense && license.state && license.expireDate
                  ? {
                       driverLicense: license.driverLicense,
                       expireDate: new Date(license.expireDate).toISOString(),
                       state: license.state,
                    }
                  : undefined,
         };

         if (staffGeneral) {
            dispatch(adminActions.editAdminById(data, staffGeneral.id));
         } else {
            dispatch(adminActions.createAdmin(data));
         }
      } else {
         const staffDataErrorText = !isNotEmpty(inputs.firstName)
            ? "firstName"
            : !isNotEmpty(inputs.lastName)
            ? "lastName"
            : !isNotEmpty(inputs.email)
            ? "email"
            : !isNotEmpty(inputs.phone)
            ? "phone"
            : !isNotEmpty(inputs.residency)
            ? "residency"
            : !isNotEmpty(inputs.ssn)
            ? "ssn"
            : !isNotEmpty(inputs.gender)
            ? "gender"
            : !isNotEmpty(inputs.birthday)
            ? "birthday"
            : !isNotEmpty(enteredAddress)
            ? "enteredAddress"
            : !isNotEmpty(license.driverLicense)
            ? "driverLicense"
            : !isNotEmpty(license.state)
            ? "state"
            : !isNotEmpty(license.expireDate)
            ? "expireDate"
            : "";

         setError(staffDataErrorText);
      }
   };

   const success = staffGeneral
      ? FindSuccess("EDIT_ADMIN_BY_ID")
      : FindSuccess("CREATE_ADMIN");

   useEffect(() => {
      if (!!success.length) {
         handleClose();
         dispatch(httpRequestsOnSuccessActions.removeSuccess(success.type));
      }
   }, [success]);

   const firstStep = (
      <React.Fragment>
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
            validator={EmailValidator}
            variant={"outlined"}
            name={"email"}
            type={"email"}
            label={"Primary Email*"}
            typeError={
               error === "email"
                  ? ErrorText.field
                  : emailError === "Not valid email"
                  ? "Not valid email"
                  : ""
            }
            sendBoolean={handleCheck}
            value={inputs.email}
            onChange={handleChange}
         />
         <ValidationInput
            validator={EmailValidator}
            variant={"outlined"}
            name={"secondaryEmail"}
            type={"email"}
            label={"Secondary Email"}
            typeError={
               errorSec === "secondaryEmail"
                  ? ErrorText.field
                  : errorSec === "Not valid email"
                  ? "Not valid email"
                  : ""
            }
            sendBoolean={handleCheckSecondary}
            value={inputs.secondaryEmail}
            onChange={handleChange}
         />
         <ValidationInput
            Length={11}
            onChange={handleChange}
            value={inputs.phone && inputs.phone.replace("+", "")}
            variant={"outlined"}
            type={"number"}
            label={"Primary Phone Number*"}
            name={"phone"}
            typeError={error === "phone" ? ErrorText.field : ""}
         />
         <ValidationInput
            Length={11}
            onChange={handleChange}
            value={
               inputs.secondaryPhone && inputs.secondaryPhone.replace("+", "")
            }
            variant={"outlined"}
            type={"number"}
            label={"Secondary Phone Number"}
            name={"secondaryPhone"}
            typeError={error === "secondaryPhone" ? ErrorText.field : ""}
         />
      </React.Fragment>
   );

   const secondStep = (
      <React.Fragment>
         <AddressInput
            handleSelectValue={handleAddressChange}
            onTrigger={setFullAddress}
            Value={"Street Address*"}
            flex="block"
            info={staffGeneral}
            styles={inputStyle}
            errorBoolean={error === "enteredAddress" ? ErrorText.field : ""}
            enteredValue={enteredAddress}
         />
      </React.Fragment>
   );

   const thirdStep = (
      <React.Fragment>
         <p className={classes.otherDetailsTitle}>Driver License</p>
         <ValidationInput
            variant={"outlined"}
            onChange={handleChangeLicense}
            value={license ? license.driverLicense : ""}
            type={"text"}
            label={"Driver License"}
            name="driverLicense"
            typeError={error === "driverLicense" ? ErrorText.field : ""}
         />
         <div className={classes.flexContainer}>
            <SelectInput
               style={classes.selectMargin}
               name={"state"}
               label={"Issuing State"}
               handleSelect={handleChangeLicense}
               value={license ? license.state : ""}
               list={issuingStateList}
               typeError={error === "state" ? ErrorText.field : ""}
            />
            <ValidationInput
               variant={"outlined"}
               onChange={handleChangeLicense}
               value={
                  license?.expireDate &&
                  moment(license?.expireDate).format().substring(0, 10)
               }
               type={"date"}
               label={"Expiration Date"}
               name="expireDate"
               typeError={error === "expireDate" ? ErrorText.field : ""}
            />
         </div>
         <p className={`${classes.otherDetailsTitle} ${classes.titlePadding}`}>
            Other
         </p>
         <SelectInput
            name={"residency"}
            label={"Residency Status"}
            handleSelect={handleChange}
            value={inputs.residency}
            list={residencyList}
            typeError={error === "residency" ? ErrorText.field : ""}
         />
         <ValidationInput
            variant={"outlined"}
            value={inputs.ssn}
            type={"number"}
            label={"SSN Number*"}
            name="ssn"
            onChange={handleChange}
            typeError={error === "ssn" ? ErrorText.field : ""}
         />
         <div className={classes.flexContainer}>
            <SelectInput
               style={classes.selectMargin}
               name={"gender"}
               label={"Gender*"}
               handleSelect={handleChange}
               value={inputs.gender}
               list={genderList}
               typeError={error === "gender" ? ErrorText.field : ""}
            />
            <ValidationInput
               variant={"outlined"}
               onChange={handleChange}
               value={
                  inputs.birthday &&
                  moment(inputs.birthday).format().substring(0, 10)
               }
               type={"date"}
               label={"Date of Birth*"}
               name="birthday"
               typeError={error === "birthday" ? ErrorText.field : ""}
            />
         </div>
      </React.Fragment>
   );

   return (
      <div className={classes.modalDimensions}>
         <h1 className={`${globalText.modalTitle} ${classes.modalTitle}`}>
            {resetData ? "Add Staff Member" : "Edit Staff Member"}{" "}
         </h1>
         <div className={classes.positionedButton}>
            <CloseButton handleCLic={handleClose} />
         </div>
         <Steps
            handleClick={handleCreate}
            firstStep={firstStep}
            secondStep={secondStep}
            thirdStep={thirdStep}
            stepTitles={steps}
            handleClose={handleClose}
            disabledOne={disabledOne}
            disableSecond={disableSecond}
            staffGeneral={staffGeneral}
         />
      </div>
   );
};
