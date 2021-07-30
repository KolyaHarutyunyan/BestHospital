import React from "react";
import { Images } from "@eachbase/utils";
import { logoStyle } from "./styles";

export const GlobalLogo = ({}) => {
  const classes = logoStyle();

  return (
    <div className={classes.GlobalLogo}>
        WLD
      {/*<img src={Images.doctors} alt="tracker" />*/}
    </div>
  );
};
