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

export const checkImmediatelyUploadedFileType = (fileName) => {
   return fileName.endsWith(".jpeg") ? (
      <img src={Images.jpegIcon} alt="jpeg" />
   ) : fileName.endsWith(".png") ? (
      <img src={Images.pngIcon} alt="png" />
   ) : fileName.endsWith(".csv") ? (
      <img src={Images.csvIcon} alt="csv" />
   ) : null;
};
