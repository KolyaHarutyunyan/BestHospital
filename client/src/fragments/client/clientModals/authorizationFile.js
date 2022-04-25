import React, { useEffect, useState } from "react";
import { createClientStyle } from "../index";
import { ImagesFileUploader } from "./core";
import { FindLoad, FindSuccess } from "@eachbase/utils";
import { AddModalButton } from "@eachbase/components";
import { useDispatch } from "react-redux";
import { uploadActions } from "@eachbase/store";

export const AuthorizationFile = ({
   fileIsForPayment = false,
   fileId,
   handleClose,
   uploadedFiles = [],
}) => {
   const classes = createClientStyle();

   const dispatch = useDispatch();
   
   const [fileName, setFileName] = useState("");
   const [selectedFile, setSelectedFile] = useState();
   const [another, setAnother] = useState("");
   const [anotherId, setAnotherId] = useState("");
   const [info, setInfo] = useState("");
   const [progress, setProgress] = useState(10);

   const handleChange = (e) => setFileName(e.target.value);
   const handleSubmit = () => handleClose && handleClose();

   const success = FindSuccess("CREATE_UPLOAD");
   const createLoader = FindLoad("CREATE_UPLOAD");
   const getLoader = FindLoad("GET_UPLOADS");

   useEffect(() => {
      if (success) {
         setFileName("");
         setSelectedFile("");
      }
   }, [success.length]);

   useEffect(() => {
      dispatch(uploadActions.getUpload(fileId));
   }, []);

   const handleChangeFile = (event) => {
      const createInfo = {
         resource: fileId,
         type: fileName,
      };
      setSelectedFile(event.target.files[0]);
      dispatch(uploadActions.createUpload(event.target.files[0], createInfo));
   };

   useEffect(() => {
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
      dispatch(uploadActions.delUpload(id, fileId));
   };

   const handleChangeFileName = (e, id, item) => {
      setAnother(e.target.value);
      setAnotherId(id);
      setInfo(item);
   };

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
         dispatch(uploadActions.editUpload(date, anotherId, fileId));
      }
   };

   if (fileIsForPayment) {
      return (
         <ImagesFileUploader
            handleChange={handleChange}
            handleChangeType={handleChangeType}
            handleChangeFile={handleChangeFile}
            handleChangeFileName={handleChangeFileName}
            deleteItem={deleteItem}
            fileName={fileName}
            error={true}
            getLoader={getLoader}
            createLoader={createLoader}
            uploadedFiles={uploadedFiles}
            selectedFile={selectedFile}
            another={another}
            anotherId={anotherId}
            progress={progress}
         />
      );
   }

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
         <ImagesFileUploader
            handleChange={handleChange}
            handleChangeType={handleChangeType}
            handleChangeFile={handleChangeFile}
            handleChangeFileName={handleChangeFileName}
            deleteItem={deleteItem}
            fileName={fileName}
            error={true}
            getLoader={getLoader}
            createLoader={createLoader}
            uploadedFiles={uploadedFiles}
            selectedFile={selectedFile}
            another={another}
            anotherId={anotherId}
            progress={progress}
         />
         <AddModalButton handleClick={handleSubmit} text="Done" />
      </div>
   );
};
