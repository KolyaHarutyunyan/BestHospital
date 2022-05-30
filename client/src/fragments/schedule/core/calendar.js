import React, { useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { SimpleModal } from "@eachbase/components";
import { Filters } from "./filters";
import { useDispatch } from "react-redux";
import { appointmentActions } from "@eachbase/store";
import { ScheduleDetailsCard } from "./common";

const DragAndDropCalendar = withDragAndDrop(Calendar);

export const Selectable = ({
   handleChangeScreenView,
   handleOpenClose,
   openCloseRecur,
   appointments,
   adminsList,
   clientList,
   handleOpen,
   handleSendDate,
   handleEdit,
   appointmentById,
}) => {
   const dispatch = useDispatch();

   const [open, setOpen] = useState(false);
   const [info, setInfo] = useState("");
   const events = appointments.map((i) => ({
      id: i._id,
      title:
         i.type === "DRIVE"
            ? "Drive Time"
            : i.type === "SERVICE"
            ? "Service Appointment"
            : i.type === "BREAK"
            ? "Break"
            : i.type === "PAID"
            ? "Paid Time Off"
            : "",
      start: new Date(i.startDate),
      end: new Date(i.endTime),
   }));

   const handleOpenCloseModal = (date) => {
      setOpen((prevState) => !prevState);
      setInfo(date);
      if (date) {
         dispatch(appointmentActions.getAppointmentById(date.id));
      }
   };

   const moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
      let allDay = event.allDay;
      if (!event.allDay && droppedOnAllDaySlot) {
         allDay = true;
      } else if (event.allDay && !droppedOnAllDaySlot) {
         allDay = false;
      }

      const filteredDate = appointments.filter((i) => i._id === event.id);

      const date = {
         ...filteredDate[0],
      };

      const editDate = {
         ...date,
      };
      editDate["startDate"] = start;
      editDate["startTime"] = start;
      editDate["endTime"] = end;
      editDate["staff"] = date.staff[0]._id ? date.staff[0]._id : date.staff;
      editDate["client"] = null;
      date.miles ? (editDate["miles"] = date.miles ? +date.miles : "") : "";

      dispatch(appointmentActions.editAppointment(editDate, filteredDate[0]._id));
   };

   const handleSelect = ({ start, end }) => {
      const date = {
         startDate: new Date(start),
         startTime: new Date(start),
         endTime: new Date(end),
      };
      handleOpenClose("", date);
   };

   const localizer = momentLocalizer(moment);

   const CustomToolbar = (toolbar) => {
      const goToBack = () => {
         if (toolbar.view === "day") {
            toolbar.date.setDate(toolbar.date.getDate() - 1);
            toolbar.onNavigate("next");
         } else if (toolbar.view === "week") {
            toolbar.date.setDate(toolbar.date.getDate() - 7);
            toolbar.onNavigate("next");
         } else {
            toolbar.date.setMonth(toolbar.date.getMonth() - 1);
            toolbar.onNavigate("next");
         }
      };

      const goToNext = () => {
         if (toolbar.view === "day") {
            toolbar.date.setDate(toolbar.date.getDate() + 1);
            toolbar.onNavigate("next");
         } else if (toolbar.view === "week") {
            toolbar.date.setDate(toolbar.date.getDate() + 7);
            toolbar.onNavigate("next");
         } else {
            toolbar.date.setMonth(toolbar.date.getMonth() + 1);
            toolbar.onNavigate("next");
         }
      };

      return (
         <Filters
            handleSendDate={handleSendDate}
            handleOpen={handleOpen}
            adminsList={adminsList}
            clientList={clientList}
            handleOpenClose={handleOpenClose}
            handleChangeScreenView={handleChangeScreenView}
            goToBack={goToBack}
            goToNext={goToNext}
            viewType={"calendar"}
            label={toolbar.label}
         />
      );
   };

   return (
      <>
         <DragAndDropCalendar
            components={{
               toolbar: CustomToolbar,
            }}
            onEventDrop={moveEvent}
            resizable
            defaultView={"week"}
            selectable
            localizer={localizer}
            events={events}
            defaultView={Views.WEEK}
            defaultDate={new Date()}
            onSelectEvent={(i) => handleOpenCloseModal(i)}
            onSelectSlot={handleSelect}
         />
         <SimpleModal
            handleOpenClose={handleOpenCloseModal}
            openDefault={open}
            content={
               <ScheduleDetailsCard
                  openCloseRecur={openCloseRecur}
                  handleEdit={handleEdit}
                  appointmentById={appointmentById}
               />
            }
         />
      </>
   );
};
