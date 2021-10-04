import React from "react";
import { screensStyle } from "./styles";
import { CheckCircle } from "@material-ui/icons";
import { Colors, Images } from "@eachbase/utils";
import { useDispatch } from "react-redux";
import { authActions } from "@eachbase/store";

export const MessageScreen = ({ type }) => {
  const classes = screensStyle();
  const dispatch = useDispatch();

  const handleTry = () => {
    dispatch(authActions.tryAgain());
  };
  return (
    <div className={classes.messageScreenWrapper}>
      {type === true ? (
        <div className={classes.messageScreenModal}>
          <CheckCircle
            style={{
              width: "48px",
              height: "48px",
              color: Colors.ThemeGreen,
            }}
          />
          <p className={classes.messageScreenText}>Success</p>
          <p className={classes.messageScreenResponse}>
            We have sent you a recovery email.
            <br /> Please check it.
          </p>
        </div>
      ) : (
        <div className={classes.errMessageScreenModal}>
          <img
            style={{
              width: "48px",
              height: "48px",
            }}
            src={Images.error}
            alt={"error"}
          />
          <p className={classes.messageScreenText}>Oops!</p>
          <p className={classes.messageScreenResponse}>
            Sorry we were unable to send you a <br /> recovery email. Please try
            again.
          </p>
          <button onClick={handleTry} className={classes.messageButton}>
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};
