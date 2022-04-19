import React from "react";
import { CloseButton } from "@eachbase/components";
import { wrapperStyle } from "./styles";

export const BillingModalWrapper = ({
   onClose,
   titleContent,
   subtitleContent,
   content,
   children,
   wrapperStylesName,
}) => {
   const classes = wrapperStyle();

   const wrapperClassName = `${classes.wrapperContainerStyle} ${wrapperStylesName}`;

   return (
      <div className={wrapperClassName}>
         <CloseButton handleCLic={onClose} />
         <div>
            <h2 className={classes.wrapperTitleStyle}>{titleContent}</h2>
            <p className={classes.wrapperSubtitleStyle}>{subtitleContent}</p>
            {content}
         </div>
         <div>{children}</div>
      </div>
   );
};
