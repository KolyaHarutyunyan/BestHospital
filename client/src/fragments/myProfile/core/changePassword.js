import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myProfileFragment } from "./style";
import { PasswordValidator, ErrorText, Images, isNotEmpty, FindSuccess, FindLoad } from "@eachbase/utils";
import { Button } from "@material-ui/core";
import { MinLoader, PasswordInput } from "@eachbase/components";
import { authActions, httpRequestsOnSuccessActions } from "@eachbase/store";

export const ChangePassword = ({}) => {
   const dispatch = useDispatch();
   const [error, setError] = useState("");
   const [showInputs, setShowInputs] = useState(false);
   const [inputs, setInputs] = useState({
      password: "",
      newPassword: "",
      confirmation: "",
   });

   const successType = FindSuccess("CHANGE_PASSWORD_REQUEST");
   const loader = FindLoad("CHANGE_PASSWORD_REQUEST");

   useEffect(() => {
      if (!!successType.length) {
         setShowInputs(false);
            dispatch(
               httpRequestsOnSuccessActions.removeSuccess("CHANGE_PASSWORD_REQUEST")
            );
      }
   }, [successType]);

   const handleChange = (e) =>
      setInputs(
         (prevState) => ({ ...prevState, [e.target.name]: e.target.value }),
         error === e.target.name && setError(""),
         error === "confirmationNotEqual" && setError("")
      );

   const handleChangePassword = () => {
      const changePassDataIsValid =
         isNotEmpty(inputs.password) &&
         isNotEmpty(inputs.newPassword) &&
         isNotEmpty(inputs.confirmation);

      if (changePassDataIsValid) {
         const data = {
            password: inputs.password,
            newPassword: inputs.newPassword,
            confirmation: inputs.confirmation,
         };

         if (inputs.newPassword === inputs.confirmation) {
            dispatch(authActions.changePassword(data));
         } else {
            setError("confirmationNotEqual");
         }
      } else {
         const changePassDataErrorText = !isNotEmpty(inputs.password)
            ? "password"
            : !isNotEmpty(inputs.newPassword)
            ? "newPassword"
            : !isNotEmpty(inputs.confirmation)
            ? "confirmation"
            : "";

         setError(changePassDataErrorText);
      }
   };
   const handleCheck = (bool, name) => {
      if (bool === true) {
         setError(name);
      } else {
         setError("");
      }
   };

   const classes = myProfileFragment();
   return (
      <div className={classes.changePasswordWrapper}>
         <div className={classes.changePasswordContent}>
            <p className={classes.changePasswordTitle}> Change Password </p>

            {showInputs ? (
               <div>
                  <Button className={classes.saveButton} onClick={handleChangePassword}>
                     {!!loader.length ? (
                        <MinLoader />
                     ) : (
                        "Save"
                     )}
                  </Button>
                  <Button
                     className={classes.cancelButton}
                     onClick={() => setShowInputs(false)}
                  >
                     Cancel
                  </Button>
               </div>
            ) : (
               <div onClick={() => setShowInputs(true)}>
                  <img src={Images.edit} alt="edit" />
                  <p>Edit</p>
               </div>
            )}
         </div>

         <p className={classes.changePasswordTextInfo}>
            {showInputs
               ? "Use at least 8 characters, 1 upper case and 1 digit"
               : "Use strong password to keep your account secure."}
         </p>
         {showInputs && (
            <div style={{ marginTop: "16px" }}>
               <PasswordInput
                  handleChangePassword={handleChange}
                  type={"password"}
                  name={"password"}
                  disabled={false}
                  variant={"accountPassword"}
                  value={inputs.password}
                  onChange={handleChange}
                  typeError={error === "password" && ErrorText.field}
                  placeholder={"Current Password*"}
               />
               <PasswordInput
                  styles={{ marginTop: "6px" }}
                  validator={PasswordValidator}
                  sendBoolean={(bool) => handleCheck(bool, "newPasswordNotValid")}
                  handleChangePassword={handleChange}
                  type={"password"}
                  name={"newPassword"}
                  disabled={false}
                  variant={"accountPassword"}
                  value={inputs.newPassword}
                  onChange={handleChange}
                  typeError={
                     error === "newPasswordNotValid"
                        ? ErrorText.passwordValid
                        : error === "newPassword" && ErrorText.field
                  }
                  placeholder={"New Password*"}
               />
               <PasswordInput
                  styles={{ marginTop: "6px" }}
                  validator={PasswordValidator}
                  sendBoolean={(bool) => handleCheck(bool, "confirmationNotValid")}
                  handleChangePassword={handleChange}
                  type={"password"}
                  name={"confirmation"}
                  disabled={false}
                  variant={"accountPassword"}
                  value={inputs.confirmation}
                  onChange={handleChange}
                  typeError={
                     error === "confirmationNotEqual"
                        ? "Confirmation not match with New password "
                        : error === "confirmationNotValid"
                        ? ErrorText.passwordValid
                        : error === "confirmation" && ErrorText.field
                  }
                  placeholder={"Retype New Password*"}
               />
            </div>
         )}
      </div>
   );
};
