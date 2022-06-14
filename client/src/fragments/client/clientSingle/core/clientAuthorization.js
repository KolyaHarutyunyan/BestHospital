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
   Notes,
   SimpleModal,
   TableBodyComponent,
} from "@eachbase/components";
import { serviceSingleStyles } from "./styles";
import { Colors, FindLoad, FindSuccess, Images, makeCapitalize } from "@eachbase/utils";
import { CircularProgress, TableCell } from "@material-ui/core";
import { clientActions, httpRequestsOnSuccessActions } from "@eachbase/store";
import { AddAuthorization, AddAuthorizationService } from "../../clientModals";
import { AuthHeader } from "@eachbase/components/headers/auth/authHeader";
import { headerTitles } from "./constants";

export const ClientAuthorization = ({ info, setAuthActive, setAuthItemIndex }) => {
   const classes = serviceSingleStyles();

   const params = useParams();

   const dispatch = useDispatch();

   const services = useSelector((state) => state.client.clientsAuthorizationsServices);

   const [delEdit, setDelEdit] = useState(null);
   const [delEdit2, setDelEdit2] = useState(null);
   const [toggleModal, setToggleModal] = useState(false);
   const [toggleModal2, setToggleModal2] = useState(false);
   const [toggleModal3, setToggleModal3] = useState(false);
   const [modalIsOpen, setModalIsOpen] = useState(false);
   const [authIndex, setAuthIndex] = useState(0);
   const [serviceIndex, setServiceIndex] = useState(null);
   const [enteredFileName, setEnteredFileName] = useState("");
   const [currentFileId, setCurrentFileId] = useState("");

   const [chosenFile, setChosenFile] = useState();

   const success = FindSuccess("DELETE_CLIENT_AUTHORIZATION");
   const successDelServ = FindSuccess("DELETE_CLIENT_AUTHORIZATION_SERV");
   const loader = FindLoad("GET_CLIENT_AUTHORIZATION_SERV");
   const delAuthLoader = FindLoad("DELETE_CLIENT_AUTHORIZATION");
   const delAuthServLoader = FindLoad("DELETE_CLIENT_AUTHORIZATION_SERV");
   const sendFilesLoader = FindLoad("ADD_FILES_TO_CLIENT_AUTH");
   const removeFilesLoader = FindLoad("REMOVE_FILES_FROM_CLIENT_AUTH");

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
      if (!!successDelServ.length) {
         setToggleModal3(false);
         dispatch(
            httpRequestsOnSuccessActions.removeSuccess("DELETE_CLIENT_AUTHORIZATION_SERV")
         );
      }
   }, [successDelServ]);

   useEffect(() => {
      if (currentFileId) {
         dispatch(
            clientActions.editFileNameOfClientAuth(
               info[authIndex].id,
               currentFileId,
               enteredFileName
            )
         );
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

   const _uploadedFiles = info[authIndex]?.documents?.map((document) => ({
      ...document.file,
      fileName: document.name,
   }));

   function deleteAuthorization() {
      dispatch(clientActions.deleteClientsAuthorization(info[authIndex].id, params.id));
      setAuthIndex(0);
   }

   function deleteAuthorizationServ() {
      dispatch(
         clientActions.deleteClientsAuthorizationServ(
            services[serviceIndex].id,
            info[authIndex].id
         )
      );
   }

   function clientAuthorizationServiceItem(item, index) {
      return (
         <TableBodyComponent
            key={index}
            handleClick={() => {
               setAuthItemIndex(index);
               setAuthActive(true);
            }}
         >
            <TableCell>
               <p className={classes.tableName}>
                  {makeCapitalize(item?.serviceId?.name)}
               </p>
            </TableCell>
            <TableCell>
               {" "}
               {item.modifiers && item.modifiers.length > 0 ? (
                  <span>
                     {" "}
                     {`${
                        item &&
                        item.modifiers &&
                        item.modifiers.map((i) => makeCapitalize(i.name))
                     }, `}
                  </span>
               ) : (
                  item && item.modifiers && makeCapitalize(item.modifiers[0].name)
               )}
            </TableCell>
            <TableCell> {item?.total} </TableCell>
            <TableCell> {item?.completed} </TableCell>
            <TableCell> {item && item.total - item.completed} </TableCell>
            <TableCell>
               <div className={classes.sircule}>
                  <p>{item && item.completed / item.total}%</p>
                  <CircularProgress
                     variant="determinate"
                     value={item && item.completed / item.total}
                  />
               </div>
            </TableCell>
            <TableCell>
               <>
                  <img
                     src={Images.edit}
                     alt="edit"
                     className={classes.iconStyle}
                     onClick={(e) => {
                        e.stopPropagation();
                        setDelEdit2(true);
                        setToggleModal3(true);
                        setServiceIndex(index);
                     }}
                  />
                  <img
                     src={Images.remove}
                     alt="delete"
                     className={classes.iconDeleteStyle}
                     onClick={(e) => {
                        e.stopPropagation();
                        setDelEdit2(false);
                        setToggleModal3(true);
                        setServiceIndex(index);
                     }}
                  />
               </>
            </TableCell>
         </TableBodyComponent>
      );
   }

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
            handleOpenClose={() => setToggleModal3((prevState) => !prevState)}
            openDefault={toggleModal3}
            content={
               delEdit2 ? (
                  <AddAuthorizationService
                     info={services && services[serviceIndex]}
                     authId={info[authIndex].id}
                     handleClose={() => setToggleModal3(false)}
                     fundingId={info[authIndex].funderId?._id}
                  />
               ) : (
                  <DeleteElement
                     loader={!!delAuthServLoader.length}
                     info={`Delete ${
                        services && services[serviceIndex]?.serviceId?.name
                     }`}
                     handleClose={() => setToggleModal3(false)}
                     handleDel={deleteAuthorizationServ}
                  />
               )
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
                  content={
                     <p className={classes.contentStyle}>
                        <span className={`${classes.contentIconStyle} starIcon`}>*</span>
                        Only
                        <span className={classes.contentIconStyle}>
                           {" "}
                           PDF , PNG , CSV{" "}
                        </span>
                        &<span className={classes.contentIconStyle}> JPEG </span>
                        formats are supported
                     </p>
                  }
               >
                  <ImagesFileUploader
                     uploadedFiles={_uploadedFiles}
                     changeNameAfterFileUpload={true}
                     uploadImmediately={true}
                     handleFilePass={(file) => setChosenFile(file)}
                     handleFileNamePass={(fileName) => setEnteredFileName(fileName)}
                     handleFileIdPass={(fileId) => setCurrentFileId(fileId)}
                     fileLoader={!!sendFilesLoader.length || !!removeFilesLoader.length}
                     handleFileRemove={(fileId) =>
                        dispatch(
                           clientActions.removeFilesFromClientAuth(
                              info[authIndex].id,
                              fileId
                           )
                        )
                     }
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
               <Loader />
            ) : !!services && !!services.length ? (
               <Notes
                  restHeight="560px"
                  data={services}
                  items={clientAuthorizationServiceItem}
                  headerTitles={headerTitles}
                  defaultStyle={true}
               />
            ) : (
               <NoItemText text={"No Authorization Services Yet"} />
            )}
         </div>
      </div>
   );
};
