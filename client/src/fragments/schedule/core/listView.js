import React, { useEffect, useState } from "react";
import { Card } from "./card";
import { Filters } from "./filters";
import { scheduleStyle } from "./styles";
import { FindLoad, Images } from "@eachbase/utils";
import { Items } from "./items";
import {
   HtmlTooltip,
   Loader,
   NoItemText,
   SelectInput,
   SimpleModal,
   Switcher,
} from "@eachbase/components";
import { Link } from "react-router-dom";
import { InfoModal } from "./modals";
import { appointmentActions } from "@eachbase/store";
import { useDispatch } from "react-redux";
import moment from "moment";

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

   const dispatch = useDispatch();
   const handleOpenCloseModal = (info) => {
      dispatch(appointmentActions.getAppointmentById(info._id));
   };

   const getLoader = FindLoad("GET_APPOINTMENT_BY_ID");
   const getStatusLoader = FindLoad("SET_APPOINTMENT_STATUS");

   const handleChange = (e) => {
      setStusType(e.target.value);
      const info = {
         eventStatus: e.target.value,
         status: defItem.status,
      };
      dispatch(appointmentActions.setAppointmentStatus(defItem._id, info));
   };

   // useEffect(() => {
   //    const info = {
   //       eventStatus: stusType,
   //       status: defItem.status,
   //    };
   //    if(stusType) {
   //       dispatch(appointmentActions.setAppointmentStatus(defItem._id, info));
   //    }
   // }, [stusType]);

   const list =
      defItem && defItem.type === "SERVICE"
         ? [
              { name: "Rendered", id: "RENDERED", value: "RENDERED" },
              // {name: 'COMPLETED', value: 'COMPLETED'},
              { name: "Not Rendered", id: "NOTRENDERED", value: "NOTRENDERED" },
              { name: "Pending", value: "PENDING" },
              { name: "Cancelled", id: "CANCELLED", value: "CANCELLED" },
           ]
         : [
              { name: "Completed", id: "COMPLETED", value: "COMPLETED" },
              { name: "Not Rendered", id: "NOTRENDERED", value: "NOTRENDERED" },
              { name: "Pending", id: "PENDING", value: "PENDING" },
              { name: "Cancelled", id: "CANCELLED", value: "CANCELLED" },
           ];

   const handleChangeService = () => {
      setSwitcher(!switcher);

      const data = {
         type: "SERVICE",
         client: defItem.client._id,
         authorizedService: defItem.authorizedService._id,
         staff: defItem.staff._id,
         placeService: defItem.placeService._id,
         staffPayCode: defItem.staffPayCode._id,
         startDate:
            defItem.startDate && moment(defItem.startDate).format("YYYY-MM-DD"),
         eventStatus: defItem.eventStatus ? defItem.eventStatus : "PENDING",
         startTime: defItem.startTime,
         endTime: defItem.endTime,
         status: "ACTIVE",
         require: !switcher,
      };
      dispatch(appointmentActions.editAppointment(data, defItem._id));
   };

   return (
      <div>
         <Filters
            handleSendDate={handleSendDate}
            adminsList={adminsList}
            clientList={clientList}
            handleOpen={handleOpen}
            // label={convertedDate}
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
                                      openModal={(info) =>
                                         handleOpenCloseModal(info)
                                      }
                                      info={k}
                                      key={index}
                                   />
                                ))}
                          </div>
                       ))
                     : ""}
               </div>
               <div className={classes.infoWrapper}>
                  {getLoader.length ? (
                     // || getStatusLoader.length
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
                                 <HtmlTooltip
                                    title={<p>{"Recurring Event"}</p>}
                                    placement="top-end"
                                 >
                                    <button
                                       className={classes.recurEdit}
                                       onClick={() => handleEdit(defItem)}
                                    >
                                       <p>Recurring Event</p>{" "}
                                       <img src={Images.edit} alt="icon" />
                                    </button>
                                 </HtmlTooltip>
                              ) : (
                                 <>
                                    <HtmlTooltip
                                       title={<p>{"Recur Event"}</p>}
                                       placement="top-end"
                                    >
                                       <button
                                          onClick={() =>
                                             openCloseRecur(defItem)
                                          }
                                       >
                                          <img
                                             src={Images.recurrance}
                                             alt="icon"
                                          />
                                       </button>
                                    </HtmlTooltip>
                                    <HtmlTooltip
                                       title={<p>{"Edit"}</p>}
                                       placement="top-end"
                                    >
                                       <button
                                          onClick={() => handleEdit(defItem)}
                                       >
                                          <img src={Images.edit} alt="icon" />
                                       </button>
                                    </HtmlTooltip>
                                 </>
                              )}
                           </div>
                        </div>
                        <p className={classes.infoDate}>
                           {defItem && (
                              <span>
                                 {moment(defItem.startDate).format(
                                    "MMM DD, YYYY"
                                 )}
                                 <span style={{ marginLeft: "16px" }}>
                                    {`${moment(defItem.startTime).format(
                                       "hh:mm A"
                                    )} - ${moment(defItem.endTime).format(
                                       "hh:mm A"
                                    )}`}
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
                                       : "ss"
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
                                 subText={
                                    "1100 East Broadway #302 Glendale, CA 91205"
                                 }
                              />
                           )}
                           {defItem && defItem.placeService && (
                              <Items
                                 text={"Place of Service:"}
                                 subText={
                                    defItem.placeService.name &&
                                    defItem.placeService.name
                                 }
                              />
                           )}
                        </div>
                        <div className={classes.infoFooter}>
                           <p className={classes.infoFooterTitle}>
                              Event Status
                           </p>
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
                                    <Link to="*" className={classes.link}>
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
                                    <Switcher
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
            <NoItemText text="No Items Yet" />
         )}
         <SimpleModal
            handleOpenClose={handleOpenCloseModal}
            content={<InfoModal handleOpenClose={handleOpenCloseModal} />}
         />
      </div>
   );
};
