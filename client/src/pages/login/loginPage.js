import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginPage } from "./style";
import { authActions } from "@eachbase/store";
import {
  CopyRight,
  ForgotModal,
  LoginHeader,
  LoginModal,
  ResetModal,
} from "@eachbase/fragments";
import { MessageMiniScreen, MessageScreen } from "@eachbase/components";

export function LoginPage(props) {
  const classes = loginPage();
  const dispatch = useDispatch();
  const [forgot, setForgot] = useState(false);
  const [resetToken, setResetToken] = useState("");

  const { httpOnSuccess,loginErr, loader, getLinkSuccess, resetSuccess, closeResetSuccess } =
    useSelector((state) => ({
      // loginErr: state.auth.loginErr,
      // loader: state.auth.loader,
      httpOnSuccess: state.httpOnSuccess,
      getLinkSuccess: state.auth.getLinkSuccess,
      resetSuccess: state.auth.resetSuccess,
      closeResetSuccess: state.auth.closeResetSuccess,
    }));

  const handleForgot = () => {
    setForgot(true);
  };
//register?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhdm8ucGV0cm9zeWFuOTU5QGdtYWlsLmNvbSIsImlkIjoiNjEwZmUzNmFhOTZiNDkwZTA5YmIxNDkxIiwiaWF0IjoxNjI4NDMxMjE5fQ.YG_AjhZf_ezG8e953f-vU7EDRH2nlZ8qG0kXN3ZLmmU
  const local = localStorage.getItem("Reset") ? localStorage.getItem("Reset") : ''
    useEffect(() => {
        if( local ){
               const pos = local.slice(local.search('token='))
               const registerToken = pos.substring(6)
            setResetToken(registerToken)
        }
    }, []);

  useEffect(() => {
    if (resetSuccess) {
      setTimeout(() => dispatch(authActions.removeSuccess()), 3000);
    }
  }, [resetSuccess]);

  const ResetToken = resetSuccess === true ? true : !!resetToken;
  const resetLink = httpOnSuccess.length && httpOnSuccess[0].type === "GET_RECOVERY_LINK"
  return (
    <div>
      <LoginHeader />
      <div className={classes.loginPageBody}>
        <div className={classes.loginPageBodyPosition}>
          <div className={classes.loginPageTitle}>
            <p>Customer<br />Management <br />System</p>
          </div>

          {resetLink === true ? (
              <MessageScreen type={resetLink} />
          ) : closeResetSuccess !== "close" && ResetToken ? (
              <ResetModal resetToken={resetToken} />
          ) : forgot === false ? (
              <LoginModal handleForgot={handleForgot} />
          ) : (
              <ForgotModal />
          )}

          {resetSuccess === true && (
            <MessageMiniScreen text={"Reset password success"} />
          )}
        </div>
      </div>

      <div className={classes.CopyRightPos}>
        <CopyRight />
      </div>
    </div>
  );
}
