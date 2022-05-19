import React from "react";
import { Images } from "@eachbase/utils";

export const checkFileType = (uploadedFileType) => {
   switch (uploadedFileType) {
      case "image/jpeg":
         return <img src={Images.jpegIcon} alt="jpeg" />;
      case "image/png":
         return <img src={Images.pngIcon} alt="png" />;
      case "text/csv":
         return <img src={Images.csvIcon} alt="csv" />;

      default:
         return null;
   }
};
