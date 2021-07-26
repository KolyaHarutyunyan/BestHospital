import { CircularProgress } from "@material-ui/core";
import React from "react";
import { Colors } from "@eachbase/utils";

export const InputMinLoader = ({ style = {} }) => {
  const styles = {
    loaderStyle: {
      position: "absolute",
      color: Colors.ThemeGreen,
      width: "20px",
      height: "20px",
      right:'10px'
    },
  };
  return <CircularProgress style={{ ...styles.loaderStyle, ...style }} />;
};
