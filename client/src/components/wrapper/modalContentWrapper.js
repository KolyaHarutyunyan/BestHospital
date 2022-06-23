import React from "react";
import { CloseButton } from "@eachbase/components";
import { wrapperStyle } from "./styles";

export const ModalContentWrapper = ({
   onClose,
   titleContent,
   subtitleContent,
   content,
   children,
   wrapperClassName,
}) => {
   const classes = wrapperStyle();

   const modalContentWrapperStyle = `${classes.wrapperContainerStyle} ${wrapperClassName}`;

   return (
      <div className={modalContentWrapperStyle}>
         <CloseButton handleCLic={onClose} />
         <div>
            {titleContent && (
               <h2 className={classes.wrapperTitleStyle}>{titleContent}</h2>
            )}
            {subtitleContent && (
               <p className={classes.wrapperSubtitleStyle}>{subtitleContent}</p>
            )}
            {content}
         </div>
         <div>{children}</div>
      </div>
   );
};
