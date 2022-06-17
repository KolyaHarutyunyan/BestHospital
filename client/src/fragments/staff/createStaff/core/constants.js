import { adminActions } from "@eachbase/store";
import {
   EmailValidator,
   ErrorText,
   Images,
   isNotEmpty,
   makeEnum,
   makeSSN,
} from "@eachbase/utils";
import clsx from "clsx";
import { useColorlibStepIconStyles } from "./style";

export function firstStepHandler(
   inputs,
   setActiveStep,
   emailErrorMsg,
   phoneErrorMsg,
   setError
) {
   const phoneIsValid =
      isNotEmpty(inputs.phoneNumber) &&
      inputs.phoneNumber.trim().length >= 10 &&
      !/[a-zA-Z]/g.test(inputs.phoneNumber);
   const secPhoneIsValid = isNotEmpty(inputs.secondaryPhone)
      ? inputs.secondaryPhone.trim().length >= 10 &&
        !/[a-zA-Z]/g.test(inputs.secondaryPhone)
      : true;
   const emailIsValid = isNotEmpty(inputs.email) && EmailValidator.test(inputs.email);
   const secEmailIsValid = isNotEmpty(inputs.secondaryEmail)
      ? EmailValidator.test(inputs.secondaryEmail)
      : true;
   const firstStepIsValid =
      isNotEmpty(inputs.firstName) &&
      isNotEmpty(inputs.lastName) &&
      phoneIsValid &&
      secPhoneIsValid &&
      emailIsValid &&
      secEmailIsValid;
   if (firstStepIsValid) {
      setActiveStep(1);
   } else {
      const firstStepErrorText = !isNotEmpty(inputs.firstName)
         ? "firstName"
         : !isNotEmpty(inputs.lastName)
         ? "lastName"
         : !isNotEmpty(inputs.email)
         ? "email"
         : !emailIsValid
         ? emailErrorMsg
         : !secEmailIsValid
         ? "secondaryEmail"
         : !isNotEmpty(inputs.phoneNumber)
         ? "phoneNumber"
         : !phoneIsValid
         ? phoneErrorMsg
         : !secPhoneIsValid
         ? "secondaryPhone"
         : "";
      setError(firstStepErrorText);
   }
}

export function secondStepHandler(fullAddress, enteredAddress, setActiveStep, setError) {
   const secondStepIsValid = isNotEmpty(fullAddress) && isNotEmpty(enteredAddress);
   if (secondStepIsValid) {
      setActiveStep(2);
   } else {
      const secondStepErrorText = !isNotEmpty(enteredAddress) ? "enteredAddress" : "";
      setError(secondStepErrorText);
   }
}

export function thirdStepHandler(
   license,
   inputs,
   staffGeneral,
   fullAddress,
   dispatch,
   setError
) {
   const driverLicenseIsValid =
      isNotEmpty(license.driverLicense) ||
      isNotEmpty(license.state) ||
      isNotEmpty(license.expireDate)
         ? isNotEmpty(license.driverLicense) &&
           isNotEmpty(license.state) &&
           isNotEmpty(license.expireDate)
         : true;
   const ssnIsValid = inputs.ssn.trim().length === 9;
   const thirdDataIsValid =
      driverLicenseIsValid &&
      isNotEmpty(inputs.gender) &&
      isNotEmpty(inputs.birthday) &&
      isNotEmpty(inputs.residency) &&
      isNotEmpty(inputs.ssn) &&
      ssnIsValid;
   if (thirdDataIsValid) {
      const data = {
         firstName: inputs.firstName,
         middleName: inputs.middleName || undefined,
         lastName: inputs.lastName,
         email: inputs.email,
         secondaryEmail: inputs.secondaryEmail || undefined,
         phone: inputs.phoneNumber,
         secondaryPhone: inputs.secondaryPhone || undefined,
         state: "state",
         gender: inputs.gender,
         birthday: inputs.birthday && new Date(inputs.birthday).toISOString(),
         residency: makeEnum(inputs.residency),
         ssn: makeSSN(inputs.ssn),
         status: !!staffGeneral ? staffGeneral.status : 1,
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
      if (!!staffGeneral) {
         dispatch(adminActions.editAdminById(data, staffGeneral.id));
      } else {
         dispatch(adminActions.createAdmin(data));
      }
   } else {
      const driverLicenseErrorText = !driverLicenseIsValid
         ? !isNotEmpty(license.driverLicense)
            ? "driverLicense"
            : !isNotEmpty(license.state)
            ? "state"
            : !isNotEmpty(license.expireDate)
            ? "expireDate"
            : ""
         : "";
      const staffDataErrorText = !!driverLicenseErrorText
         ? driverLicenseErrorText
         : !isNotEmpty(inputs.residency)
         ? "residency"
         : !isNotEmpty(inputs.ssn)
         ? "ssn"
         : !ssnIsValid
         ? ErrorText.ssnError
         : !isNotEmpty(inputs.gender)
         ? "gender"
         : !isNotEmpty(inputs.birthday)
         ? "birthday"
         : "";
      setError(staffDataErrorText);
   }
}

export function getColorlibStepIcon(props, handleBack) {
   const classes = useColorlibStepIconStyles();
   const { active, completed } = props;

   const icons = {
      1: completed ? (
         <img src={Images.checkmark} alt={"checked"} />
      ) : (
         <img src={Images.generalInfoIcon} alt={"generalIcon"} />
      ),
      2: completed ? (
         <img src={Images.checkmark} alt={"checked"} />
      ) : (
         <img src={Images.address} alt={"address"} />
      ),
      3: completed ? (
         <img src={Images.checkmark} alt={"checked"} />
      ) : (
         <img src={Images.otherDetailsIcon} alt={"otherDetails"} />
      ),
   };
   return (
      <div
         className={clsx(classes.root, {
            [classes.active]: active,
            [classes.completed]: completed,
         })}
         onClick={() => {
            completed && handleBack(props.icon);
         }}
      >
         {icons[String(props.icon)]}
      </div>
   );
}
