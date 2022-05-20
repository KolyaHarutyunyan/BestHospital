import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
   AddModalButton,
   Card,
   DeleteElement,
   Loader,
   NoItemText,
   Notes,
   SimpleModal,
   TableBodyComponent,
} from "@eachbase/components";
import { serviceSingleStyles } from "./styles";
import { Colors, FindLoad, FindSuccess, Images, ImgUploader } from "@eachbase/utils";
import { CircularProgress, TableCell } from "@material-ui/core";
import {
   clientActions,
   httpRequestsOnErrorsActions,
   httpRequestsOnSuccessActions,
} from "@eachbase/store";
import {
   AddAuthorization,
   AuthorizationFile,
   AddAuthorizationService,
} from "../../clientModals";
import { AuthHeader } from "@eachbase/components/headers/auth/authHeader";
import { headerTitles } from "./constants";

export const ClientAuthorization = ({ info, setAuthActive, setAuthItemIndex }) => {
   const classes = serviceSingleStyles();

   const params = useParams();

   const dispatch = useDispatch();

   const [delEdit, setDelEdit] = useState(null);
   const [delEdit2, setDelEdit2] = useState(null);
   const [toggleModal, setToggleModal] = useState(false);
   const [toggleModal2, setToggleModal2] = useState(false);
   const [toggleModal3, setToggleModal3] = useState(false);
   const [modalIsOpen, setModalIsOpen] = useState(false);
   const [authIndex, setAuthIndex] = useState(0);
   const [serviceIndex, setServiceIndex] = useState(null);
   const services = useSelector((state) => state.client.clientsAuthorizationsServices);
   const [chosenImages, setChosenImages] = useState([]);
   const [loaderUpload, setLoaderUpload] = useState(false);

   const success = FindSuccess("DELETE_CLIENT_AUTHORIZATION");
   const successDelServ = FindSuccess("DELETE_CLIENT_AUTHORIZATION_SERV");
   const loader = FindLoad("GET_CLIENT_AUTHORIZATION_SERV");
   const delAuthLoader = FindLoad("DELETE_CLIENT_AUTHORIZATION");

   useEffect(() => {
      if (info) {
         dispatch(clientActions.getClientsAuthorizationsServ(info[authIndex].id));
      }
   }, [authIndex]);

   useEffect(() => {
      if (!!success.length) {
         setToggleModal(!toggleModal);
         dispatch(
            httpRequestsOnSuccessActions.removeSuccess("DELETE_CLIENT_AUTHORIZATION")
         );
         dispatch(httpRequestsOnErrorsActions.removeError("GET_CLIENT_AUTHORIZATION"));
      }
   }, [success]);

   useEffect(() => {
      if (!!successDelServ.length) {
         setToggleModal3(!toggleModal3);
         dispatch(
            httpRequestsOnSuccessActions.removeSuccess("DELETE_CLIENT_AUTHORIZATION_SERV")
         );
         dispatch(
            httpRequestsOnErrorsActions.removeError("GET_CLIENT_AUTHORIZATION_SERV")
         );
      }
   }, [successDelServ]);

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

   function handleSubmit() {
      if (!!chosenImages.length) {
         setLoaderUpload(true);

         ImgUploader(chosenImages, true).then((uploadedImages) => {
            setLoaderUpload(false);

            dispatch(
               clientActions.addFilesToClientAuth(
                  info[authIndex].clientId,
                  info[authIndex].id,
                  uploadedImages
               )
            );
         });
      } else {
         setModalIsOpen(false);
      }
   }

   return (
      <div className={classes.staffGeneralWrapper}>
         <SimpleModal
            handleOpenClose={() => setToggleModal(!toggleModal)}
            openDefault={toggleModal}
            content={
               delEdit ? (
                  <AddAuthorization
                     fundingId={info[authIndex]?.funderId?._id}
                     info={info[authIndex]}
                     handleClose={() => setToggleModal(!toggleModal)}
                  />
               ) : (
                  <DeleteElement
                     loader={!!delAuthLoader.length}
                     info={`Delete ${info[authIndex].authId}`}
                     handleClose={() => setToggleModal(!toggleModal)}
                     handleDel={deleteAuthorization}
                  />
               )
            }
         />
         <SimpleModal
            handleOpenClose={() => setToggleModal2(!toggleModal2)}
            openDefault={toggleModal2}
            content={
               <AddAuthorizationService
                  authId={info[authIndex]?.id}
                  handleClose={() => setToggleModal2(!toggleModal2)}
                  fundingId={info[authIndex].funderId?._id}
               />
            }
         />
         <SimpleModal
            handleOpenClose={() => setToggleModal3(!toggleModal3)}
            openDefault={toggleModal3}
            content={
               delEdit2 ? (
                  <AddAuthorizationService
                     info={services && services[serviceIndex]}
                     authId={info[authIndex].id}
                     handleClose={() => setToggleModal3(!toggleModal3)}
                     fundingId={info[authIndex].funderId?._id}
                  />
               ) : (
                  <DeleteElement
                     loader={!!delAuthLoader.length}
                     info={`Delete ${
                        services && services[serviceIndex]?.serviceId?.name
                     }`}
                     handleClose={() => setToggleModal3(!toggleModal3)}
                     handleDel={deleteAuthorizationServ}
                  />
               )
            }
         />
         <SimpleModal
            handleOpenClose={() => setModalIsOpen(!modalIsOpen)}
            openDefault={modalIsOpen}
            content={
               <div className={classes.authorizationFileWrapper}>
                  <AuthorizationFile
                     handleImagesPass={(images) => setChosenImages(images)}
                  />
                  <AddModalButton
                     buttonClassName={classes.addAuthFilesButnStyle}
                     handleClick={handleSubmit}
                     loader={loaderUpload}
                     text="Done"
                  />
               </div>
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
                     onClick={() => setToggleModal2(!toggleModal2)}
                  />
                  <p
                     onClick={() => setToggleModal2(!toggleModal2)}
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
