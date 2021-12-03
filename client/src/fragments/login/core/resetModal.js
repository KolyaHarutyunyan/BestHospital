import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { authActions } from "@eachbase/store";
import { loginFragments } from "./style";
import { PasswordInput, SignIn } from "@eachbase/components";
import {ErrorText, PasswordValidator} from "@eachbase/utils";

export const ResetModal = ({ resetToken,reset, register }) => {
    const classes = loginFragments();
    const dispatch = useDispatch();

    const [error, setError] = useState("");
    const [inputs, setInputs] = useState({});


    const {httpOnLoad} = useSelector((state) => ({
        httpOnLoad: state.httpOnLoad,
    }));


    const handleChange = e => setInputs(prevState =>
        ({...prevState, [e.target.name]: e.target.value}),
        error === e.target.name && setError(''),
        error === 'confirmationNotEqual' && setError(''),
        error === 'Password and confirm password does not match' && setError(''),
    );

    const resetPassword = () => {
        if (inputs.newPassword && inputs.confirmPassword) {
            const passwords = {
                newPassword: inputs.newPassword,
                confirmation: inputs.confirmPassword,
                token: resetToken,
                type: register ? 'register' : 'reset'
            };
            if (inputs.newPassword === inputs.confirmPassword) {
                dispatch(authActions.resetPassword(passwords));
            } else {
                setError("Password and confirm password does not match");
            }
        } else {
            if (!inputs.newPassword) {
                setError("New password is not field");
            } else if (!inputs.confirmPassword) {
                setError("Confirm password is not field");
            }
        }
    };
    const handleCheck = (bool, name) => {
        if (bool === true) {
            setError(name);
        } else {
            setError("");
        }
    };


    const errorNewPassword =
        error === 'newPasswordNotValid' ? ErrorText.passwordValid :
            error === "New password is not field" ? "New password is not field" : "";
    const errorConfirmPassword =
        error === 'confirmationNotValid' ? ErrorText.passwordValid :
            error === "Password and confirm password does not match" ? "Password and confirm password does not match" :
                error === "Confirm password is not field" ? "Confirm password is not field" : "";

    return (
        <div  className={classes.LoginModalWrapper}>
            <p>{register === true ? 'Welcome Wellness Daisy ' : 'Reset Password'}</p>
            <span className={classes.LoginModalForgotText}>
          {register === true ?
              <span>You have been invited to join Wellness Daisy as a an admin. Please create password for testuser@gmail.com</span>
              :
              <span> Enter your new password.<br/>
                  bv Use at least 8 characters, 1 upper case and 1 digit.</span>
          }
      </span>

            <PasswordInput
                styles={{marginBottom:'20px'}}
                handleChangePassword={handleChange}
                validator={PasswordValidator}
                sendBoolean={(bool) => handleCheck(bool, 'newPasswordNotValid')}
                type={"password"}
                name={"newPassword"}
                disabled={false}
                value={inputs.newPassword}
                onChange={handleChange}
                typeError={errorNewPassword}
                placeholder={register ? "Password" : "New Password"}
            />

            <PasswordInput
                validator={PasswordValidator}
                styles={{marginBottom: '20px'}}
                sendBoolean={(bool) => handleCheck(bool, 'confirmationNotValid')}
                handleChangePassword={handleChange}
                type={"password"}
                name={"confirmPassword"}
                disabled={false}
                value={inputs.confirmPassword}
                onChange={handleChange}
                typeError={errorConfirmPassword}
                placeholder={register ? "Confirm Password" : "Confirm New Password"}
            />

            <SignIn
                loader={!!httpOnLoad.length}
                handleClick={resetPassword}
                width={"100%"}
                text={register ? "Complete Registration" : "Reset Password"}
            />
        </div>
    );
};
