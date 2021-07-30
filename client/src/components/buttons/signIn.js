import React from "react";
import { Button } from "@material-ui/core";
import { Colors } from "@eachbase/utils";
import { MinLoader } from "@eachbase/components";

export const SignIn = ({ text, width, handleClick, loader }) => {
  return (
    <Button
      onClick={handleClick}
      style={{
        width: `${width}`,
        background: `${Colors.BackgroundBlue}`,
        height: "48px",
        borderRadius: "8px",
        color: `${Colors.TextWhite}`,
        fontSize: "16px",
        lineHeight: "22px",
        fontWeight: "600",
        textTransform: "capitalize",
      }}
    >
      {loader === true ? <MinLoader color={Colors.TextWhite}/> : text}
    </Button>
  );
};
