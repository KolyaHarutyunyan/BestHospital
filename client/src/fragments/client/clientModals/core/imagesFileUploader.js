import React from "react";
import { fileUploadersStyle } from "./styles";
import { ValidationInput } from "@eachbase/components";
import { getLimitedVal, Images, isNotEmpty } from "@eachbase/utils";
import { checkFileType } from "./constants";

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
            <div>
               <input
                  disabled={!isNotEmpty(fileName)}
                  onChange={handleChangeFile}
                  type="file"
                  id="BtnBrowseHidden"
                  name="files"
                  style={{ display: "none" }}
               />
               <label htmlFor="BtnBrowseHidden" id="LblBrowse">
                  <div className={uploadButnStyle}>
                     <span>Upload a file</span>
                  </div>
               </label>
            </div>
         </div>
         <p className={classes.authorizationFileSubTitle}>uploaded files</p>
         <div className={!uploadedFiles ? classes.centered : classes.normal}>
            <div className={!uploadedFiles.length ? classes.centered : classes.normal}>
               {uploadedFiles.length ? (
                  uploadedFiles.map((item, index) => {
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
