import React, { useEffect, useRef, useState } from "react";
import { checkFileType, checkImmediatelyUploadedFileType } from "./constants";
import { getLimitedVal, Images, isNotEmpty } from "@eachbase/utils";
import { imagesFileUploaderCoreStyle } from "./styles";
import { DownloadLink, Loader } from "@eachbase/components";

export const UploadedFileCard = ({
   file,
   deleteFile,
   handleFilePass,
   uploadOnlyOneFile,
   changeNameAfterFileUpload,
   fileName,
   passCurrentFileName,
   uploadLoding,
   uploadImmediately,
}) => {
   const classes = imagesFileUploaderCoreStyle();

   const fileNameDetailsStyle = `${classes.fileNameDetailsStyle} ${
      uploadOnlyOneFile ? "singleFile" : ""
   }`;
   const downloadLinkStyle = `${classes.downloadLinkStyle} ${
      uploadOnlyOneFile ? "linkPosition" : ""
   }`;

   const _imageURL = file?.url || URL.createObjectURL(file);

   const typeDisplay = uploadImmediately
      ? checkImmediatelyUploadedFileType(file?.name)
      : checkFileType(file?.type);

   const [change, setChange] = useState(false);
   const [wasChanged, setWasChanged] = useState(false);
   const [currentFileName, setCurrentFileName] = useState(
      uploadImmediately ? file?.fileName : fileName
   );

   const fileNameInputRef = useRef(null);

   useEffect(() => {
      if (change) {
         fileNameInputRef.current.focus();
      } else {
         if (wasChanged) {
            if (uploadImmediately) {
               handleFilePass(file);
            }
            passCurrentFileName(currentFileName);
         }
      }
   }, [change, wasChanged]);

   function changeFileNameHandler(e) {
      setCurrentFileName(e.target.value);
      setWasChanged(true);
   }

   function blurFileNameHandler() {
      if (!isNotEmpty(currentFileName)) {
         setCurrentFileName(fileName);
      }
      setChange(false);
   }

   if (uploadLoding) {
      return <Loader circleSize={30} />;
   }

   return (
      <div className={classes.fileRow}>
         <div className={classes.fileDetailsBoxStyle}>
            <div className={classes.imageContainer}>
               <div>
                  {typeDisplay}
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
         {/* {uploadLoding ? (
            <Loader circleSize={20} />
         ) : ( */}
         <DownloadLink
            linkClassName={downloadLinkStyle}
            linkHref={_imageURL}
            linkDownload={true}
         />
         {/* )} */}
      </div>
   );
};
