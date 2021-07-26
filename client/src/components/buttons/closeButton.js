import React from "react";
import { buttonsStyle } from "./styles";
import CloseIcon from "@material-ui/icons/Close";
import { Colors } from "@eachbase/utils";

export const CloseButton = ({ handleCLic }) => {
  const classes = buttonsStyle();
  return (
    <button className={classes.closeCircleStyle} onClick={handleCLic}>
      <CloseIcon
        style={{ color: Colors.TextPrimary, width: "15px", height: "15px" }}
      />
    </button>
  );
};
