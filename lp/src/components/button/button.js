import React from "react";
import { CircularProgress } from "@mui/material";

export const Button = ({
   buttonClassName,
   buttonType,
   buttonDisabled,
   onClickButton,
   buttonLoader = false,
   children,
}) => {
   return (
      <button
         type={buttonType}
         className={`button ${buttonClassName}`}
         disabled={buttonDisabled}
         onClick={onClickButton}
      >
         {buttonLoader ? <CircularProgress size={17} color={"inherit"} /> : children}
      </button>
   );
};
