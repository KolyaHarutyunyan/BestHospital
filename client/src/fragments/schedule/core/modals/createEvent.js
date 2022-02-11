import { scheduleModalsStyle } from "./styles";
import { modalsStyle } from "@eachbase/components/modal/styles";
import { CloseButton } from "@eachbase/components";
import React, { useState } from "react";
import { Images } from "@eachbase/utils";
import { Break } from "./break";
import { Service } from "./service";

export const CreateEvent = ({
   handleOpenClose,
   date,
   clientList,
   staffList,
   places,
   allPaycodes,
   screen,
   modalDate,
   createModalType,
   createModalDate,
}) => {
   const classes = scheduleModalsStyle();
   const global = modalsStyle();
   const [screenType, setScreenType] = useState(
      screen ? screen : createModalType ? createModalType : ""
   );

   const handleChange = (type) => {
      setScreenType(type);
   };

   const handleCloseModal = () => {
      handleOpenClose && handleOpenClose();
   };

   const dateTime = modalDate
      ? {
           startTime: new Date(modalDate.startTime),
           endTime: new Date(modalDate.endTime),
        }
      : date && {
           startTime: date.startTime,
           endTime: date.endTime,
        };

   const day = date && {
      startDate: date.startDate,
   };

   return (
      <>
         <div className={screenType === "Service" ? classes.bigModal : global.inactiveModalBody}>
            <div className={global.positionedButton}>
               <CloseButton handleCLic={handleCloseModal} />
            </div>

            {screenType === "Service" ? (
               <Service
                  createModalDate={createModalDate}
                  modalDate={modalDate}
                  allPaycodes={allPaycodes}
                  places={places}
                  clientList={clientList}
                  staffList={staffList}
                  date={dateTime}
                  day={day}
                  handleOpenClose={handleCloseModal}
               />
            ) : screenType ? (
               screenType !== "Service" && (
                  <Break
                     createModalDate={createModalDate}
                     modalDate={modalDate}
                     allPaycodes={allPaycodes}
                     places={places}
                     clientList={clientList}
                     staffList={staffList}
                     date={dateTime}
                     day={day}
                     type={screenType}
                     handleOpenClose={handleCloseModal}
                  />
               )
            ) : (
               <>
                  <p className={global.availableScheduleTitle}>Select the Event Type</p>
                  <p className={classes.subTitle}>Please select the event type you want to add.</p>
                  <div className={classes.typesWrapper}>
                     <div onClick={() => handleChange("Service")} className={classes.typesItem}>
                        <p>Service Appointment</p>
                        <img src={Images.forward} alt="icon" />
                     </div>
                     <div onClick={() => handleChange("Break")} className={classes.typesItem}>
                        <p>Break</p>
                        <img src={Images.forward} alt="icon" />
                     </div>
                     <div onClick={() => handleChange("Drive")} className={classes.typesItem}>
                        <p>Drive Time</p>
                        <img src={Images.forward} alt="icon" />
                     </div>
                     <div onClick={() => handleChange("Paid")} className={classes.typesItem}>
                        <p>Paid Time Off</p>
                        <img src={Images.forward} alt="icon" />
                     </div>
                  </div>
               </>
            )}
         </div>
      </>
   );
};
