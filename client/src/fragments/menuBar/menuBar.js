import React, { useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";
import { Router } from "@eachbase/root/router";
import { useDispatch, useSelector } from "react-redux";
import { TopBar, LeftBar } from "./core";
import { navBarStyles } from "./core/style";
import {
   authActions,
   httpRequestsOnErrorsActions,
   httpRequestsOnSuccessActions,
} from "@eachbase/store";
import { Toast } from "@eachbase/components";
import { ToastSuccess, ToastFail } from "@eachbase/utils";

export const MenuBar = ({}) => {
   const classes = navBarStyles(),
      theme = useTheme(),
      [linkInfo, setLinkInfo] = React.useState("");

   const dispatch = useDispatch();

   const { httpOnError, httpOnSuccess } = useSelector((state) => ({
      httpOnLoad: state.httpOnLoad,
      httpOnError: state.httpOnError,
      httpOnSuccess: state.httpOnSuccess,
   }));

   const success = httpOnSuccess.length && httpOnSuccess[0].type;
   const error = httpOnError.length && httpOnError[0].type;
   const errorMessage = httpOnError.length && httpOnError[0].error;
   const toastSuccess = ToastSuccess(success);
   const toastFail = ToastFail(error, errorMessage);
   const { saveLink } = useSelector((state) => ({
      saveLink: state.auth.saveLink,
   }));

   useEffect(
      () => setLinkInfo(saveLink ? saveLink : window.location.pathname),
      [saveLink]
   );

   useEffect(() => {
      if (!!toastSuccess) {
         dispatch(httpRequestsOnSuccessActions.removeSuccess(success));
      }
   }, [toastSuccess]);

   useEffect(() => {
      if (!!toastFail) {
         dispatch(httpRequestsOnErrorsActions.removeError(error));
      }
   }, [toastFail]);

   const setLinksStyle = () => {
      setLinkInfo(window.location.pathname);
   };

   const type = localStorage.getItem("userType");

   useEffect(() => {
      dispatch(authActions.getMyAuth());
      dispatch(authActions.getMyProfile(type));
   }, []);

   return (
      <div className={classes.root}>
         <TopBar />

         <LeftBar theme={theme} setLinksStyle={setLinksStyle} linkInfo={linkInfo} />
         <main className={classes.content}>
            <Router />
         </main>
         <Toast
            type={toastSuccess ? "success" : toastFail ? "error" : ""}
            text={toastSuccess ? toastSuccess : toastFail ? toastFail : ""}
            info={toastSuccess ? !!toastSuccess : toastFail ? !!toastFail : ""}
         />
      </div>
   );
};
