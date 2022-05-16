import React, { useEffect, useState } from "react";
import { Card } from "./card";
import { Filters } from "./filters";
import { scheduleStyle } from "./styles";
import { FindLoad, Images } from "@eachbase/utils";
import { Items } from "./items";
import {
   SimpleTooltip,
   Loader,
   NoItemText,
   SelectInput,
   SimpleModal,
   CustomizedSwitch,
} from "@eachbase/components";
import { Link } from "react-router-dom";
import { InfoModal } from "./modals";
import { appointmentActions } from "@eachbase/store";
import { useDispatch } from "react-redux";
import moment from "moment";

const getStatusList = (itemType = "") => {
   if (typeof itemType !== "string") return [];

   const status = itemType === "SERVICE" ? "Rendered" : "Completed";

   return [
      { name: status, id: status.toUpperCase(), value: status.toUpperCase() },
      { name: "Not Rendered", id: "NOTRENDERED", value: "NOTRENDERED" },
      { name: "Pending", id: "PENDING", value: "PENDING" },
      { name: "Cancelled", id: "CANCELLED", value: "CANCELLED" },
   ];
};

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
   const [stusType, setStusType] = useState(defItem ? defItem.eventStatus : "");
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
      setStusType(appointmentById.eventStatus);
   }, [appointmentById]);

   useEffect(() => {}, []);

   const dispatch = useDispatch();

   const loader = FindLoad("GET_APPOINTMENT_BY_ID");
   const statusLoader = FindLoad("SET_APPOINTMENT_STATUS");

   const handleOpenCloseModal = (info) => {
      dispatch(appointmentActions.getAppointmentById(info._id));
   };

   const handleChange = (e) => {
      if (stusType === e.target.value) return;
      // setStusType(e.target.value);
      const statusName =
         e.target.value === "RENDERED"
            ? "render"
            : e.target.value === "CANCELLED"
            ? "cancel"
            : "";
      dispatch(appointmentActions.setAppointmentStatus(defItem._id, statusName, ""));
   };

   const list = getStatusList(defItem?.type);

   const handleChangeService = () => {
      setSwitcher(!switcher);

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
   };

   return (
      <div>
         <Filters
            handleSendDate={handleSendDate}
            adminsList={adminsList}
            clientList={clientList}
            handleOpen={handleOpen}
            goToNext={() => setDate(date + 7)}
            goToBack={() => setDate(date - 7)}
            handleChangeScreenView={(e) => changeScreen(e)}
         />
         {appointments.length ? (
            <div className={classes.listWrapper}>
               <div className={classes.wrapp}>
                  {appointments.length
                     ? appointments.map((i, j) => (
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
                       ))
                     : ""}
               </div>
               <div className={classes.infoWrapper}>
                  {loader.length || statusLoader.length ? (
                     <Loader style={"flex"} />
                  ) : (
                     <>
                        <div className={classes.titleWrapper}>
                           <p>
                              {defItem && defItem.type === "DRIVE"
                                 ? "Drive Time"
                                 : defItem && defItem.type === "SERVICE"
                                 ? "Service Appointment"
                                 : defItem && defItem.type === "BREAK"
                                 ? "Break"
                                 : defItem && defItem.type === "PAID"
                                 ? "Paid Time Off"
                                 : ""}
                           </p>
                           <div>
                              {defItem && defItem.isRepeat === true ? (
                                 <div className={classes.recurEdit}>
                                    <p>Recurring Event</p>{" "}
                                    <img
                                       src={Images.edit}
                                       alt="icon"
                                       onClick={() => handleEdit(defItem)}
                                    />
                                 </div>
                              ) : (
                                 <>
                                    <SimpleTooltip
                                       title={<p>{"Recur Event"}</p>}
                                       placement="top-end"
                                    >
                                       <button onClick={() => openCloseRecur(defItem)}>
                                          <img src={Images.recurrance} alt="icon" />
                                       </button>
                                    </SimpleTooltip>
                                    <SimpleTooltip
                                       title={<p>{"Edit"}</p>}
                                       placement="top-end"
                                    >
                                       <button onClick={() => handleEdit(defItem)}>
                                          <img src={Images.edit} alt="icon" />
                                       </button>
                                    </SimpleTooltip>
                                 </>
                              )}
                           </div>
                        </div>
                        <p className={classes.infoDate}>
                           {defItem && (
                              <span>
                                 {moment(defItem.startDate).format("MMM DD, YYYY")}
                                 <span style={{ marginLeft: "16px" }}>
                                    {`${moment(defItem.startTime).format(
                                       "hh:mm A"
                                    )} - ${moment(defItem.endTime).format("hh:mm A")}`}
                                 </span>
                              </span>
                           )}
                        </p>
                        <div className={classes.itemsWrap}>
                           {defItem && defItem.client && (
                              <Items
                                 text={"Client:"}
                                 subText={
                                    defItem &&
                                    defItem.client &&
                                    `${defItem.client.firstName} ${defItem.client.lastName}`
                                 }
                              />
                           )}
                           {defItem && defItem.authorized && (
                              <Items
                                 text={"Authorized Service:"}
                                 subText={"PT (HA, HC, HN)"}
                              />
                           )}
                           {defItem && defItem.authorizedService && (
                              <Items
                                 text={"Authorized Service:"}
                                 subText={
                                    defItem.authorizedService.modifiers
                                       ? defItem.authorizedService.modifiers.map(
                                            (i) => i.name
                                         )
                                       : ""
                                 }
                              />
                           )}
                           {defItem && defItem.staff && (
                              <Items
                                 text={"Staff Member:"}
                                 subText={
                                    defItem &&
                                    defItem.staff &&
                                    `${defItem.staff.firstName} ${defItem.staff.lastName}`
                                 }
                              />
                           )}
                           {defItem && defItem.staffPayCode && (
                              <Items
                                 text={"Staff Paycode:"}
                                 subText={defItem.staffPayCode.name}
                              />
                           )}
                           {defItem && defItem.miles && (
                              <Items text={"Miles:"} subText={defItem.miles} />
                           )}
                           {defItem && defItem.client && (
                              <Items
                                 text={"Client Address:"}
                                 subText={"1100 East Broadway #302 Glendale, CA 91205"}
                              />
                           )}
                           {defItem && defItem.placeService && (
                              <Items
                                 text={"Place of Service:"}
                                 subText={
                                    defItem.placeService.name && defItem.placeService.name
                                 }
                              />
                           )}
                        </div>
                        <div className={classes.infoFooter}>
                           <p className={classes.infoFooterTitle}>Event Status</p>
                           <SelectInput
                              name={"rendered"}
                              handleSelect={handleChange}
                              value={stusType}
                              list={list}
                              type={"id"}
                           />
                           {defItem.type === "SERVICE" && (
                              <div className={classes.switch}>
                                 <div>
                                    <Link
                                       to="*"
                                       onClick={(e) => e.preventDefault()}
                                       className={classes.link}
                                    >
                                       Signature.csv
                                    </Link>
                                    <img
                                       className={classes.download}
                                       src={Images.download}
                                       alt="icon"
                                    />
                                 </div>
                                 <div>
                                    <p>Require Signature</p>
                                    <CustomizedSwitch
                                       checked={switcher}
                                       handleClick={handleChangeService}
                                    />
                                 </div>
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
