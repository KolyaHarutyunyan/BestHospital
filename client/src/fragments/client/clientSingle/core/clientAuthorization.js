import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
   AddButtonLight,
   Card,
   DeleteElement,
   ImagesFileUploader,
   Loader,
   ModalContentWrapper,
   NoItemText,
   SimpleModal,
} from "@eachbase/components";
import { serviceSingleStyles } from "./styles";
import { Colors, FindLoad, FindSuccess, Images } from "@eachbase/utils";
import { clientActions, httpRequestsOnSuccessActions } from "@eachbase/store";
import { AddAuthorization, AddAuthorizationService } from "../../clientModals";
import { AuthHeader } from "@eachbase/components/headers/auth/authHeader";
import { ClientAuthServiceTable } from "./common";

export const ClientAuthorization = ({ info }) => {
   const classes = serviceSingleStyles();

   const params = useParams();

   const dispatch = useDispatch();

   const services = useSelector((state) => state.client.clientsAuthorizationsServices);

   const [delEdit, setDelEdit] = useState(null);
   const [toggleModal, setToggleModal] = useState(false);
   const [toggleModal2, setToggleModal2] = useState(false);
   const [modalIsOpen, setModalIsOpen] = useState(false);
   const [authIndex, setAuthIndex] = useState(0);
   const [enteredFileName, setEnteredFileName] = useState("");
   const [currentFileId, setCurrentFileId] = useState("");
   const [chosenFile, setChosenFile] = useState();

   const success = FindSuccess("DELETE_CLIENT_AUTHORIZATION");
   const loader = FindLoad("GET_CLIENT_AUTHORIZATION_SERV");
   const delAuthLoader = FindLoad("DELETE_CLIENT_AUTHORIZATION");
   const sendFilesLoader = FindLoad("ADD_FILES_TO_CLIENT_AUTH");
   const removeFilesLoader = FindLoad("REMOVE_FILES_FROM_CLIENT_AUTH");
   const editFileNameLoader = FindLoad("EDIT_FILE_NAME_OF_CLIENT_AUTH");

   const fileUploadLoader =
      !!sendFilesLoader.length ||
      !!removeFilesLoader.length ||
      !!editFileNameLoader.length;

   const clientAuthFiles = info[authIndex]?.documents?.map((document) => ({
      ...document.file,
      _id: document._id,
      fileName: document.name,
   }));

   useEffect(() => {
      if (info) {
         dispatch(clientActions.getClientsAuthorizationsServ(info[authIndex].id));
      }
   }, [info, authIndex]);

   useEffect(() => {
      if (!!success.length) {
         setToggleModal(false);
         dispatch(
            httpRequestsOnSuccessActions.removeSuccess("DELETE_CLIENT_AUTHORIZATION")
         );
      }
   }, [success]);

   useEffect(() => {
      if (!!currentFileId) {
         dispatch(
            clientActions.editFileNameOfClientAuth(
               info[authIndex].id,
               currentFileId,
               enteredFileName
            )
         );
         setCurrentFileId("");
      }
   }, [currentFileId]);

   useEffect(() => {
      if (!!chosenFile) {
         const fileData = {
            file: chosenFile,
            name: enteredFileName,
         };
         dispatch(clientActions.addFilesToClientAuth(info[authIndex].id, fileData));
         setChosenFile("");
         setEnteredFileName("");
      }
   }, [chosenFile]);

   function handleFileRemove(fileId) {
      dispatch(clientActions.removeFilesFromClientAuth(info[authIndex].id, fileId));
   }

   function deleteAuthorization() {
      dispatch(clientActions.deleteClientsAuthorization(info[authIndex].id, params.id));
      setAuthIndex(0);
   }

   const fileModalUpperContent = (
      <p className={classes.contentStyle}>
         <span className={`${classes.contentIconStyle} starIcon`}>*</span>
         Only
         <span className={classes.contentIconStyle}> PDF , PNG , CSV </span>&
         <span className={classes.contentIconStyle}> JPEG </span>
         formats are supported
      </p>
   );

   return (
      <div className={classes.staffGeneralWrapper}>
         <SimpleModal
            handleOpenClose={() => setToggleModal((prevState) => !prevState)}
            openDefault={toggleModal}
            content={
               delEdit ? (
                  <AddAuthorization
                     fundingId={info[authIndex]?.funderId?._id}
                     info={info[authIndex]}
                     handleClose={() => setToggleModal(false)}
                  />
               ) : (
                  <DeleteElement
                     loader={!!delAuthLoader.length}
                     info={`Delete ${info[authIndex].authId}`}
                     handleClose={() => setToggleModal(false)}
                     handleDel={deleteAuthorization}
                  />
               )
            }
         />
         <SimpleModal
            handleOpenClose={() => setToggleModal2((prevState) => !prevState)}
            openDefault={toggleModal2}
            content={
               <AddAuthorizationService
                  authId={info[authIndex]?.id}
                  handleClose={() => setToggleModal2(false)}
                  fundingId={info[authIndex].funderId?._id}
               />
            }
         />
         <SimpleModal
            handleOpenClose={() => setModalIsOpen((prevState) => !prevState)}
            openDefault={modalIsOpen}
            content={
               <ModalContentWrapper
                  onClose={() => setModalIsOpen(false)}
                  titleContent={"Uploaded files"}
                  subtitleContent={"Please fulfill the file type to upload a file."}
                  content={fileModalUpperContent}
               >
                  <ImagesFileUploader
                     uploadedFiles={clientAuthFiles}
                     uploadedFileName={enteredFileName}
                     changeNameAfterFileUpload={true}
                     uploadImmediately={true}
                     handleFilePass={(file) => setChosenFile(file)}
                     handleFileNamePass={(fileName) => setEnteredFileName(fileName)}
                     handleChangedFileNamePass={(changedFileName) =>
                        setEnteredFileName(changedFileName)
                     }
                     handleFileIdPass={(fileId) => setCurrentFileId(fileId)}
                     fileLoader={fileUploadLoader}
                     handleFileRemove={handleFileRemove}
                  />
               </ModalContentWrapper>
            }
         />
         <Card
            width="234px"
            cardInfo={info}
            showHeader={true}
            hideHeaderLine={false}
            title="Authentications"
            color={Colors.ThemeRed}
            icon={Images.authIconGen}
            auth={true}
            active={authIndex}
            click={setAuthIndex}
         />
         <div className={classes.clearBoth} />
         <div className={classes.notesWrap}>
            <AuthHeader
               modalIsOpen={modalIsOpen}
               openModal={() => setModalIsOpen(true)}
               setDelEdit={setDelEdit}
               info={info[authIndex]}
               setToggleModal={setToggleModal}
               toggleModal={toggleModal}
            />
            <div className={classes.authServiceContainerStyle}>
               <div className={classes.authorizationServices}>
                  <p className={classes.authorizationServicesTitle}>
                     Authorization Services
                  </p>
                  <AddButtonLight
                     addButnLightClassName={classes.addAuthServiceButnStyle}
                     addButnLightInnerText={"Add Authorized Service"}
                     onAddButnLightClick={() => setToggleModal2(true)}
                  />
               </div>
               {!!loader.length ? (
                  <Loader height={"200px"} circleSize={50} />
               ) : !!services && !!services.length ? (
                  <ClientAuthServiceTable
                     authServices={services}
                     authId={info[authIndex].id}
                     fundingId={info[authIndex].funderId?._id}
                  />
               ) : (
                  <NoItemText text={"No Authorization Services Yet"} />
               )}
            </div>
         </div>
      </div>
   );
};
