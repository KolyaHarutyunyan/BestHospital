import React, { useEffect, useState } from "react";
import { CreateChancel, SelectInput, ValidationInput } from "@eachbase/components";
import { ErrorText, FindLoad } from "@eachbase/utils";
import { scheduleModalsStyle } from "./styles";
import { modalsStyle } from "../../../../components/modal/styles";
import { adminActions, appointmentActions } from "@eachbase/store";
import { useDispatch } from "react-redux";
import moment from "moment";

export const Break = ({
   handleOpenClose,
   type,
   date,
   staffList,
   allPaycodes,
   modalDate,
   day,
   createModalDate,
}) => {
   const dispatch = useDispatch();
   const classes = scheduleModalsStyle();
   const global = modalsStyle();
   const [inputs, setInputs] = useState(
      modalDate
         ? { ...modalDate }
         : day
         ? { ...day, ...createModalDate }
         : createModalDate
         ? { ...createModalDate }
         : {
              staff: "",
              staffPayCode: "",
              startDate: "",
              miles: "",
           }
   );
   const [times, setTimes] = useState(date ? { ...date } : { startTime: "", endTime: "" });
   const [error, setError] = useState({});

   const handleCloseModal = () => {
      handleOpenClose && handleOpenClose();
      setInputs("");
      setTimes("");
   };

   useEffect(() => {
      if (createModalDate && createModalDate.staff) {
         dispatch(adminActions.getAllPaycodes(createModalDate.staff));
      }
   }, [createModalDate]);

   const handleChange = (e) => {
      e.target.name === "miles"
         ? setInputs((prevState) => ({ ...prevState, [e.target.name]: +e.target.value }))
         : setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
      error === e.target.name && setError("");
      e.target.name === "staff" && dispatch(adminActions.getAllPaycodes(e.target.value));
   };

   const handleChangeDate = (e) => {
      let today = inputs.startDate ? new Date(inputs.startDate) : new Date();
      let myToday = new Date(
         today.getFullYear(),
         today.getMonth(),
         today.getDate(),
         e.target.value.slice(0, 2),
         e.target.value.slice(3, 5),
         0
      );
      setTimes((prevState) => ({ ...prevState, [e.target.name]: myToday }));
      e.target.name === error && setError("");
   };

   const info = "";
   const modalType =
      type === "Break" ? "BREAK" : type === "Drive" ? "DRIVE" : type === "Paid" ? "PAID" : "";

   const handleCreate = () => {
      const modalBool =
         modalType === "BREAK"
            ? inputs.staff &&
              inputs.staffPayCode &&
              inputs.startDate &&
              times.startTime &&
              times.endTime
            : modalType === "DRIVE"
            ? inputs.staff &&
              inputs.staffPayCode &&
              inputs.startDate &&
              times.startTime &&
              times.endTime &&
              inputs.miles
            : modalType === "PAID"
            ? inputs.staff &&
              inputs.staffPayCode &&
              inputs.startDate &&
              times.startTime &&
              times.endTime
            : "";

      const date = {
         type: modalType,
         ...inputs,
         ...times,
         miles: +inputs.miles,
         eventStatus: "PENDING",
         status: "ACTIVE",
         require: false,
      };
      const editDate = {
         type: inputs.type,
         ...times,
         miles: +inputs.miles,
         eventStatus: "PENDING",
         status: "ACTIVE",
         require: false,
         staff: inputs.staff ? (inputs.staff._id ? inputs.staff._id : inputs.staff) : "",
         staffPayCode: inputs.staffPayCode
            ? inputs.staffPayCode._id
               ? inputs.staffPayCode._id
               : inputs.staffPayCode
            : "",
         startDate: inputs.startDate,
         _id: inputs.inputs,
      };
      inputs.type === "DRIVE" ? (editDate["miles"] = +inputs.miles) : "";

      if (modalBool) {
         if (modalDate) {
            dispatch(appointmentActions.editAppointment(editDate, inputs._id));
         } else {
            dispatch(appointmentActions.createAppointment(date));
         }
      } else {
         if (modalType === "BREAK") {
            setError(
               !inputs.staff
                  ? "staff"
                  : !inputs.staffPayCode
                  ? "staffPayCode"
                  : !inputs.startDate
                  ? "startDate"
                  : !times.startTime
                  ? "startTime"
                  : !times.endTime
                  ? "endTime"
                  : ""
            );
         }
         if (modalType === "DRIVE") {
            setError(
               !inputs.staff
                  ? "staff"
                  : !inputs.staffPayCode
                  ? "staffPayCode"
                  : !inputs.startDate
                  ? "startDate"
                  : !times.startTime
                  ? "startTime"
                  : !times.endTime
                  ? "endTime"
                  : !inputs.miles
                  ? "miles"
                  : ""
            );
         }
         if (modalType === "PAID") {
            setError(
               !inputs.staff
                  ? "staff"
                  : !inputs.staffPayCode
                  ? "staffPayCode"
                  : !inputs.startDate
                  ? "startDate"
                  : !times.startTime
                  ? "startTime"
                  : !times.endTime
                  ? "endTime"
                  : ""
            );
         }
      }
   };

   const title =
      type === "Paid"
         ? "Add a Paid Time Off"
         : type === "Break"
         ? "Add a Break"
         : type === "Drive"
         ? "Add a Drive Time"
         : "";

   const edit =
      type === "Paid"
         ? "Edit Paid Time Off"
         : type === "Break"
         ? "Edit Break"
         : type === "Drive"
         ? "Edit Drive Time"
         : "";

   const sub =
      type === "Paid"
         ? "To add a Paid Time Off, please fulfill the below fields."
         : type === "Break"
         ? "To add a Break, please fulfill the below fields."
         : type === "Drive"
         ? "To add a Drive Time, please fulfill the below fields."
         : "";

   const loader = FindLoad("CREATE_APPOINTMENT");
   const editLoader = FindLoad("EDIT_APPOINTMENT");
   console.log(info, "info");
   return (
      <div>
         <p className={global.availableScheduleTitle}>{info ? edit : title}</p>
         <p className={classes.subTitle}>{sub}</p>

         <div className={classes.breakWrapper}>
            <SelectInput
               type={"id"}
               language={null}
               name={"staff"}
               label={"Staff Member*"}
               handleSelect={handleChange}
               value={modalDate ? inputs.staff._id : inputs.staff}
               list={staffList ? staffList : []}
               typeError={error === "staff" && ErrorText.field}
            />
            <SelectInput
               type={"id"}
               language={null}
               name={"staffPayCode"}
               label={"Staff Paycode*"}
               handleSelect={handleChange}
               value={
                  modalDate
                     ? inputs.staffPayCode._id
                        ? inputs.staffPayCode._id
                        : inputs.staffPayCode
                     : inputs.staffPayCode
               }
               list={allPaycodes ? allPaycodes : []}
               typeError={error === "staffPayCode" && ErrorText.field}
            />
            <ValidationInput
               variant={"outlined"}
               onChange={handleChange}
               value={
                  inputs.startDate
                     ? moment(inputs.startDate).format("YYYY-MM-DD")
                     : inputs.startDate
               }
               type={"date"}
               label={"Start Date*"}
               name="startDate"
               typeError={error === "startDate" && ErrorText.field}
            />

            <div className={classes.timeInputs}>
               <ValidationInput
                  variant={"outlined"}
                  onChange={handleChangeDate}
                  value={
                     times.startTime
                        ? `${
                             times.startTime.getHours() < 10
                                ? `0${times.startTime.getHours()}`
                                : times.startTime.getHours()
                          }:${
                             times.startTime.getMinutes() < 10
                                ? `0${times.startTime.getMinutes()}`
                                : times.startTime.getMinutes()
                          }`
                        : ""
                  }
                  type={"time"}
                  label={"Start Time*"}
                  name="startTime"
                  style={classes.startTime}
                  typeError={error === "startTime" && ErrorText.field}
               />
               <ValidationInput
                  variant={"outlined"}
                  onChange={handleChangeDate}
                  value={
                     times.endTime
                        ? `${
                             times.endTime.getHours() < 10
                                ? `0${times.endTime.getHours()}`
                                : times.endTime.getHours()
                          }:${
                             times.endTime.getMinutes() < 10
                                ? `0${times.endTime.getMinutes()}`
                                : times.endTime.getMinutes()
                          }`
                        : ""
                  }
                  type={"time"}
                  label={"End Time*"}
                  name="endTime"
                  typeError={error === "endTime" && ErrorText.field}
               />
            </div>

            {type === "Drive" && (
               <ValidationInput
                  variant={"outlined"}
                  onChange={handleChange}
                  value={inputs.miles}
                  type={"number"}
                  label={"Miles"}
                  name="miles"
                  typeError={error === "miles" && ErrorText.field}
               />
            )}
            <CreateChancel
               loader={!!loader.length || !!editLoader.length}
               create={info ? "Save" : "Add"}
               chancel={"Cancel"}
               onCreate={handleCreate}
               onClose={handleCloseModal}
               buttonWidth="191px"
            />
         </div>
      </div>
   );
};
