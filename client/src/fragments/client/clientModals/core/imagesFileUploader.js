import React from "react";
import { fileUploadersStyle } from "./styles";
import { DownloadLink, ValidationInput } from "@eachbase/components";
import { getLimitedVal, Images, isNotEmpty } from "@eachbase/utils";
import { checkFileType } from "./constants";
import ReactFileReader from "react-file-reader";

export const ImagesFileUploader = ({
   uploadedFiles = [],
   handleChange,
   handleChangeFile,
   deleteItem,
   fileName,
   error = false,
}) => {
   const classes = fileUploadersStyle();

   const uploadButnStyle = `
        ${classes.uploadButton} ${isNotEmpty(fileName) ? "enable" : "disabled"}
    `;

   return (
      <>
         <div className={classes.fileTypeInput}>
            <ValidationInput
               onChange={handleChange}
               value={fileName}
               variant={"outlined"}
               name={"fileName"}
               type={"text"}
               placeholder={"File Type*"}
               errorFalse={error}
            />
            <ReactFileReader
               disabled={!isNotEmpty(fileName)}
               handleFiles={handleChangeFile}
            >
               <label className={uploadButnStyle}>Upload a file</label>
            </ReactFileReader>
         </div>
         <p className={classes.errorStyle}>{error}</p>
         <p className={classes.authorizationFileSubTitle}>uploaded files</p>
         <div className={!uploadedFiles ? classes.centered : classes.normal}>
            <div className={!uploadedFiles.length ? classes.centered : classes.normal}>
               {uploadedFiles.length ? (
                  uploadedFiles.map((item, index) => {
                     const _imageURL = URL.createObjectURL(item);

                     return (
                        <div key={index} className={classes.fileRow}>
                           <div className={classes.imageContainer}>
                              <div>
                                 {checkFileType(item.type)}
                                 <p className={classes.fileSize}>{item.size}</p>
                                 <img
                                    onClick={() => deleteItem(item.name)}
                                    src={Images.removeIcon}
                                    alt="removeIcon"
                                    className={classes.removeIcon}
                                 />
                              </div>
                           </div>
                           <div className={classes.fileInput}>
                              <p className={classes.fileName}>
                                 {getLimitedVal(item.name, 30)}
                              </p>
                           </div>
                           <DownloadLink linkHref={_imageURL} linkDownload={true} />
                        </div>
                     );
                  })
               ) : (
                  <div className={classes.iconText}>
                     <img src={Images.fileIcon} alt="" />
                     <p>No Files yet</p>
                  </div>
               )}
            </div>
         </div>
      </>
   );
};
