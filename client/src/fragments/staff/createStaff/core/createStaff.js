import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CloseButton, CreateChancel } from "@eachbase/components";
import { ColorlibConnector, createStaffModalStyle, stepStyles } from "./style";
import {
   useGlobalTextStyles,
   EmailValidator,
   FindSuccess,
   FindLoad,
   FindError,
   getPhoneErrorText,
   ErrorText,
   addHiddenClass,
   ssnActions,
} from "@eachbase/utils";
import {
   httpRequestsOnErrorsActions,
   httpRequestsOnSuccessActions,
} from "@eachbase/store";
import { inputStyle } from "../../../fundingSource/createFundingSource/core/styles";
import {
   CreateStaffFirstStep,
   CreateStaffSecondStep,
   CreateStaffThirdStep,
} from "./common";
import { Step, StepLabel, Stepper } from "@material-ui/core";
import {
   firstStepHandler,
   getColorlibStepIcon,
   secondStepHandler,
   thirdStepHandler,
} from "./constants";

const steps = ["General Info", "Address", "Other Details"];

export const CreateStaff = ({ handleClose, resetData, staffGeneral }) => {
   const classes = createStaffModalStyle();
   const stepsStyles = stepStyles();
   const globalText = useGlobalTextStyles();

   const dispatch = useDispatch();

   const loader = FindLoad("CREATE_ADMIN");
   const editLoader = FindLoad("EDIT_ADMIN_BY_ID");
   const success = !!staffGeneral
      ? FindSuccess("EDIT_ADMIN_BY_ID")
      : FindSuccess("CREATE_ADMIN");
   const backError = !!staffGeneral
      ? FindError("EDIT_ADMIN_BY_ID")
      : FindError("CREATE_ADMIN");

   useEffect(() => {
      return () => {
         setError("");
         if (!!staffGeneral) {
            dispatch(httpRequestsOnErrorsActions.removeError("EDIT_ADMIN_BY_ID"));
         } else {
            dispatch(httpRequestsOnErrorsActions.removeError("CREATE_ADMIN"));
         }
      };
   }, []);

   useEffect(() => {
      if (!!success.length) {
         handleClose();
         dispatch(httpRequestsOnSuccessActions.removeSuccess(success[0].type));
      }
   }, [success]);

   const [error, setError] = useState("");
   const [inputs, setInputs] = useState(
      !!staffGeneral
         ? {
              ...staffGeneral,
              phoneNumber: staffGeneral.phone,
              ssn: ssnActions.modifySSN(staffGeneral.ssn),
           }
         : {}
   );
   const [fullAddress, setFullAddress] = useState(
      !!staffGeneral ? staffGeneral.address?.formattedAddress : ""
   );
   const [enteredAddress, setEnteredAddress] = useState(
      !!staffGeneral ? staffGeneral.address?.formattedAddress : ""
   );
   const [license, setLicense] = useState(
      !!staffGeneral
         ? staffGeneral.license
         : { driverLicense: "", expireDate: "", state: "" }
   );
   const [activeStep, setActiveStep] = useState(0);

   useEffect(() => {
      if (!!backError?.length) {
         if (backError[0]?.error === "User already exists") {
            setActiveStep(0);
            setError(ErrorText.existenceError("Staff with this email"));
         }
         if (backError[0]?.error[0] === "phone must be a valid phone number") {
            setActiveStep(0);
            setError(ErrorText.phoneError);
         }
      }
   }, [backError]);

   const firstStepStyle = addHiddenClass(
      classes.firstStepContainer,
      activeStep === 1 || activeStep === 2
   );
   const secondStepStyle = addHiddenClass(
      classes.secondStepContainer,
      activeStep === 0 || activeStep === 2
   );
   const thirdStepStyle = addHiddenClass(
      classes.thirdStepContainer,
      activeStep === 0 || activeStep === 1
   );

   const createButnText = activeStep === 2 ? (!!staffGeneral ? "Save" : "Add") : "Next";
   const phoneErrorMsg = getPhoneErrorText(inputs.phoneNumber);
   const emailErrorMsg = !EmailValidator.test(inputs.email) ? ErrorText.emailValid : "";

   function handleChange(e) {
      setInputs((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
      if (
         error === e.target.name ||
         error === phoneErrorMsg ||
         error === emailErrorMsg ||
         error === ErrorText.ssnError ||
         error === ErrorText.phoneError ||
         error ===
            ErrorText.existenceError("Staff with this email")(
               backError && backError.length
            )
      ) {
         setError("");
      }
      if (backError && backError.length) {
         dispatch(httpRequestsOnErrorsActions.removeError(backError[0].type));
      }
   }

   function handleChangeLicense(e) {
      setLicense((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
      error === e.target.name && setError("");
   }

   function handleAddressChange(selectedAddress) {
      setEnteredAddress(selectedAddress);
      error === "enteredAddress" && setError("");
   }

   const handleBack = (step) => setActiveStep(step - 1);
   const ColorlibStepIcon = (props) => getColorlibStepIcon(props, handleBack);

   const handleFirstStep = () =>
      firstStepHandler(inputs, setActiveStep, emailErrorMsg, phoneErrorMsg, setError);

   const handleSecondStep = () =>
      secondStepHandler(fullAddress, enteredAddress, setActiveStep, setError);

   const handleThirdStep = () =>
      thirdStepHandler(license, inputs, staffGeneral, fullAddress, dispatch, setError);

   function handleCreate() {
      if (activeStep === 0) {
         handleFirstStep();
      } else if (activeStep === 1) {
         handleSecondStep();
      } else if (activeStep === 2) {
         handleThirdStep();
      } else return;
   }

   return (
      <div className={classes.modalDimensions}>
         <h1 className={`${globalText.modalTitle} ${classes.modalTitle}`}>
            {!!resetData ? "Add Staff Member" : "Edit Staff Member"}{" "}
         </h1>
         <div className={classes.positionedButton}>
            <CloseButton handleCLic={handleClose} />
         </div>
         <div className={classes.root}>
            <Stepper
               className={stepsStyles.stepHeader}
               alternativeLabel
               activeStep={activeStep}
               connector={<ColorlibConnector />}
            >
               {steps.map((label) => (
                  <Step key={label}>
                     <StepLabel
                        classes={{ label: classes.step_label_root }}
                        StepIconComponent={ColorlibStepIcon}
                     >
                        {label}
                     </StepLabel>
                  </Step>
               ))}
            </Stepper>
            <div className={stepsStyles.stepBody}>
               <div className={firstStepStyle}>
                  <CreateStaffFirstStep
                     inputs={inputs}
                     handleChange={handleChange}
                     error={error}
                     backError={backError}
                     phoneErrorMsg={phoneErrorMsg}
                     emailErrorMsg={emailErrorMsg}
                  />
               </div>
               <div className={secondStepStyle}>
                  <CreateStaffSecondStep
                     inputStyle={inputStyle}
                     staffGeneral={staffGeneral}
                     enteredAddress={enteredAddress}
                     setFullAddress={setFullAddress}
                     handleAddressChange={handleAddressChange}
                     error={error}
                  />
               </div>
               <div className={thirdStepStyle}>
                  <CreateStaffThirdStep
                     inputs={inputs}
                     handleChange={handleChange}
                     handleChangeLicense={handleChangeLicense}
                     license={license}
                     error={error}
                  />
               </div>
               <div className={stepsStyles.buttonsContainer}>
                  <CreateChancel
                     loader={!!loader.length || !!editLoader.length}
                     buttonWidth="224px"
                     create={createButnText}
                     chancel={"Cancel"}
                     onClose={handleClose}
                     onCreate={handleCreate}
                  />
               </div>
            </div>
         </div>
      </div>
   );
};
