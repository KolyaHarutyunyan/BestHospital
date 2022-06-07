import React, { useEffect, useState } from "react";
import { fileUploadersStyle } from "./styles";
import { ValidationInput } from "@eachbase/components";
import { UploadedFileCard } from "./core";
import { Images, ImgUploader, isNotEmpty } from "@eachbase/utils";
import ReactFileReader from "react-file-reader";
import { Loader } from "../loader";

export const ImagesFileUploader = ({
   uploadedFiles = [],
   handleImagesPass,
   handleFilePass,
   handleFileNamePass,
   handleFileRemove,
   changeNameAfterFileUpload,
   uploadOnlyOneFile,
   uploadImmediately,
   fileLoader,
}) => {
   const classes = fileUploadersStyle();

   const fileCardContainerStyle = `${classes.fileCardContainerStyle} ${
      uploadOnlyOneFile ? "singleFile" : ""
   }`;

   const [enteredFileName, setEnteredFileName] = useState("");
   const [fileName, setFileName] = useState("");
   const [images, setImages] = useState(uploadImmediately ? uploadedFiles : []);
   const [error, setError] = useState("");
   const [loaderUpload, setLoaderUpload] = useState(false);

   const uniqueImages = [...new Map(images.map((image) => [image.name, image])).values()];

   useEffect(() => {
      handleImagesPass && handleImagesPass(uniqueImages);
   }, [images]);

   useEffect(() => {
      handleFileNamePass && handleFileNamePass(fileName);
   }, [fileName]);

   useEffect(() => {
      if (isNotEmpty(enteredFileName)) {
         setFileName(enteredFileName);
      }
   }, [enteredFileName]);

   const uploadButnStyle = `
        ${classes.uploadButton} ${isNotEmpty(enteredFileName) ? "enable" : "disabled"}
    `;

   function handleFileNameChange(e) {
      setEnteredFileName(e.target.value);
      !!error && setError("");
   }

   function handleFileChange(imageList) {
      !!error && setError("");

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
            setError("Only PDF , PNG , CSV & JPEG formats are supported!");
            return;
         }
      }

      if (uploadImmediately) {
         setLoaderUpload(true);
         ImgUploader(Array.from(imageList), false).then((uploadedFile) => {
            setLoaderUpload(false);
            const _fileExists = uniqueImages.includes(uploadedFile?.name);

            if (_fileExists) {
               setError("This file exists!");
               return;
            }
            setImages((prevState) => prevState.concat(uploadedFile));
            handleFilePass(uploadedFile);
         });
         !!enteredFileName && setEnteredFileName("");
      } else {
         if (uploadOnlyOneFile) {
            setImages(Array.from(imageList));
         } else {
            setImages((prevState) => prevState.concat(Array.from(imageList)));
         }
         !!enteredFileName && setEnteredFileName("");
      }
   }

   function handleFileDelete(file) {
      if (uploadImmediately) {
         handleFileRemove && handleFileRemove(file.id);
      } else {
         setImages(uniqueImages.filter((image) => image.name !== file.name));
      }
   }

   return (
      <div>
         {uploadOnlyOneFile ? (
            <div>
               <ReactFileReader handleFiles={handleFileChange}>
                  <label className={classes.uploadOneFileStyle}>Upload Signature</label>
               </ReactFileReader>
               <p className={classes.errorStyle}>{error}</p>
            </div>
         ) : (
            <div>
               <div className={classes.fileTypeInput}>
                  <ValidationInput
                     onChange={handleFileNameChange}
                     value={enteredFileName}
                     variant={"outlined"}
                     name={"fileName"}
                     type={"text"}
                     placeholder={"File Type*"}
                     errorFalse={error}
                  />
                  <ReactFileReader
                     disabled={!isNotEmpty(enteredFileName)}
                     handleFiles={handleFileChange}
                  >
                     <label className={uploadButnStyle}>Upload a file</label>
                  </ReactFileReader>
               </div>
               <p className={classes.errorStyle}>{error}</p>
               <p className={classes.authorizationFileSubTitle}>uploaded files</p>
            </div>
         )}
         <div className={fileCardContainerStyle}>
            {!!uniqueImages.length ? (
               uniqueImages
                  .reverse()
                  .map((item, index) => (
                     <UploadedFileCard
                        key={index}
                        file={item}
                        deleteFile={handleFileDelete}
                        handleFilePass={handleFilePass}
                        uploadOnlyOneFile={uploadOnlyOneFile}
                        changeNameAfterFileUpload={changeNameAfterFileUpload}
                        fileName={fileName}
                        passCurrentFileName={(currentFileName) =>
                           setFileName(currentFileName)
                        }
                        uploadLoading={loaderUpload || fileLoader}
                        uploadImmediately={uploadImmediately}
                     />
                  ))
            ) : uploadOnlyOneFile ? null : (
               <div className={classes.iconText}>
                  <img src={Images.fileIcon} alt="" />
                  <p className={classes.noFilesYetTextStyle}>No Files yet</p>
               </div>
            )}
         </div>
      </div>
   );
};
