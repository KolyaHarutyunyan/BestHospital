import React, { useEffect, useState } from "react";
import { Card } from "./card";
import { Filters } from "./filters";
import { scheduleStyle } from "./styles";
import { FindLoad, Images, manageStatus } from "@eachbase/utils";
import { Items } from "./items";
import {
   SimpleTooltip,
   Loader,
   NoItemText,
   SimpleModal,
   CustomizedSwitch,
   DownloadLink,
   AddModalButton,
} from "@eachbase/components";
import { InfoModal } from "./modals";
import { appointmentActions } from "@eachbase/store";
import { useDispatch } from "react-redux";
import moment from "moment";
import {
   getBorderColorAndText,
   getCurrentText,
   getServiceAppmtDetails,
} from "./constants";

export const ListView = ({
   changeScreen,
   handleOpen,
   openCloseRecur,
   appointments,
   handleEdit,
   adminsList,
   clientList,
   appointmentById,
   handleSendDate,
}) => {
   const classes = scheduleStyle();

   const [date, setDate] = useState(0);
   const [item, setItem] = useState(appointmentById ? appointmentById : "");
   const defItem = item.length === 0 ? "" : item;
   const [switcher, setSwitcher] = useState(defItem ? defItem.require : false);

   useEffect(() => {
      if (appointments) {
         if (appointments && appointments[0]) {
            dispatch(
               appointmentActions.getAppointmentById(
                  appointments[0] && appointments[0].data[0]._id
               )
            );
         }
      }
   }, [appointments]);

   useEffect(() => {
      setItem(appointmentById);
   }, [appointmentById]);

   const dispatch = useDispatch();

   const loader = FindLoad("GET_APPOINTMENT_BY_ID");
   const statusLoader = FindLoad("SET_APPOINTMENT_STATUS");

   const handleOpenCloseModal = (info) => {
      dispatch(appointmentActions.getAppointmentById(info._id));
   };

   const { color: statusColor } = getBorderColorAndText(defItem?.eventStatus);
   const { detailText } = getCurrentText(defItem?.type);

   const _isServiceAppmt = defItem?.type === "SERVICE";
   const _isNotRendered = defItem?.eventStatus === "NOTRENDERED";
   const _isPending = defItem?.eventStatus === "PENDING";
   const _hasBeenRecurred = defItem?.isRepeat === true;

   function handleChangeService() {
      setSwitcher((prevState) => !prevState);
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
         require: !switcher,
      };
      dispatch(appointmentActions.editAppointment(data, defItem?._id));
   }

   function changeStatusToRendered() {
      dispatch(appointmentActions.setAppointmentStatus(defItem._id, "render", ""));
   }

   function changeStatusToCancelled() {
      dispatch(appointmentActions.setAppointmentStatus(defItem._id, "cancel", ""));
   }

   function changeStatusToCompleted() {
      dispatch(appointmentActions.setAppointmentStatus(defItem._id, "complete", ""));
   }

   const serviceAppmtDetails = getServiceAppmtDetails(defItem);
   const sortedAppmts = appointments?.sort(
      (a, b) => new Date(a._id).getTime() - new Date(b._id).getTime()
   );

   return (
      <div>
         <Filters
            handleSendDate={handleSendDate}
            adminsList={adminsList}
            clientList={clientList}
            handleOpen={handleOpen}
            goToNext={() => setDate((currDate) => currDate + 7)}
            goToBack={() => setDate((currDate) => currDate - 7)}
            handleChangeScreenView={(e) => changeScreen(e)}
            label={date}
         />
         {!!sortedAppmts.length ? (
            <div className={classes.listWrapper}>
               <div className={classes.wrapp}>
                  {!!sortedAppmts.length &&
                     sortedAppmts.map((i, j) => (
                        <div key={j} className={classes.cardWrapper}>
                           <p className={classes.cardTitle}>
                              {moment(i._id).format("dddd, MMM D YYYY")}
                           </p>
                           {i.data.length &&
                              i.data.map((k, index) => (
                                 <Card
                                    style={defItem && defItem._id === k._id}
                                    openModal={(info) => handleOpenCloseModal(info)}
                                    info={k}
                                    key={index}
                                 />
                              ))}
                        </div>
                     ))}
               </div>
               <div className={classes.infoWrapper}>
                  {loader.length || statusLoader.length ? (
                     <Loader style={"flex"} />
                  ) : (
                     <>
                        <div className={classes.titleWrapper}>
                           <p>{detailText}</p>
                           <div className={classes.recurAndEditBoxStyle}>
                              {_hasBeenRecurred ? (
                                 <div className={classes.recurEdit}>
                                    <p>Recurring Event</p>
                                 </div>
                              ) : (
                                 <SimpleTooltip
                                    title={<p>{"Recur Event"}</p>}
                                    placement="top-end"
                                 >
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
                                       {`${moment(defItem.startTime).format(
                                          "hh:mm A"
                                       )} - ${moment(defItem.endTime).format("hh:mm A")}`}
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
                              <Items
                                 key={index}
                                 text={item.detailText}
                                 subText={item.detail}
                              />
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
                                                checked={switcher}
                                                handleClick={handleChangeService}
                                             />
                                          </div>
                                       )}
                                       <DownloadLink
                                          linkClassName={classes.downloadSignatureStyle}
                                          linkHref={"Signature.csv"}
                                          linkInnerText={"Signature.csv"}
                                          linkDownload={true}
                                       />
                                    </div>
                                    <button
                                       type="button"
                                       className={classes.openModalButnStyle}
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
                                    handleClick={() =>
                                       _isServiceAppmt
                                          ? changeStatusToRendered()
                                          : changeStatusToCompleted()
                                    }
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
                     </>
                  )}
               </div>
            </div>
         ) : (
            <NoItemText text="No Appointments Yet" />
         )}
         <SimpleModal
            handleOpenClose={handleOpenCloseModal}
            content={<InfoModal handleOpenClose={handleOpenCloseModal} />}
         />
      </div>
   );
};
