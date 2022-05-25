import React, { useEffect, useState } from "react";
import { createClientStyle } from "../index";
import { ImagesFileUploader } from "./core";

export const AuthorizationFile = ({ fileIsForPayment = false, handleImagesPass }) => {
   const classes = createClientStyle();

   const [fileType, setFileType] = useState("");
   const [images, setImages] = useState([]);
   const [error, setError] = useState("");

   const uniqueImages = [...new Map(images.map((image) => [image.name, image])).values()];

   useEffect(() => {
      handleImagesPass && handleImagesPass(uniqueImages);
   }, [images]);

   function handleFileTypeChange(e) {
      setFileType(e.target.value);
      !!error && setError("");
   }

   function handleFileChange(imageList) {
      !!error && setError("");
      !!fileType && setFileType("");

      for (let item of imageList) {
         const _fileSizeIsLarge = item?.size > 2097152;
         const _fileTypeIsAllowed =
            item?.type === "application/pdf" ||
            item?.type === "image/png" ||
            item?.type === "text/csv" ||
            item?.type === "image/jpeg";

         if (_fileSizeIsLarge) {
            setError("Please, choose a file with smaller size!");
            return;
         }
         if (!_fileTypeIsAllowed) {
            setError("Only PDF , PNG , CSV & JPEG formats are supported");
            return;
         }
         setImages([...images, item]);
      }
   }

   function handleFileDelete(fileType) {
      setImages(uniqueImages.filter((image) => image.name !== fileType));
   }

   if (fileIsForPayment) {
      return (
         <ImagesFileUploader
            uploadedFiles={uniqueImages}
            handleChange={handleFileTypeChange}
            handleChangeFile={handleFileChange}
            deleteItem={handleFileDelete}
            fileName={fileType}
            error={error}
         />
      );
   }

   return (
      <>
         <div className={classes.authorizationFileHeader}>
            <h1>Uploaded files</h1>
            <h2>Please fulfill the file type to upload a file.</h2>
            <p>
               <span className={classes.starIcon}>*</span>
               Only
               <span> PDF , PNG , CSV </span> &<span> JPEG </span>
               formats are supported
            </p>
         </div>
         <ImagesFileUploader
            uploadedFiles={uniqueImages}
            handleChange={handleFileTypeChange}
            handleChangeFile={handleFileChange}
            deleteItem={handleFileDelete}
            fileName={fileType}
            error={error}
         />
      </>
   );
};
