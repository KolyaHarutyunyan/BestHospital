import React from "react";
import { screensStyle } from "./styles";
import { CheckCircle } from "@material-ui/icons";
import { Colors } from "@eachbase/utils";

export const MessageMiniScreen = ({ text }) => {
  const classes = screensStyle();
  return (
    <div className={classes.messageMiniScreen}>
      <CheckCircle
        style={{
          width: "30px",
          height: "30px",
          color: Colors.ThemeGreen,
        }}
      />
      <p>{text}</p>
    </div>
  );
};
