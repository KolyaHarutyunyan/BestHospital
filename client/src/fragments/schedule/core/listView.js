import React, { useEffect, useState } from "react";
import { Card } from "./card";
import { Filters } from "./filters";
import { scheduleStyle } from "./styles";
import { NoItemText } from "@eachbase/components";
import { appointmentActions } from "@eachbase/store";
import { useDispatch } from "react-redux";
import moment from "moment";
import { ScheduleDetailsCard } from "./common";

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

   useEffect(() => {
      if (appointments) {
         dispatch(appointmentActions.getAppointmentById(appointments[0]?.data[0]?._id));
      }
   }, []);

   useEffect(() => {
      setItem(appointmentById);
   }, [appointmentById]);

   const dispatch = useDispatch();

   function handleOpenCloseModal(info) {
      dispatch(appointmentActions.getAppointmentById(info._id));
   }

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
               <ScheduleDetailsCard
                  openCloseRecur={openCloseRecur}
                  handleEdit={handleEdit}
                  appointmentById={appointmentById}
               />
            </div>
         ) : (
            <NoItemText text="No Appointments Yet" />
         )}
      </div>
   );
};
