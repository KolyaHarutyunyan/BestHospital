import React, { useEffect, useState } from "react";
import {
   CreateChancel,
   Loader,
   SelectInput,
   ValidationInput,
} from "@eachbase/components";
import {
   ErrorText,
   FindError,
   FindLoad,
   FindSuccess,
   getActiveDatas,
   getDynamicContent,
} from "@eachbase/utils";
import { scheduleModalsStyle } from "./styles";
import { modalsStyle } from "@eachbase/components/modal/styles";
import { useDispatch } from "react-redux";
import {
   adminActions,
   appointmentActions,
   httpRequestsOnSuccessActions,
} from "@eachbase/store";
import axios from "axios";
import moment from "moment";
import { Switch } from "@material-ui/core";
import { inputsStyle } from "@eachbase/components/inputs/styles";

export const Service = ({
   handleOpenClose,
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
              authorizedService: modalDate.authorizedService
                 ? modalDate.authorizedService._id
                 : "",
              staff: modalDate.staff._id,
              placeService: modalDate.placeService._id,
              staffPayCode: modalDate.staffPayCode._id,
           }
         : day
         ? { ...day, ...createModalDate }
         : createModalDate
         ? { ...createModalDate }
         : {}
   );
   const [times, setTimes] = useState(date ? { ...date } : {});
   const [error, setError] = useState("");
   const [clientService, setClientService] = useState("");
   const [signature, setSignature] = useState(
      modalDate ? modalDate.require : false
   );

   const success = modalDate
      ? FindSuccess("EDIT_APPOINTMENT")
      : FindSuccess("CREATE_APPOINTMENT");
   const loader = modalDate
      ? FindLoad("EDIT_APPOINTMENT")
      : FindLoad("CREATE_APPOINTMENT");

   // ** waiting for back error message to continue with backError variable ...**
   const backError = modalDate
      ? FindError("EDIT_APPOINTMENT")
      : FindError("CREATE_APPOINTMENT");

   useEffect(() => {
      if (!success) return;
      handleOpenClose();
      if (modalDate) {
         dispatch(
            httpRequestsOnSuccessActions.removeSuccess("EDIT_APPOINTMENT")
         );
      } else {
         dispatch(
            httpRequestsOnSuccessActions.removeSuccess("CREATE_APPOINTMENT")
         );
      }
   }, [success]);

   const [editLoader, setEditLoader] = useState(false);
   useEffect(() => {
      if (modalDate) {
         setEditLoader(true);
         axios
            .get(`/authorization/client/${modalDate.client._id}`, {
               auth: true,
            })
            .then((res) =>
               res.data.length
                  ? axios
                       .get(
                          `/authorizationservice/authorization/${
                             res.data[res.data.length - 1].id
                          }`,
                          { auth: true }
                       )
                       .then((date) => {
                          setClientService(date.data);
                          setEditLoader(false);
                       })
                  : ""
            )
            .catch(() => {
               setEditLoader(false);
               setClientService("");
            });
      }
   }, [modalDate]);

   const handleChange = (e) => {
      setInputs((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
      error === e.target.name && setError("");
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
      (e.target.name === error || error === ErrorText.timeError) &&
         setError("");
   };

   const handleSelect = (ev) => {
      setInputs((prevState) => ({
         ...prevState,
         [ev.target.name]: ev.target.value,
      }));
      ev.target.name === "staff" &&
         dispatch(adminActions.getAllPaycodes(ev.target.value));
      ev.target.name === "client" && handleGetClientServ(ev.target.value);
      setError("");
   };

   const handleGetClientServ = (id) => {
      axios
         .get(`/authorization/client/${id}`, { auth: true })
         .then((res) =>
            res.data.length
               ? axios
                    .get(
                       `/authorizationservice/authorization/${
                          res.data[res.data.length - 1].id
                       }`,
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

   const handleCreate = () => {
      const timeComparingIsValid =
         !!times.startTime &&
         !!times.endTime &&
         Date.parse(times.startTime) < Date.parse(times.endTime);

      const serviceAppointmentDataIsVlid =
         inputs.client &&
         inputs.authorizedService &&
         inputs.staff &&
         inputs.placeService &&
         inputs.startDate &&
         timeComparingIsValid &&
         inputs.staffPayCode;

      if (serviceAppointmentDataIsVlid) {
         const data = {
            type: "SERVICE",
            client: inputs.client,
            authorizedService: inputs.authorizedService,
            staff: inputs.staff,
            placeService: inputs.placeService,
            staffPayCode: inputs.staffPayCode,
            startDate:
               inputs.startDate &&
               moment(inputs.startDate).format("YYYY-MM-DD"),
            eventStatus: inputs.eventStatus ? inputs.eventStatus : "PENDING",
            startTime: times.startTime,
            endTime: times.endTime,
            status: "ACTIVE",
            require: signature,
         };

         if (modalDate) {
            dispatch(appointmentActions.editAppointment(data, inputs._id));
         } else {
            dispatch(appointmentActions.createAppointment(data));
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
               : !timeComparingIsValid
               ? ErrorText.timeError
               : !inputs.staffPayCode
               ? "staffPayCode"
               : ""
         );
      }
   };

   const titleContent = getDynamicContent(
      "TITLE",
      modalDate,
      "Service Appointment"
   );
   const subtitleContent = getDynamicContent(
      "SUBTITLE",
      modalDate,
      "Service Appointment"
   );

   const activeStaffPaycodes = getActiveDatas(allPaycodes);

   return (
      <div className={classes.serciveModall}>
         {editLoader === true ? (
            <div style={{ height: "456px" }}>
               <Loader />
            </div>
         ) : (
            <>
               <p className={global.availableScheduleTitle}>{titleContent}</p>
               <p className={classes.subTitle}>{subtitleContent}</p>

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
                        typeError={
                           error === "authorizedService" && ErrorText.field
                        }
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
                           typeError={
                              error === "endTime"
                                 ? ErrorText.field
                                 : error === ErrorText.timeError
                                 ? ErrorText.timeError
                                 : ""
                           }
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
                        list={activeStaffPaycodes}
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
                  create={modalDate ? "Save" : "Add"}
                  chancel={"Cancel"}
                  onCreate={handleCreate}
                  onClose={handleOpenClose}
                  buttonWidth="47%"
               />
            </>
         )}
      </div>
   );
};
