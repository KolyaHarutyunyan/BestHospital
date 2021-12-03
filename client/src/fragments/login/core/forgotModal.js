import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EmailValidator } from '@eachbase/utils';
import { loginFragments } from "./style";
import {authActions, httpRequestsOnErrorsActions} from "@eachbase/store";
import { SignIn, ValidationInput } from "@eachbase/components";

export const ForgotModal = ({}) => {
  const dispatch = useDispatch();
  const classes = loginFragments();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [validEmail, setValidEmail] = useState(false);


  const {httpOnSuccess, httpOnError, httpOnLoad } = useSelector((state) => ({
    httpOnLoad: state.httpOnLoad,
    httpOnSuccess: state.httpOnSuccess,
    httpOnError: state.httpOnError
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
  const loginError =  httpOnError.length && httpOnError[0].error
  const handleChange = (ev) => {
    setEmail(ev.target.value);
    loginError === "User with this email was not found" && dispatch(httpRequestsOnErrorsActions.removeError('GET_RECOVERY_LINK'))
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
      loginError === "User with this email was not found" ? "User with this email was not found"
          : error === "notMathLogin" ? "Input is not field" : validEmail === "Not valid email"
          ? "Not valid email" : "";

  return (
      <div className={classes.LoginModalWrapper}>
        <p>Forgot your Password?</p>
        <span className={classes.LoginModalForgotText}>
      Enter your email address and we'll send you a recovery email to reset your password.
      </span>

        <div>
          <ValidationInput
              className={classes.inputMargins}
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
            margin={'15px 0 0 0'}
            loader={httpOnLoad && httpOnLoad[0] === 'GET_RECOVERY_LINK' }
            handleClick={GetLink}
            width={"100%"}
            text={"Get Recovery Link"}
        />
      </div>
  );
};
