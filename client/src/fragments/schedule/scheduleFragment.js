import { ListView, scheduleStyle } from "./core";
import { Selectable } from "./core/calendar";
import React, { useEffect, useState } from "react";
import { Loader, SimpleModal } from "@eachbase/components";
import { CreateEvent } from "./core/modals/createEvent";
import { Recur } from "./core/modals";
import { useDispatch, useSelector } from "react-redux";
import { FindLoad, FindSuccess } from "@eachbase/utils";
import {
   adminActions,
   appointmentActions,
   httpRequestsOnSuccessActions,
} from "@eachbase/store";
import { getDisplayFromType } from "./constants";

export const ScheduleFragment = ({}) => {
   const classes = scheduleStyle();
   const [type, setType] = useState("list");
   const [open, setOpen] = useState(false);
   const [openRecur, setOpenRecur] = useState(false);
   const [date, setDate] = useState("");
   const [modalDate, setModalDate] = useState("");
   const [recurDate, setRecurDate] = useState("");

   const [createModalType, setCreateModalType] = useState("");
   const [newInfo, setNewInfo] = useState();
   const dispatch = useDispatch();

   const {
      appointments,
      clientList,
      adminsList,
      places,
      allPaycodes,
      appointmentById,
      calendarAppointments,
   } = useSelector((state) => ({
      appointments: state.appointment.appointments,
      calendarAppointments: state.appointment.calendarAppointments,
      appointmentById: state.appointment.appointmentById,
      clientList: state.client.clientList,
      adminsList: state.admins.adminsList,
      places: state.system.places,
      allPaycodes: state.admins.allPaycodes,
   }));

   const changeScreen = (ev) => {
      setType(ev);
   };

   const handleOpenClose = (i, date) => {
      if (date) {
         setDate(date);
      }
      setOpen((prevState) => !prevState);
   };

   const openCloseRecur = (date) => {
      setOpenRecur((prevState) => !prevState);
      setRecurDate(date);
   };

   const successRecur = FindSuccess("APPOINTMENT_REPEAT");

   useEffect(() => {
      if (!!successRecur.length) {
         setOpenRecur(false);
         dispatch(httpRequestsOnSuccessActions.removeSuccess("APPOINTMENT_REPEAT"));
      }
   }, [successRecur]);

   const handleEdit = (item) => {
      dispatch(adminActions.getAllPaycodes(item.staff._id));
      // dispatch(appointmentActions.getAppointmentById(item._id))
      setModalDate(item);

      setOpen(prevState => !prevState);
   };

   const success = FindSuccess("CREATE_APPOINTMENT");
   const editSuccess = FindSuccess("EDIT_APPOINTMENT");

   useEffect(() => {
      if (!!success.length) {
         setOpen(false);
         dispatch(httpRequestsOnSuccessActions.removeSuccess("CREATE_APPOINTMENT"));
      }
   }, [success]);

   useEffect(() => {
      if (!!editSuccess.length) {
         setOpen(false);
         dispatch(httpRequestsOnSuccessActions.removeSuccess("EDIT_APPOINTMENT"));
      }
   }, [editSuccess]);

   const handleOpen = () => {
      setOpen(prevState => !prevState);
      setModalDate("");
      setDate("");
   };

   const handleSendDate = (e) => {
      // const newInfo = {}
      setNewInfo({});
      e.staff ? (newInfo.staff = e.staff) : "";
      e.type ? (newInfo.type = e.type) : "";

      if (e) {
         setCreateModalType(newInfo);
      }
   };

   const filteredAppointments = [];
   appointments.forEach((appointment) => {
      filteredAppointments.push(appointment.data[0]);
   });

   const loader = FindLoad("GET_APPOINTMENT");

   const modalType = getDisplayFromType(createModalType?.type);
   const screen = getDisplayFromType(modalDate?.type);

   return (
      <div className={classes.wrapper}>
         {loader.length ? (
            <Loader />
         ) : (
            <>
               {type === "calendar" ? (
                  <Selectable
                     handleSendDate={handleSendDate}
                     appointmentById={appointmentById}
                     adminsList={adminsList}
                     clientList={clientList}
                     appointments={filteredAppointments}
                     handleOpen={handleOpen}
                     openCloseRecur={openCloseRecur}
                     handleOpenClose={handleOpenClose}
                     handleChangeScreenView={(e) => changeScreen(e)}
                     handleEdit={handleEdit}
                  />
               ) : (
                  <ListView
                     handleSendDate={handleSendDate}
                     appointmentById={appointmentById}
                     clientList={clientList}
                     adminsList={adminsList}
                     handleEdit={handleEdit}
                     openCloseRecur={openCloseRecur}
                     handleOpen={handleOpen}
                     changeScreen={changeScreen}
                     appointments={appointments}
                  />
               )}

               <SimpleModal
                  handleOpenClose={handleOpenClose}
                  openDefault={open}
                  content={
                     <CreateEvent
                        createModalType={modalType}
                        createModalDate={createModalType}
                        screen={screen}
                        allPaycodes={allPaycodes}
                        places={places}
                        clientList={clientList && clientList.clients}
                        staffList={adminsList && adminsList.staff}
                        date={date}
                        modalDate={modalDate}
                        handleOpenClose={handleOpenClose}
                     />
                  }
               />
               <SimpleModal
                  handleOpenClose={openCloseRecur}
                  openDefault={openRecur}
                  content={<Recur date={recurDate} openCloseRecur={openCloseRecur} />}
               />
            </>
         )}
      </div>
   );
};
