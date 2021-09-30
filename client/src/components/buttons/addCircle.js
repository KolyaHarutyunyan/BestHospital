import React from "react";
import { buttonsStyle } from "./styles";
import {Images} from "@eachbase/utils";

export const AddCircle = ({ handleCLic, text }) => {
  const classes = buttonsStyle();
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <button className={classes.addCircleStyle} onClick={handleCLic}>
       <img src={Images.addYellowIcon} alt={'addYellowIcon'}/>
      </button>
      {text && <p className={classes.addCircleTextStyle}>{text}</p>}
    </div>
  );
};
