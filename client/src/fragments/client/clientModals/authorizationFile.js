import React, { useEffect, useState } from "react";
import { createClientStyle } from "../index";
import { ImagesFileUploader } from "./core";

export const AuthorizationFile = ({ fileIsForPayment = false, handleImagesPass }) => {
   const classes = createClientStyle();

   const [fileType, setFileType] = useState("");
   const [images, setImages] = useState([]);
   const [error, setError] = useState("");

   useEffect(() => {
      handleImagesPass && handleImagesPass(images);
   }, [images]);

   function handleFileTypeChange(e) {
      setFileType(e.target.value);
   }

   function handleFileChange(e) {
      for (let item of e.target.files) {
         if (item && item.size > 2097152) {
            setError(true);
         } else {
            setError("");
            setImages([...images, new File([item], item.name)]);
         }
      }
      setFileType("");
   }

   function handleFileDelete(fileType) {
      setImages(images.filter((image) => image.name !== fileType));
   }

   if (fileIsForPayment) {
      return (
         <ImagesFileUploader
            uploadedFiles={images}
            handleChange={handleFileTypeChange}
            handleChangeFile={handleFileChange}
            deleteItem={handleFileDelete}
            fileName={fileType}
            error={true}
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
            uploadedFiles={images}
            handleChange={handleFileTypeChange}
            handleChangeFile={handleFileChange}
            deleteItem={handleFileDelete}
            fileName={fileType}
            error={true}
         />
      </>
   );
};
