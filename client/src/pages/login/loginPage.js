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

  const { loginErr, loader, getLinkSuccess, resetSuccess, closeResetSuccess } =
    useSelector((state) => ({
      // loginErr: state.auth.loginErr,
      // loader: state.auth.loader,
      getLinkSuccess: state.auth.getLinkSuccess,
      resetSuccess: state.auth.resetSuccess,
      closeResetSuccess: state.auth.closeResetSuccess,
    }));

  const handleForgot = () => {
    setForgot(true);
  };

  const local = localStorage.getItem("Reset");
  if (local && !resetToken) {
    let resetToken = local.slice(local.search("resetToken"));
    let slicedResetToken = resetToken.slice(11);
    setResetToken(slicedResetToken);
  }

  useEffect(() => {
    if (resetSuccess) {
      setTimeout(() => dispatch(authActions.removeSuccess()), 3000);
    }
  }, [resetSuccess]);

  const ResetToken = resetSuccess === true ? true : !!resetToken;

  return (
    <div>
      <LoginHeader />
      <div className={classes.loginPageBody}>
        <div className={classes.loginPageBodyPosition}>
          <div className={classes.loginPageTitle}>
            <p>Customer<br />Management <br />System</p>
          </div>

          {getLinkSuccess !== null ? (
            <MessageScreen type={getLinkSuccess} />
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
