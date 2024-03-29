import React, { useEffect, useState } from "react";
import {
   CreateChancel,
   Loader,
   SelectInput,
   ValidationInput,
} from "@eachbase/components";
import { ErrorText, FindError, FindLoad, FindSuccess, isNotEmpty } from "@eachbase/utils";
import { scheduleModalsStyle } from "./styles";
import { modalsStyle } from "@eachbase/components/modal/styles";
import { useDispatch } from "react-redux";
import {
   adminActions,
   appointmentActions,
   httpRequestsOnErrorsActions,
   httpRequestsOnSuccessActions,
} from "@eachbase/store";
import axios from "axios";
import moment from "moment";
import { Switch } from "@material-ui/core";
import { inputsStyle } from "@eachbase/components/inputs/styles";
import { getDynamicContent } from "./constants";

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
   const classes = scheduleModalsStyle();
   const global = modalsStyle();
   const inputClasses = inputsStyle();

   const dispatch = useDispatch();

   const [inputs, setInputs] = useState(
      modalDate
         ? {
              ...modalDate,
              client: modalDate.client?._id,
              authorizedService: modalDate.authorizedService?._id,
              staff: modalDate.staff?._id,
              placeService: modalDate.placeService?._id,
              staffPayCode: modalDate.staffPayCode?._id,
           }
         : day
         ? { ...day, ...createModalDate }
         : createModalDate
         ? { ...createModalDate }
         : {}
   );
   const [times, setTimes] = useState(date ? { ...date } : {});
   const [error, setError] = useState("");
   const [clientService, setClientService] = useState([]);
   const [signature, setSignature] = useState(modalDate ? modalDate.signature : false);
   const [editLoader, setEditLoader] = useState(false);

   const success = modalDate
      ? FindSuccess("EDIT_APPOINTMENT")
      : FindSuccess("CREATE_APPOINTMENT");
   const loader = modalDate
      ? FindLoad("EDIT_APPOINTMENT")
      : FindLoad("CREATE_APPOINTMENT");
   const backError = modalDate
      ? FindError("EDIT_APPOINTMENT")
      : FindError("CREATE_APPOINTMENT");

   const appmtIsOverlapping = backError[0]?.error === "appointment overlapping";

   useEffect(() => {
      if (appmtIsOverlapping) {
         setError(ErrorText.overlappingError("Appointments"));
      }
   }, [appmtIsOverlapping]);

   useEffect(() => {
      if (!!success.length) {
         handleOpenClose();
         if (modalDate) {
            dispatch(httpRequestsOnSuccessActions.removeSuccess("EDIT_APPOINTMENT"));
         } else {
            dispatch(httpRequestsOnSuccessActions.removeSuccess("CREATE_APPOINTMENT"));
         }
      }
   }, [success]);

   useEffect(() => {
      if (modalDate) {
         setEditLoader(true);
         axios
            .get(`/auth/client/${modalDate.client._id}`, {
               auth: true,
            })
            .then((res) =>
               res.data.length
                  ? axios
                       .get(`/authservice/auth/${res.data[res.data.length - 1].id}`, {
                          auth: true,
                       })
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
      if (error === e.target.name) {
         setError("");
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
      if (
         error === e.target.name ||
         error === ErrorText.timeError ||
         error === ErrorText.overlappingError("Appointments")
      ) {
         setError("");
      }
      if (!!backError.length) {
         dispatch(httpRequestsOnErrorsActions.removeError(backError.type));
      }
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

   function handleGetClientServ(id) {
      setClientService("");
      axios
         .get(`/auth/client/${id}`, { auth: true })
         .then((res) =>
            res.data.length
               ? axios
                    .get(`/authservice/auth/${res.data[res.data.length - 1].id}`, {
                       auth: true,
                    })
                    .then((date) => setClientService(date.data))
               : ""
         )
         .catch(() => setClientService(""));
   }

   const handleCreate = () => {
      const timeComparingIsValid =
         !!times.startTime &&
         !!times.endTime &&
         Date.parse(times.startTime) < Date.parse(times.endTime);
      const serviceAppointmentDataIsVlid =
         isNotEmpty(inputs.client) &&
         isNotEmpty(inputs.authorizedService) &&
         isNotEmpty(inputs.staff) &&
         isNotEmpty(inputs.placeService) &&
         !!inputs.startDate &&
         timeComparingIsValid &&
         isNotEmpty(inputs.staffPayCode);
      if (serviceAppointmentDataIsVlid) {
         const data = {
            type: "SERVICE",
            client: inputs.client,
            authorizedService: inputs.authorizedService,
            staff: inputs.staff,
            placeService: inputs.placeService,
            staffPayCode: inputs.staffPayCode,
            startDate: inputs.startDate && moment(inputs.startDate).format("YYYY-MM-DD"),
            eventStatus: inputs.eventStatus ? inputs.eventStatus : "PENDING",
            startTime: times.startTime,
            endTime: times.endTime,
            status: "ACTIVE",
            require: signature,
            signature: signature,
         };
         if (modalDate) {
            dispatch(appointmentActions.editAppointment(data, inputs._id));
         } else {
            dispatch(appointmentActions.createAppointment(data));
         }
      } else {
         const dataErrorText = !isNotEmpty(inputs.client)
            ? "client"
            : !isNotEmpty(inputs.authorizedService)
            ? "authorizedService"
            : !isNotEmpty(inputs.staff)
            ? "staff"
            : !isNotEmpty(inputs.placeService)
            ? "placeService"
            : !inputs.startDate
            ? "startDate"
            : !times.startTime
            ? "startTime"
            : !times.endTime
            ? "endTime"
            : !timeComparingIsValid
            ? ErrorText.timeError
            : !isNotEmpty(inputs.staffPayCode)
            ? "staffPayCode"
            : "";
         setError(dataErrorText);
      }
   };

   const titleContent = getDynamicContent("TITLE", modalDate, "Service Appointment");
   const subtitleContent = getDynamicContent(
      "SUBTITLE",
      modalDate,
      "Service Appointment"
   );

   const activeStaffPaycodes = allPaycodes
      .filter((data) => data.active)
      .map((staffPaycode) => ({
         ...staffPaycode,
         name: staffPaycode.payCodeTypeId.name,
      }));

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
                        typeError={error === "client" ? ErrorText.selectField : ""}
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
                           error === "authorizedService" ? ErrorText.selectField : ""
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
                        typeError={error === "staff" ? ErrorText.selectField : ""}
                     />
                     <SelectInput
                        type={"id"}
                        language={null}
                        name={"placeService"}
                        label={"Place of Service*"}
                        handleSelect={handleSelect}
                        value={inputs.placeService}
                        list={places ? places : []}
                        typeError={error === "placeService" ? ErrorText.selectField : ""}
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
                           typeError={
                              error === "startTime"
                                 ? ErrorText.field
                                 : error === ErrorText.overlappingError("Appointments")
                                 ? ErrorText.overlappingError("Appointments")
                                 : ""
                           }
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
                              ? inputs.staffPayCode?._id
                                 ? inputs.staffPayCode?._id
                                 : inputs.staffPayCode
                              : inputs.staffPayCode
                        }
                        list={activeStaffPaycodes}
                        typeError={error === "staffPayCode" ? ErrorText.selectField : ""}
                     />
                     <div className={classes.signatureStyle}>
                        <p>Require Signature</p>
                        <Switch
                           onClick={() => setSignature((prevState) => !prevState)}
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
