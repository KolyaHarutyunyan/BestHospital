import { Button } from "@material-ui/core";
import { buttonsStyle } from "./styles";
import { MinLoader } from "../loader";
import { Colors } from "@eachbase/utils";
import React from "react";

export const AddModalButton = ({
   disabled,
   text,
   handleClick,
   styles,
   btnStyles,
   loader,
   buttonClassName,
}) => {
   const classes = buttonsStyle();
   return (
      <div style={styles}>
         <Button
            disabled={disabled}
            style={btnStyles}
            className={`${classes.addModalButtonStyle} ${buttonClassName}`}
            onClick={handleClick}
         >
            {loader === true ? (
               <MinLoader margin={"0"} color={Colors.TextWhite} />
            ) : (
               text
            )}
         </Button>
      </div>
   );
};
