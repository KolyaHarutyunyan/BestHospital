import React, { useEffect, useRef, useState } from "react";
import { checkFileType, checkImmediatelyUploadedFileType } from "./constants";
import { getLimitedVal, Images, isNotEmpty } from "@eachbase/utils";
import { imagesFileUploaderCoreStyle } from "./styles";
import { DownloadLink } from "@eachbase/components";

export const UploadedFileCard = ({
   file,
   deleteFile,
   uploadOnlyOneFile,
   changeNameAfterFileUpload,
   fileName,
   passCurrentFileName,
   passCurrentFileId,
   uploadImmediately,
}) => {
   const classes = imagesFileUploaderCoreStyle();

   const fileNameInputRef = useRef(null);

   const fileNameDetailsStyle = `${classes.fileNameDetailsStyle} ${
      uploadOnlyOneFile ? "singleFile" : ""
   }`;
   const downloadLinkStyle = `${classes.downloadLinkStyle} ${
      uploadOnlyOneFile ? "linkPosition" : ""
   }`;

   const _imageURL = file?.url || URL.createObjectURL(file);

   const _typeDisplay = uploadImmediately
      ? checkImmediatelyUploadedFileType(file?.name)
      : checkFileType(file?.type);

   const _uploadedFileName = uploadImmediately ? file?.fileName : fileName;

   const [change, setChange] = useState(false);
   const [wasChanged, setWasChanged] = useState(false);
   const [currentFileName, setCurrentFileName] = useState(fileName);

   useEffect(() => {
      if (uploadImmediately) {
         setCurrentFileName(file?.fileName);
      }
   }, [file]);

   useEffect(() => {
      if (change) {
         fileNameInputRef.current.focus();
      } else {
         if (wasChanged) {
            passCurrentFileName && passCurrentFileName(currentFileName);
            passCurrentFileId && passCurrentFileId(file._id);
         }
      }
   }, [change, wasChanged]);

   function changeFileNameHandler(e) {
      setCurrentFileName(e.target.value);
      setWasChanged(true);
   }

   function blurFileNameHandler() {
      if (!isNotEmpty(currentFileName)) {
         setCurrentFileName(_uploadedFileName);
      } else {
         setChange(false);
      }
   }

   return (
      <div className={classes.fileRow}>
         <div className={classes.fileDetailsBoxStyle}>
            <div className={classes.imageContainer}>
               <div>
                  {_typeDisplay}
                  <p className={classes.fileSize}>{file.size}</p>
                  <img
                     onClick={() => deleteFile(file)}
                     src={Images.removeIcon}
                     alt="removeIcon"
                     className={classes.removeIcon}
                  />
               </div>
            </div>
            <div className={fileNameDetailsStyle}>
               <p className={classes.fileName}>{getLimitedVal(file.name, 30)}</p>
               {changeNameAfterFileUpload && (
                  <div className={classes.fileNameInputBoxStyle}>
                     {change ? (
                        <input
                           ref={fileNameInputRef}
                           type="text"
                           className={classes.fileNameInputStyle}
                           value={currentFileName}
                           onChange={changeFileNameHandler}
                           onBlur={blurFileNameHandler}
                        />
                     ) : (
                        <p
                           className={classes.fileNameStyle}
                           onClick={() => setChange(true)}
                        >
                           {currentFileName}
                        </p>
                     )}
                  </div>
               )}
            </div>
         </div>
         <DownloadLink
            linkClassName={downloadLinkStyle}
            linkHref={_imageURL}
            linkDownload={true}
         />
      </div>
   );
};
