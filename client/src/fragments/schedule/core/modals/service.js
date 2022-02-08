import React, { useEffect, useState } from "react";
import { CreateChancel, SelectInput, Switcher, ValidationInput } from "@eachbase/components";
import { ErrorText, FindLoad } from "@eachbase/utils";
import { scheduleModalsStyle } from "./styles";
import { modalsStyle } from "../../../../components/modal/styles";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, appointmentActions, clientActions, systemActions } from "@eachbase/store";
import axios from "axios";
import moment from "moment";
import { Switch } from "@material-ui/core";
import { inputsStyle } from "../../../../components/inputs/styles";

export const Service = ({
   handleOpenClose,
   info,
   date,
   clientList,
   staffList,
   places,
   allPaycodes,
   modalDate,
   day,
   createModalDate,
}) => {
   const dispatch = useDispatch();
   const classes = scheduleModalsStyle();
   const global = modalsStyle();
   const inputClasses = inputsStyle();
   const [inputs, setInputs] = useState(
      modalDate
         ? {
              ...modalDate,
              client: modalDate.client._id,
              authorizedService: modalDate.authorizedService._id,
              staff: modalDate.staff._id,
              placeService: modalDate.placeService._id,
              staffPayCode: modalDate.staffPayCode._id,
           }
         : day
         ? { ...day, ...createModalDate }
         : createModalDate
         ? { ...createModalDate }
         : {
              client: "",
              authorizedService: "",
              staff: "",
              placeService: "",
              staffPayCode: "",
              startDate: "",
              eventStatus: "PENDING",
           }
   );
   const [times, setTimes] = useState(date ? { ...date } : { startTime: "", endTime: "" });
   const [error, setError] = useState({});
   const [clientService, setClientService] = useState("");
   const [signature, setSignature] = useState(modalDate ? modalDate.require : false);
   const loader = FindLoad("CREATE_APPOINTMENT");

   useEffect(() => {
      if (modalDate) {
         axios
            .get(`/authorization/client/${modalDate.client._id}`, { auth: true })
            .then((res) =>
               res.data.length
                  ? axios
                       .get(
                          `/authorizationservice/authorization/${res.data[res.data.length - 1].id}`,
                          { auth: true }
                       )
                       .then((date) => setClientService(date.data))
                  : ""
            )
            .catch(() => setClientService(""));
      }
   }, [modalDate]);

   const handleChange = (e) => {
      setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
      error === e.target.name && setError("");
   };

   const handleCreate = () => {
      const date = {
         type: "SERVICE",
         client: inputs.client,
         authorizedService: inputs.authorizedService,
         staff: inputs.staff,
         placeService: inputs.placeService,
         staffPayCode: inputs.staffPayCode,
         startDate: inputs.startDate && moment(inputs.startDate).format("YYYY-MM-DD"),
         eventStatus: inputs.eventStatus,
         startTime: times.startTime,
         endTime: times.endTime,
         eventStatus: inputs.eventStatus,
         status: "ACTIVE",
         require: signature,
      };
      if (
         inputs.client &&
         inputs.authorizedService &&
         inputs.staff &&
         inputs.placeService &&
         inputs.startDate &&
         times.startTime &&
         times.endTime &&
         inputs.staffPayCode
      ) {
         if (modalDate) {
            dispatch(appointmentActions.editAppointment(date, inputs._id));
         } else {
            dispatch(appointmentActions.createAppointment(date));
         }
      } else {
         setError(
            !inputs.client
               ? "client"
               : !inputs.authorizedService
               ? "authorizedService"
               : !inputs.staff
               ? "staff"
               : !inputs.placeService
               ? "placeService"
               : !inputs.startDate
               ? "startDate"
               : !times.startTime
               ? "startTime"
               : !times.endTime
               ? "endTime"
               : !inputs.staffPayCode
               ? "staffPayCode"
               : ""
         );
      }
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

   const handleSelect = (ev) => {
      setInputs((prevState) => ({ ...prevState, [ev.target.name]: ev.target.value }));
      ev.target.name === "staff" && dispatch(adminActions.getAllPaycodes(ev.target.value));
      ev.target.name === "client" && handleGetClientServ(ev.target.value);
   };
   const handleGetClientServ = (id) => {
      axios
         .get(`/authorization/client/${id}`, { auth: true })
         .then((res) =>
            res.data.length
               ? axios
                    .get(
                       `/authorizationservice/authorization/${res.data[res.data.length - 1].id}`,
                       { auth: true }
                    )
                    .then((date) => setClientService(date.data))
               : ""
         )
         .catch(() => setClientService(""));
   };

   const handleChangeSignature = () => {
      setSignature(!signature);
   };
   return (
      <div className={classes.serciveModall}>
         <p className={global.availableScheduleTitle}>
            {info ? "Edit the Service Appointment" : "Add a Service Appointment"}
         </p>
         <p className={classes.subTitle}>
            {"To add a Service Appointment, please fulfill the below fields."}
         </p>

         <div className={classes.seviceModalWrapper}>
            <div>
               <SelectInput
                  type={"id"}
                  language={null}
                  name={"client"}
                  label={"Client*"}
                  handleSelect={handleSelect}
                  value={inputs.client}
                  list={clientList ? clientList : []}
                  typeError={error === "client" && ErrorText.field}
               />
               <SelectInput
                  type={"service"}
                  language={null}
                  name={"authorizedService"}
                  label={"Authorized Service*"}
                  handleSelect={handleSelect}
                  value={inputs.authorizedService}
                  list={clientService ? clientService : []}
                  typeError={error === "authorizedService" && ErrorText.field}
               />
               <SelectInput
                  type={"id"}
                  language={null}
                  name={"staff"}
                  label={"Staff Member*"}
                  handleSelect={handleSelect}
                  value={inputs.staff}
                  list={staffList ? staffList : []}
                  typeError={error === "staff" && ErrorText.field}
               />
               <SelectInput
                  type={"id"}
                  language={null}
                  name={"placeService"}
                  label={"Place of Service*"}
                  handleSelect={handleSelect}
                  value={inputs.placeService}
                  list={places ? places : []}
                  typeError={error === "placeService" && ErrorText.field}
               />
            </div>

            <div>
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

               <div className={classes.signature}>
                  <p>Require Signature</p>
                  <Switch
                     onClick={handleChangeSignature}
                     className={inputClasses.switcher}
                     checked={signature}
                     name="require"
                     color="primary"
                  />
               </div>
            </div>
         </div>

         <CreateChancel
            loader={!!loader.length}
            create={info ? "Save" : "Add"}
            chancel={"Cancel"}
            onCreate={handleCreate}
            onClose={handleOpenClose}
            buttonWidth="47%"
         />
      </div>
   );
};
