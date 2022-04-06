import React from "react";
import { buttonsStyle } from "./styles";
import { Images } from "@eachbase/utils";

export const DownloadLink = ({
   linkClassName,
   linkHref,
   linkInnerText,
   linkDownload = false,
}) => {
   const classes = buttonsStyle();

   const downloadLinkClassName = `${classes.downloadLinkStyle} ${linkClassName}`;

   return (
      <a
         className={downloadLinkClassName}
         href={linkHref}
         download={linkDownload}
         onClick={(event) => !linkDownload && event.preventDefault()}
      >
         {linkInnerText}
         <img src={Images.download} alt="" />
      </a>
   );
};
