import React, { useEffect, useState } from "react";
import { createClientStyle } from "../index";
import { FindLoad, FindSuccess, Images } from "@eachbase/utils";
import {
   AddButton,
   AddModalButton,
   Loader,
   ValidationInput,
} from "@eachbase/components";

import { useDispatch, useSelector } from "react-redux";
import { uploadActions } from "@eachbase/store";
import { useParams } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { CircularProgress } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const credentialBtn = {
   maxWidth: 192,
   width: "100%",
   marginLeft: 16,
   height: 48,
};

export const AuthorizationFile = ({
   authenticationsId,
   handleClose,
   uploadedFiles,
}) => {
   const classes = createClientStyle();

   const dispatch = useDispatch();
   const [fileName, setFileName] = useState("");
   const [fileBack, setFileBack] = useState(
      uploadedFiles ? [...uploadedFiles] : []
   );

   const [selectedFile, setSelectedFile] = useState();

   const [another, setAnother] = useState("");
   const [anotherId, setAnotherId] = useState("");
   const [info, setInfo] = useState("");

   const handleChange = (e) => {
      setFileName(e.target.value);
   };

   const hiddenFileInput = React.useRef(null);

   const handleSubmit = () => {
      handleClose && handleClose();
   };

   const success = FindSuccess("CREATE_UPLOAD");

   useEffect(() => {
      if (success) {
         setFileName("");
         setSelectedFile("");
      }
   }, [success.length]);

   useEffect(() => {
      dispatch(uploadActions.getUpload(authenticationsId));
   }, []);

   const handleChangeFile = (event) => {
      const createInfo = {
         resource: authenticationsId,
         type: fileName,
      };
      setSelectedFile(event.target.files[0]);
      dispatch(uploadActions.createUpload(event.target.files[0], createInfo));
   };

   const checkFileType = (uploadedFileType) => {
      if (uploadedFileType === "application/pdf") {
         return <img src={Images.pdfIcon} alt="pdf" />;
      } else if (uploadedFileType === "image/jpeg") {
         return <img src={Images.jpegIcon} alt="jpeg" />;
      } else if (uploadedFileType === "image/png") {
         return <img src={Images.pngIcon} alt="png" />;
      } else if (uploadedFileType === "text/csv") {
         return <img src={Images.csvIcon} alt="csv" />;
      } else {
      }
   };

   const createLoader = FindLoad("CREATE_UPLOAD");
   const getLoader = FindLoad("GET_UPLOADS");

   const [progress, setProgress] = React.useState(10);

   function CircularProgressWithLabel(props) {
      return (
         <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
               sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
               }}
            >
               <Typography
                  className={classes.percentage}
                  variant="caption"
                  component="div"
                  color="secondary"
               >
                  {`${Math.round(props.value)}%`}
               </Typography>
            </Box>
         </Box>
      );
   }

   React.useEffect(() => {
      if (createLoader) {
         const timer = setInterval(() => {
            setProgress((prevProgress) =>
               prevProgress >= 100 ? 0 : prevProgress + 10
            );
         }, 800);
         return () => {
            clearInterval(timer);
         };
      }
   }, [createLoader.length]);

   const deleteItem = (id) => {
      dispatch(uploadActions.delUpload(id, authenticationsId));
   };

   const handleChangeFileName = (e, id, item) => {
      setAnother(e.target.value);
      setAnotherId(id);
      setInfo(item);
   };
   const params = useParams();

   const changeFile = FindSuccess("EDIT_UPLOAD");
   useEffect(() => {
      if (changeFile) {
         setAnotherId("");
         setAnother("");
         setInfo("");
      }
   }, [changeFile.length]);

   const handleChangeType = () => {
      if (another) {
         const date = {
            type: another,
            url: info.url,
            mimetype: info.mimetype,
            size: info.size,
            name: info.name,
         };
         dispatch(uploadActions.editUpload(date, anotherId, authenticationsId));
      }
   };

   return (
      <div className={classes.authorizationFileWrapper}>
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
         <div className={classes.fileTypeInput}>
            <ValidationInput
               onChange={(e) => handleChange(e)}
               value={fileName}
               variant={"outlined"}
               name={"fileType"}
               type={"text"}
               placeholder={"File Type*"}
               errorFalse={true}
            />

            <div>
               <input
                  disabled={!fileName}
                  onChange={handleChangeFile}
                  type="file"
                  id="BtnBrowseHidden"
                  name="files"
                  style={{ display: "none" }}
               />

               <label htmlFor="BtnBrowseHidden" id="LblBrowse">
                  <div
                     style={
                        fileName ? {} : { background: "rgba(52,122,240,.5)" }
                     }
                     className={classes.uploadButton}
                  >
                     <img src={Images.addCircle} alt={"icon"} />
                     <span>Upload a file</span>
                  </div>
               </label>
            </div>

            {/*<input*/}
            {/*    hidden*/}
            {/*    type="file"*/}
            {/*    ref={hiddenFileInput}*/}
            {/*    onChange={handleChangeFile}*/}
            {/*/>*/}
            {/*<AddButton*/}
            {/*    styles={credentialBtn}*/}
            {/*    disabled={!fileName}*/}
            {/*    text='Upload a file'*/}
            {/*    handleClick={handleClick}*/}
            {/*/>*/}
         </div>
         <p className={classes.authorizationFileSubTitle}>uploaded files</p>

         <div className={!uploadedFiles ? classes.centered : classes.normal}>
            {getLoader.length ? (
               <Loader height={"29.8vh"} />
            ) : (
               <div
                  className={
                     !uploadedFiles.length ? classes.centered : classes.normal
                  }
               >
                  {createLoader.length ? (
                     <div className={classes.fileRow}>
                        <div className={classes.imageContainer}>
                           <div>
                              <CircularProgressWithLabel value={progress} />
                              {/*<p className={classes.fileSize}>{item.size}</p>*/}
                           </div>
                        </div>
                        <div className={classes.fileInput}>
                           <p className={classes.fileName}>
                              {selectedFile?.name}
                           </p>
                           <ValidationInput
                              onChange={handleChange}
                              className={classes.fileNameInput}
                              value={fileName}
                              variant={"outlined"}
                              name={"type"}
                              type={"text"}
                              placeholder={"File Type*"}
                              errorFalse={true}
                           />
                        </div>
                        <img
                           src={Images.download}
                           className={classes.downloadIcon}
                           alt="download"
                        />
                     </div>
                  ) : (
                     ""
                  )}
                  {uploadedFiles.length ? (
                     uploadedFiles &&
                     uploadedFiles.map((item, index) => {
                        return (
                           <div key={index} className={classes.fileRow}>
                              <div className={classes.imageContainer}>
                                 <div>
                                    {checkFileType(item.mimetype)}
                                    <p className={classes.fileSize}>
                                       {item.size}
                                    </p>
                                    <img
                                       onClick={() => deleteItem(item.id)}
                                       src={Images.removeIcon}
                                       alt="removeIcon"
                                       className={classes.removeIcon}
                                    />
                                 </div>
                              </div>
                              <div className={classes.fileInput}>
                                 <p className={classes.fileName}>{item.name}</p>
                                 <ValidationInput
                                    handleBlur={() => handleChangeType()}
                                    onChange={(e) => {
                                       handleChangeFileName(e, item.id, item);
                                    }}
                                    className={classes.fileNameInput}
                                    value={
                                       another
                                          ? anotherId === item.id
                                             ? another
                                             : item.type
                                          : item.type
                                    }
                                    variant={"outlined"}
                                    name={"type"}
                                    type={"text"}
                                    placeholder={"File Type*"}
                                    errorFalse={true}
                                 />
                              </div>
                              <a href={item.url} target={"_blank"} download>
                                 <img
                                    src={Images.download}
                                    className={classes.downloadIcon}
                                    alt="download"
                                 />
                              </a>
                           </div>
                        );
                     })
                  ) : (
                     <div className={classes.iconText}>
                        <img src={Images.fileIcon} alt="" />
                        <p>No File yet</p>
                     </div>
                  )}
               </div>
            )}
         </div>
         <AddModalButton handleClick={handleSubmit} text="Done" />
      </div>
   );
};
