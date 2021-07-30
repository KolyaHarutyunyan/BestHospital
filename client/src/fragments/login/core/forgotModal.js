import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EmailValidator } from '@eachbase/utils';
import { loginFragments } from "./style";
import { authActions } from "@eachbase/store";
import { SignIn, ValidationInput } from "@eachbase/components";

export const ForgotModal = ({}) => {
  const dispatch = useDispatch();
  const classes = loginFragments();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [validEmail, setValidEmail] = useState(false);

  const { loginErr, getLinkLoading } = useSelector((state) => ({
    loginErr: state.auth.loginErr,
    loader: state.auth.loader,
    getLinkLoading: state.auth.getLinkLoading,
  }));

  const GetLink = () => {
    if (validEmail === false && email && email !== "Not valid email") {
      dispatch(authActions.getRecoveryLink(email));
    } else {
      if (!email) {
        setError("notMathLogin");
      }
    }
  };

  const handleChange = (ev) => {
    setEmail(ev.target.value);
    // dispatch (authActions.clearError ())
  };

  const handleCheck = (bool) => {
    if (bool === true) {
      setValidEmail("Not valid email");
    } else {
      setValidEmail(false);
    }
  };

  const NotMathEmail =
    loginErr === "User with this email was not found"
      ? "User with this email was not found"
      : error === "notMathLogin"
      ? "Input is not field"
      : validEmail === "Not valid email"
      ? "Not valid email"
      : "";

  return (
    <div className={classes.LoginModalWrapper}>
      <p>Forgot your password?</p>
      <span className={classes.LoginModalForgotText}>
        Enter your email address and we'll send you a recovery email to reset
        your password.
      </span>

      <div style={{ margin: "10px 0 20px 0" }}>
        <ValidationInput
          validator={EmailValidator}
          value={email}
          onChange={handleChange}
          sendBoolean={handleCheck}
          typeError={NotMathEmail}
          name={"email"}
          type={"email"}
          label={"Email"}
          id={"email"}
          autoComplete={"current-email"}
        />
      </div>

      <SignIn
        loader={getLinkLoading}
        handleClick={GetLink}
        width={"100%"}
        text={"Get Recovery Link"}
      />
    </div>
  );
};
