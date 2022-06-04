import React, { useEffect, useState } from "react";
import { scheduleCommonStyle } from "./styles";
import {
   FindLoad,
   FindSuccess,
   Images,
   ImgUploader,
   manageStatus,
} from "@eachbase/utils";
import { Items } from "../items";
import {
   SimpleTooltip,
   Loader,
   CustomizedSwitch,
   DownloadLink,
   AddModalButton,
   SimpleModal,
   ModalContentWrapper,
   ImagesFileUploader,
} from "@eachbase/components";
import { appointmentActions, httpRequestsOnSuccessActions } from "@eachbase/store";
import { useDispatch } from "react-redux";
import moment from "moment";
import {
   getBorderColorAndText,
   getCurrentText,
   getServiceAppmtDetails,
} from "../constants";

export const ScheduleDetailsCard = ({ openCloseRecur, handleEdit, appointmentById }) => {
   const classes = scheduleCommonStyle();

   const [item, setItem] = useState(appointmentById ? appointmentById : "");
   const defItem = item.length === 0 ? "" : item;
   const [isRequired, setIsRequired] = useState(defItem ? defItem.signature : false);
   const [modalIsOpen, setModalIsOpen] = useState(false);
   const [chosenImages, setChosenImages] = useState([]);
   const [loaderUpload, setLoaderUpload] = useState(false);

   useEffect(() => {
      setItem(appointmentById);
   }, [appointmentById]);

   const dispatch = useDispatch();

   const loader = FindLoad("GET_APPOINTMENT_BY_ID");
   const statusLoader = FindLoad("SET_APPOINTMENT_STATUS");
   const appendSignatureSuccess = FindSuccess("APPEND_SIGNATURE_TO_APPMT");
   const appendSignatureLoader = FindLoad("APPEND_SIGNATURE_TO_APPMT");

   useEffect(() => {
      if (!!appendSignatureSuccess.length) {
         setModalIsOpen(false);
         dispatch(
            httpRequestsOnSuccessActions.removeSuccess("APPEND_SIGNATURE_TO_APPMT")
         );
      }
   }, [appendSignatureSuccess]);

   const { color: statusColor } = getBorderColorAndText(defItem?.eventStatus);
   const { detailText } = getCurrentText(defItem?.type);

   const _isServiceAppmt = defItem?.type === "SERVICE";
   const _isNotRendered = defItem?.eventStatus === "NOTRENDERED";
   const _isPending = defItem?.eventStatus === "PENDING";
   const _hasBeenRecurred = defItem?.isRepeat === true;

   useEffect(() => {
      const data = {
         type: "SERVICE",
         client: defItem?.client?._id,
         authorizedService: defItem?.authorizedService?._id,
         staff: defItem?.staff?._id,
         placeService: defItem?.placeService?._id,
         staffPayCode: defItem?.staffPayCode?._id,
         startDate: defItem?.startDate && moment(defItem?.startDate).format("YYYY-MM-DD"),
         eventStatus: defItem?.eventStatus ? defItem?.eventStatus : "PENDING",
         startTime: defItem?.startTime,
         endTime: defItem?.endTime,
         status: "ACTIVE",
         require: true,
         signature: isRequired,
      };
      dispatch(appointmentActions.editAppointment(data, defItem?._id));
   }, [isRequired]);

   function handleChangeService() {
      setIsRequired((prevState) => !prevState);
   }

   function changeStatusToCancelled() {
      dispatch(appointmentActions.setAppointmentStatus(defItem._id, "cancel", ""));
   }

   function handleStatusChange() {
      if (_isServiceAppmt) {
         if (isRequired) {
            setModalIsOpen(true);
         } else {
            dispatch(appointmentActions.setAppointmentStatus(defItem._id, "render", ""));
         }
      } else {
         dispatch(appointmentActions.setAppointmentStatus(defItem._id, "complete", ""));
      }
   }

   function handleSignatureSend() {
      setLoaderUpload(true);

      ImgUploader(chosenImages, false).then((uploadedSignature) => {
         setLoaderUpload(false);

         dispatch(
            appointmentActions.appendSignatureToAppmt(defItem._id, {
               file: uploadedSignature,
            })
         );
      });
   }

   const serviceAppmtDetails = getServiceAppmtDetails(defItem);

   if (!!loader.length || !!statusLoader.length) {
      return (
         <div className={classes.infoWrapper}>
            <Loader circleSize={50} />
         </div>
      );
   }

   return (
      <>
         <div className={classes.infoWrapper}>
            <div className={classes.titleWrapper}>
               <p>{detailText}</p>
               <div className={classes.recurAndEditBoxStyle}>
                  {_hasBeenRecurred ? (
                     <div className={classes.recurEdit}>
                        <p>Recurring Event</p>
                     </div>
                  ) : (
                     <SimpleTooltip title={<p>{"Recur Event"}</p>} placement="top-end">
                        <button
                           className={classes.recurButnStyle}
                           onClick={() => openCloseRecur(defItem)}
                        >
                           <img src={Images.recurrance} alt="icon" />
                        </button>
                     </SimpleTooltip>
                  )}
                  {(_isNotRendered || _isPending) && (
                     <button
                        className={classes.editButnStyle}
                        onClick={() => handleEdit(defItem)}
                     >
                        <img src={Images.edit} alt="icon" />
                     </button>
                  )}
               </div>
            </div>
            <div className={classes.infoDate}>
               {defItem && (
                  <div className={classes.dateAndStatusBoxStyle}>
                     <span>
                        {moment(defItem.startDate).format("MMM DD, YYYY")}
                        <span style={{ marginLeft: "16px" }}>
                           {`${moment(defItem.startTime).format("hh:mm A")} - ${moment(
                              defItem.endTime
                           ).format("hh:mm A")}`}
                        </span>
                     </span>
                     <p
                        style={{ color: statusColor }}
                        className={classes.eventStatusStyle}
                     >
                        {manageStatus(defItem?.eventStatus)}
                     </p>
                  </div>
               )}
            </div>
            <div className={classes.itemsWrap}>
               {serviceAppmtDetails.map((item, index) => (
                  <Items key={index} text={item.detailText} subText={item.detail} />
               ))}
            </div>
            <div className={classes.infoFooter}>
               {_isServiceAppmt && (
                  <div>
                     <div className={classes.signatureActionsBoxStyle}>
                        <div>
                           {_isNotRendered && (
                              <div className={classes.signatureBoxStyle}>
                                 <p className={classes.signatureTextStyle}>
                                    Require Signature
                                 </p>
                                 <CustomizedSwitch
                                    checked={isRequired}
                                    handleClick={handleChangeService}
                                 />
                              </div>
                           )}
                           {defItem?.digitalSignature && (
                              <DownloadLink
                                 linkClassName={classes.downloadSignatureStyle}
                                 linkHref={defItem?.digitalSignature?.url}
                                 linkInnerText={"Signature.csv"}
                                 linkDownload={true}
                              />
                           )}
                        </div>
                        <button
                           type="button"
                           className={classes.openModalButnStyle}
                           onClick={() => setModalIsOpen(true)}
                        >
                           Upload Signature
                        </button>
                     </div>
                  </div>
               )}
               {(_isNotRendered || _isPending) && (
                  <div className={classes.statusActionsBoxStyle}>
                     <AddModalButton
                        buttonClassName={classes.changeStatusButnStyle}
                        handleClick={handleStatusChange}
                        text={_isServiceAppmt ? "Render" : "Complete"}
                     />
                     <AddModalButton
                        buttonClassName={classes.changeStatusButnStyle}
                        handleClick={changeStatusToCancelled}
                        text="Cancel"
                     />
                  </div>
               )}
            </div>
         </div>
         <SimpleModal
            handleOpenClose={() => setModalIsOpen((prevState) => !prevState)}
            openDefault={modalIsOpen}
            content={
               <ModalContentWrapper
                  wrapperClassName={classes.signatureModalWrapperStyle}
                  onClose={() => setModalIsOpen(false)}
                  titleContent={"Upload Signature"}
                  subtitleContent={
                     "To complete a Service Appointment, please upload a signature."
                  }
               >
                  <>
                     <ImagesFileUploader
                        uploadOnlyOneFile={true}
                        handleImagesPass={(images) => setChosenImages(images)}
                     />
                     {!!chosenImages.length && (
                        <AddModalButton
                           buttonClassName={classes.addAuthFilesButnStyle}
                           handleClick={handleSignatureSend}
                           loader={loaderUpload || !!appendSignatureLoader.length}
                           text="Done"
                        />
                     )}
                  </>
               </ModalContentWrapper>
            }
         />
      </>
   );
};
