import React from "react";
import { buttonsStyle } from "./styles";
import { Images } from "@eachbase/utils";

export const AddCircle = ({ handleCLic, text }) => {
   const classes = buttonsStyle();
   return (
      <div className={classes.addCircleStyle} onClick={handleCLic}>
         <img src={Images.addYellowIcon} alt={"addYellowIcon"} />
         {text && <p className={classes.addCircleTextStyle}>{text}</p>}
      </div>
   );
};
