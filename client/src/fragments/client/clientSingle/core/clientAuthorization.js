import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
   AddModalButton,
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
import { Colors, FindLoad, FindSuccess, Images, ImgUploader } from "@eachbase/utils";
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
   const [chosenImages, setChosenImages] = useState([]);
   const [enteredFileName, setEnteredFileName] = useState("");
   const [loaderUpload, setLoaderUpload] = useState(false);

   const success = FindSuccess("DELETE_CLIENT_AUTHORIZATION");
   const successDelServ = FindSuccess("DELETE_CLIENT_AUTHORIZATION_SERV");
   const loader = FindLoad("GET_CLIENT_AUTHORIZATION_SERV");
   const delAuthLoader = FindLoad("DELETE_CLIENT_AUTHORIZATION");
   const delAuthServLoader = FindLoad("DELETE_CLIENT_AUTHORIZATION_SERV");
   const sendFilesSuccess = FindSuccess("ADD_FILES_TO_CLIENT_AUTH");
   const sendFilesLoader = FindLoad("ADD_FILES_TO_CLIENT_AUTH");

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
      if (!!sendFilesSuccess.length) {
         setModalIsOpen(false);
         dispatch(httpRequestsOnSuccessActions.removeSuccess("ADD_FILES_TO_CLIENT_AUTH"));
      }
   }, [sendFilesSuccess]);

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
               <p className={classes.tableName}>{item?.serviceId?.name}</p>
            </TableCell>
            <TableCell>
               {" "}
               {item.modifiers && item.modifiers.length > 0 ? (
                  <span>
                     {" "}
                     {`${item && item.modifiers && item.modifiers.map((i) => i.name)}, `}
                  </span>
               ) : (
                  item && item.modifiers && item.modifiers[0].name
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
                  {/*<img src={Images.edit} alt="edit" className={classes.iconStyle}*/}
                  {/*     onClick={(e) => {*/}
                  {/*         e.stopPropagation()*/}
                  {/*         setDelEdit2(true)*/}
                  {/*         setServiceIndex(index)*/}
                  {/*         setToggleModal3(!toggleModal3)*/}
                  {/*     }}/>*/}
                  <img
                     src={Images.remove}
                     alt="delete"
                     className={classes.iconDeleteStyle}
                     onClick={(e) => {
                        e.stopPropagation();
                        setDelEdit2(false);
                        setServiceIndex(index);
                        setToggleModal3(!toggleModal3);
                     }}
                  />
               </>
            </TableCell>
         </TableBodyComponent>
      );
   }

   function handleAuthFilesSend() {
      if (!!chosenImages.length) {
         setLoaderUpload(true);

         ImgUploader(chosenImages, true).then((uploadedImages) => {
            setLoaderUpload(false);

            for (let i = 0; i < uploadedImages.length; i++) {
               const filesData = {
                  file: uploadedImages[i],
                  name: enteredFileName,
               };
               dispatch(
                  clientActions.addFilesToClientAuth(info[authIndex].id, filesData)
               );
            }
         });
      } else {
         setModalIsOpen(false);
      }
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
                     handleClose={() => setToggleModal((prevState) => !prevState)}
                  />
               ) : (
                  <DeleteElement
                     loader={!!delAuthLoader.length}
                     info={`Delete ${info[authIndex].authId}`}
                     handleClose={() => setToggleModal((prevState) => !prevState)}
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
                  handleClose={() => setToggleModal2((prevState) => !prevState)}
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
                     handleClose={() => setToggleModal3((prevState) => !prevState)}
                     fundingId={info[authIndex].funderId?._id}
                  />
               ) : (
                  <DeleteElement
                     loader={!!delAuthServLoader.length}
                     info={`Delete ${
                        services && services[serviceIndex]?.serviceId?.name
                     }`}
                     handleClose={() => setToggleModal3((prevState) => !prevState)}
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
                        </span>{" "}
                        &<span> JPEG </span>
                        formats are supported
                     </p>
                  }
               >
                  <ImagesFileUploader
                     changeNameAfterFileUpload={true}
                     handleImagesPass={(images) => setChosenImages(images)}
                     handleFileNamePass={(fileName) => setEnteredFileName(fileName)}
                  />
                  <AddModalButton
                     buttonClassName={classes.addAuthFilesButnStyle}
                     handleClick={handleAuthFilesSend}
                     loader={loaderUpload || !!sendFilesLoader.length}
                     text="Done"
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
               <div className={classes.authorizationServicesRight}>
                  <img
                     src={Images.addHours}
                     alt=""
                     className={classes.iconStyle}
                     onClick={() => setToggleModal2((prevState) => !prevState)}
                  />
                  <p
                     onClick={() => setToggleModal2((prevState) => !prevState)}
                     className={classes.authorizationServicesText}
                  >
                     Add Authorized Service
                  </p>
               </div>
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
