import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "@eachbase/store";
import { loginFragments } from "./style";
import { PasswordInput, SignIn } from "@eachbase/components";

export const ResetModal = ({ resetToken }) => {
  const classes = loginFragments();
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleChange = (ev) => {
    setError("");
    if (ev.target.name === "newPassword") {
      setNewPassword(ev.target.value);
    } else {
      setConfirmPassword(ev.target.value);
    }
  };

  const resetPassword = () => {
    if (newPassword && confirmPassword) {
      const passwords = {
        newPassword: newPassword,
        confirmation: confirmPassword,
        token: resetToken,
      };
      dispatch(authActions.resetPassword(passwords));
    } else {
      if (!newPassword) {
        setError("New password is not field");
      } else if (!confirmPassword) {
        setError("Confirm password is not field");
      }
    }
  };

  const errorNewPassword =
    error === "New password is not field" ? "New password is not field" : "";
  const errorConfirmPassword =
    error === "Confirm password is not field"
      ? "Confirm password is not field"
      : "";

  return (
    <div style={{ height: "343px" }} className={classes.LoginModalWrapper}>
      <p>Reset Password</p>
      <span className={classes.LoginModalForgotText}>
        Enter your new password.
        <br /> Use at least 8 characters, 1 upper case and 1 digit.
      </span>

      <PasswordInput
        handleChangePassword={handleChange}
        type={"password"}
        name={"newPassword"}
        disabled={false}
        value={newPassword}
        onChange={handleChange}
        typeError={errorNewPassword}
        placeholder={"New Password"}
      />

      <PasswordInput
        handleChangePassword={handleChange}
        type={"password"}
        name={"confirmPassword"}
        disabled={false}
        value={confirmPassword}
        onChange={handleChange}
        typeError={errorConfirmPassword}
        placeholder={"Confirm New Password"}
      />

      <SignIn
        handleClick={resetPassword}
        width={"100%"}
        text={"Reset Password"}
      />
    </div>
  );
};
