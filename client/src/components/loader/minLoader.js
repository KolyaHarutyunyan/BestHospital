import { CircularProgress } from "@material-ui/core";
import React from "react";
import { Colors } from "@eachbase/utils";

export const MinLoader = ({color, style = {} }) => {
  const styles = {
    loaderStyle: {
      position: "absolute",
      color: color,
      // color: Colors.TextWhite,
      width: "20px",
      height: "20px",
      margin: "5px 0 0 10px",
    },
  };
  return <CircularProgress style={{ ...styles.loaderStyle, ...style }} />;
};
