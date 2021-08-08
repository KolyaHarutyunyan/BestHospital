import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {authActions, httpRequestsOnErrorsActions} from "@eachbase/store";
import { loginFragments } from "./style";
import {
  ErrMessage,
  PasswordInput,
  ValidationInput,
  SignIn,
} from "@eachbase/components";
import { EmailValidator } from "@eachbase/utils";

export const LoginModal = ({ handleForgot }) => {
  const classes = loginFragments();
  const dispatch = useDispatch();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [validEmail, setValidEmail] = useState(false);

  const {httpOnError, httpOnLoad } = useSelector((state) => ({
    httpOnLoad: state.httpOnLoad,
    httpOnSuccess: state.httpOnSuccess,
    httpOnError: state.httpOnError
  }));

  const logInRequest = () => {
    const user = { email: login, password };
    if (validEmail === false && login && login !== "Not valid email" && password && password !== "notMath") {
      dispatch(authActions.logIn(user));
    } else {

      if(!login){
        setError('notMathLogin')
      }
      else if(validEmail === true){
        setError('Not valid email')
      }
      else if(!password){
        setError("notMathPassword")
      }
    }
  };

  const handleChange = (ev) => {
    let { name, value } = ev.target;
    setError(null);
    if(httpOnError.length) dispatch(httpRequestsOnErrorsActions.removeError('LOG_IN'))
    if (name === "email") {
      setLogin(value);
      dispatch(authActions.clearError());
    } else if (name === "password") {
      setPassword(value);
      dispatch(authActions.clearError());
    }
  };

  const handleCheck = (bool) => {
    if (bool === true) {
      setValidEmail("Not valid email");
    } else {
      setValidEmail(false);
    }
  };

  const loginError =  httpOnError.length && httpOnError[0].error
  const NotMathEmail = loginError === "User with this email was not found" ? "User with this email was not found"
      : error === "notMathLogin" ? "Input is not field"
          : validEmail === "Not valid email" ? "Not valid email"
              : "";

  const NotMathPassword = loginError === "user password does not match" ? "User password does not match" :
      error === "notMathPassword" ? "Input is not field" : "";

  return (
    <div className={classes.LoginModalWrapper}>
      <p>Sign in</p>

      <ValidationInput
          validator={EmailValidator}
          value={login}
          onChange={handleChange}
          sendBoolean={handleCheck}
          typeError={NotMathEmail}
          name={"email"}
          type={"email"}
          label={"Email"}
          id={"email"}
          autoComplete={"current-email"}
      />


      <PasswordInput
          styles={{marginTop:'25px'}}
          handleChangePassword={handleChange}
          type={"password"}
          name={"password"}
          disabled={false}
          value={password}
          onChange={handleChange}
          typeError={NotMathPassword}
          placeholder={"Password"}
      />

      <ErrMessage
          type={'login'}
          text={loginError === 'Check your email to activate your account' ? 'Check your email to activate your account' : ''  }
      />

      <div className={classes.LoginModalButtons}>
        <SignIn
            loader={!!httpOnLoad.length}
            handleClick={logInRequest}
            width={"200px"}
            text={"Sign In"}
        />

        <button onClick={handleForgot} className={classes.LoginModalForgot}>
          {" "}
          Forgot Password?
        </button>
      </div>
    </div>
  );
};
