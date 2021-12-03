import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginPage} from "./style";
import {authActions} from "@eachbase/store";
import {
    CopyRight,
    ForgotModal,
    LoginHeader,
    LoginModal,
    ResetModal,
} from "@eachbase/fragments";
import {MessageMiniScreen, MessageScreen, Toast} from "@eachbase/components";
import {ToastFail, ToastSuccess} from "@eachbase/utils";

export function LoginPage(props) {
    const classes = loginPage();
    const dispatch = useDispatch();
    const [forgot, setForgot] = useState(false);
    const [resetToken, setResetToken] = useState("");
    const [registerToken, setRegisterToken] = useState("");

    const {httpOnError, resetSuccess, closeResetSuccess, httpOnSuccess} =
        useSelector((state) => ({
            httpOnError: state.httpOnError,
            httpOnSuccess: state.httpOnSuccess,
            getLinkSuccess: state.auth.getLinkSuccess,
            resetSuccess: state.auth.resetSuccess,
            closeResetSuccess: state.auth.closeResetSuccess,
        }));

    const link = window.location.search
    const handleForgot = () => {
        setForgot(true);
    };

    // const local = localStorage.getItem("Reset") ? localStorage.getItem("Reset") : ''


    useEffect(() => {
        if (link.search('resetToken=') !== -1) {
            const pos = link.slice(link.search('resetToken='))
            const resetToken = pos.substring(11)
            setResetToken(resetToken)
        }
        if (link.search('token=') !== -1) {
            const pos = link.slice(link.search('token='))
            const registerToken = pos.substring(6)
            setRegisterToken(registerToken)
        }
    }, []);

    useEffect(() => {
        if (resetSuccess) {
            setTimeout(() => dispatch(authActions.removeSuccess()), 3000);
        }
    }, [resetSuccess]);


    const resetLink = httpOnSuccess.length && httpOnSuccess[0].type === "GET_RECOVERY_LINK"
    const token = resetToken ? resetToken : registerToken ? registerToken : ''
    const error = httpOnError.length && httpOnError[0].type
    const toastFail = ToastFail(error)

    return (
        <div>
            <LoginHeader/>
            <div className={classes.loginPageBody}>
                <div className={classes.loginPageBodyPosition}>
                    <div className={classes.loginPageTitle}><p>CUSTOMER<br/>Management <br/>System</p></div>
                    {resetLink === true ? (
                        <MessageScreen type={resetLink}/>
                    ) : closeResetSuccess !== "close" && token ? (
                        <ResetModal
                            reset={!!resetToken}
                            register={!!registerToken}
                            resetToken={token}/>
                    ) : forgot === false ? (
                        <LoginModal handleForgot={handleForgot}/>
                    ) : (
                        <ForgotModal/>
                    )}

                    {resetSuccess === true && (
                        <MessageMiniScreen text={"Reset password success"}/>
                    )}
                </div>
            </div>
            <div className={classes.CopyRightPos}>
                <CopyRight/>
            </div>
            <Toast
                type={'error'}
                text={toastFail}
                info={toastFail}
            />
        </div>
    );
}
