import React from "react";
import { buttonsStyle } from "./styles";
import CloseIcon from "@material-ui/icons/Close";
import { Colors } from "@eachbase/utils";

export const CloseButton = ({ handleCLick, styles, isInModal }) => {
   const classes = buttonsStyle();
   return (
      <button
         style={styles ? { ...styles } : {}}
         className={`${classes.closeCircleStyle} ${
            isInModal ? "modalView" : ""
         }`}
         onClick={handleCLick}
      >
         <CloseIcon
            style={{ color: Colors.TextPrimary, width: "15px", height: "15px" }}
         />
      </button>
   );
};
