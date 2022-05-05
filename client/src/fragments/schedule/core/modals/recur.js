import { CloseButton, CreateChancel, ErrMessage } from "@eachbase/components";
import React, { useState } from "react";
import { modalsStyle } from "@eachbase/components/modal/styles";
import { scheduleModalsStyle } from "./styles";
import { appointmentActions } from "@eachbase/store";
import { useDispatch } from "react-redux";
import { FindLoad } from "@eachbase/utils";
import { DailyPattern, MonthlyPattern, WeeklyPattern } from "./modePatterns/modePatterns";
import { RecurEventDates } from "./common/recurEventDates";
import { Mode } from "./common/mode";

const initialInputs = {
   mode: "DAILY",
   startDate: "",
   endDate: "",
   repeatCountWeek: "",
   repeatDayMonth: "",
   repeatMonth: "",
   repeatConsecutive: "",
   repeatCount: "",
   repeatCountCheckbox: "",
};

export const Recur = ({ openCloseRecur, date }) => {
   const global = modalsStyle();
   const classes = scheduleModalsStyle();

   const dispatch = useDispatch();

   const loader = FindLoad("APPOINTMENT_REPEAT");

   const [inputs, setInputs] = useState(initialInputs);
   const [occurrence, setOccurrence] = useState(0);
   const [state, setState] = React.useState([]);
   const [error, setError] = React.useState("");

   function handleChange(e) {
      setInputs((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
      if (e.target.name === "mode" || e.target.name === "repeatCountCheckbox") {
         setOccurrence(0);
         if (e.target.name === "repeatCountCheckbox") {
            delete inputs["repeatConsecutive"];
         }
      }
      e.target.name === "repeatConsecutive" && setOccurrence(0),
         delete inputs["repeatCount"] && delete inputs["repeatCountCheckbox"];
      e.target.name === "repeatCount" && setOccurrence(0),
         delete inputs["repeatConsecutive"];
   }

   function handleChangeDay(e) {
      setInputs((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
      const startDate = new Date(inputs.startDate);
      const endDate = new Date(new Date(inputs.endDate).setHours(23, 59, 59));
      let count = 0;
      let dates = [],
         x;
      for (
         let d = startDate;
         d <= endDate;
         d.setDate(d.getDate() + +e.target.value + 1)
      ) {
         count++;
         x = new Date(d.getTime());
         dates.push(x);
      }
      setOccurrence(count);
   }

   function handleChangeConsecutive(e) {
      e.target.name === "repeatConsecutive" && setOccurrence(0),
         delete inputs["repeatCount"] && delete inputs["repeatCountCheckbox"];
      setInputs((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
      const startDate = new Date(inputs.startDate);
      const endDate = new Date(new Date(inputs.endDate).setHours(23, 59, 59));
      let count = 0;
      const curDate = new Date(startDate.getTime());
      let dates = [],
         x;
      while (curDate <= endDate) {
         const dayOfWeek = curDate.getDay();
         if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            x = new Date(curDate.getTime());
            dates.push(x);
            count++;
         }
         curDate.setDate(curDate.getDate() + 1);
      }
      setOccurrence(count);
   }

   function handleChangeWeek(e) {
      setInputs((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
      const repeatCheckWeek = [...state];
      const weeks = [];
      let totalCount = 0;
      const startDate = new Date(inputs.startDate);
      const endDate = new Date(inputs.endDate);
      let current = true;
      let dates = [],
         x;
      let dayCount = {
         0: { sum: 0, date: [] },
         1: { sum: 0, date: [] },
         2: { sum: 0, date: [] },
         3: { sum: 0, date: [] },
         4: { sum: 0, date: [] },
         5: { sum: 0, date: [] },
         6: { sum: 0, date: [] },
      };
      for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
         dayCount[d.getDay()].sum++;
         x = new Date(d.getTime());
         dayCount[d.getDay()].date.push(x);
         if (d.getDay() === 5) current = true;
         if (d.getDay() === 0 && current) {
            d.setDate(d.getDate() + 7 * e.target.value);
            current = false;
         }
      }
      repeatCheckWeek.map((days) => {
         const day = Number(days);
         const obj = {};
         obj[day] = dayCount[days];
         weeks.push(obj[day].date);
         totalCount += dayCount[days].sum;
      });
      for (let prop of weeks) {
         prop.map((date) => {
            dates.push(date);
         });
      }
      setOccurrence(totalCount);
   }

   function handleChangeWeeks(e) {
      if (e.target.checked) {
         state.push(+e.target.value);
      } else {
         for (let i = 0; i < state.length; i++) {
            if (state[i] === +e.target.value) {
               state.splice(i, 1);
            }
         }
      }
      const repeatCheckWeek = [...state];
      const weeks = [];
      let totalCount = 0;
      const startDate = new Date(inputs.startDate);
      const endDate = new Date(inputs.endDate);
      let current = true;
      let dates = [],
         x;
      let dayCount = {
         0: { sum: 0, date: [] },
         1: { sum: 0, date: [] },
         2: { sum: 0, date: [] },
         3: { sum: 0, date: [] },
         4: { sum: 0, date: [] },
         5: { sum: 0, date: [] },
         6: { sum: 0, date: [] },
      };
      for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
         dayCount[d.getDay()].sum++;
         x = new Date(d.getTime());
         dayCount[d.getDay()].date.push(x);
         if (d.getDay() === 5) current = true;
         if (d.getDay() === 0 && current) {
            d.setDate(
               d.getDate() + (7 * inputs.repeatCountWeek ? inputs.repeatCountWeek : 0)
            );
            current = false;
         }
      }
      repeatCheckWeek.map((days) => {
         const day = Number(days);
         const obj = {};
         obj[day] = dayCount[days];
         weeks.push(obj[day].date);
         totalCount += dayCount[days].sum;
      });
      for (let prop of weeks) {
         prop.map((date) => {
            dates.push(date);
         });
      }
      setOccurrence(totalCount);
   }

   function handleChangeMounthDay(e) {
      setInputs((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
      const appointments = [];
      let start = new Date(inputs.startDate);
      let end = new Date(inputs.endDate);
      let count = 0;
      let dates = [],
         x;
      for (let d = start; d <= end; d.setMonth(d.getMonth() + 1)) {
         if (d.getMonth() === end.getMonth() && end.getDate() < +e.target.value) {
            break;
         }
         x = new Date(d.getTime());
         count++;
         dates.push(x);
         d.setMonth(d.getMonth() + 0);
      }
      setOccurrence(count);
   }

   function handleChangeMounth(e) {
      setInputs((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
      const appointments = [];
      let start = new Date(inputs.startDate);
      let end = new Date(inputs.endDate);
      let count = 0;
      let dates = [],
         x;
      for (let d = start; d <= end; d.setMonth(d.getMonth() + 1)) {
         if (d.getMonth() === end.getMonth() && end.getDate() < +inputs.repeatDayMonth) {
            break;
         }
         x = new Date(d.getTime());
         count++;
         dates.push(x);
         d.setMonth(d.getMonth() + +e.target.value);
      }
      setOccurrence(count);
   }

   function handleRecur() {
      const repeat = !!inputs.repeatCount
         ? inputs.repeatCount
         : !!inputs.repeatConsecutive
         ? inputs.repeatConsecutive
         : "";

      const typeBool =
         inputs.mode === "DAILY"
            ? !!inputs.startDate && !!inputs.endDate && !!repeat
            : inputs.mode === "WEEKLY"
            ? !!inputs.startDate &&
              !!inputs.endDate &&
              !!inputs.repeatCountWeek &&
              !!state.length
            : !!inputs.startDate &&
              !!inputs.endDate &&
              !!inputs.repeatDayMonth &&
              !!inputs.repeatMonth;

      const week = {
         startDate: new Date(inputs.startDate),
         endDate: new Date(inputs.endDate),
         mode: inputs.mode,
         repeatCountWeek: +inputs.repeatCountWeek,
         repeatCheckWeek: [...state],
      };

      const mounthObject = {
         startDate: new Date(inputs.startDate),
         endDate: new Date(inputs.endDate),
         mode: inputs.mode,
         repeatDayMonth: +inputs.repeatDayMonth,
         repeatMonth: +inputs.repeatMonth,
      };

      !inputs.repeatDayMonth ? delete mounthObject["repeatDayMonth"] : "";
      !inputs.repeatMonth ? delete mounthObject["repeatMonth"] : "";

      const newObject =
         inputs.repeatConsecutive === "repeatConsecutive"
            ? {
                 startDate: new Date(inputs.startDate),
                 endDate: new Date(inputs.endDate),
                 mode: inputs.mode,
                 repeatConsecutive: true,
              }
            : {
                 startDate: new Date(inputs.startDate),
                 endDate: new Date(inputs.endDate),
                 mode: inputs.mode,
                 repeatCount: +inputs.repeatCount,
              };

      const obj =
         inputs.mode === "WEEKLY"
            ? week
            : inputs.mode === "MONTHLY"
            ? mounthObject
            : newObject;

      if (typeBool) {
         dispatch(appointmentActions.appointmentRepeat(date._id, obj));
      } else {
         setError("Inputs are not field");
      }
   }

   return (
      <div className={global.inactiveModalBody}>
         <div className={global.positionedButton}>
            <CloseButton handleCLic={openCloseRecur} />
         </div>
         <p className={global.availableScheduleTitle}>Recur Event</p>
         <p className={classes.subTitle}>
            To recur event, please fulfill the below fields.
         </p>
         <div className={classes.recurBody}>
            <RecurEventDates inputs={inputs} handleChange={handleChange} />
            <Mode inputs={inputs} handleChange={handleChange} />
            <div className={classes.dayWeekMounth}>
               <p className={classes.recurTitle}>Patterns</p>
               {inputs.mode === "DAILY" ? (
                  <DailyPattern
                     handleChange={handleChange}
                     handleChangeDay={handleChangeDay}
                     handleChangeConsecutive={handleChangeConsecutive}
                     inputs={inputs}
                  />
               ) : inputs.mode === "WEEKLY" ? (
                  <WeeklyPattern
                     inputs={inputs}
                     handleChangeWeek={handleChangeWeek}
                     handleChangeWeeks={handleChangeWeeks}
                  />
               ) : inputs.mode === "MONTHLY" ? (
                  <MonthlyPattern
                     inputs={inputs}
                     handleChangeMounthDay={handleChangeMounthDay}
                     handleChangeMounth={handleChangeMounth}
                  />
               ) : null}
            </div>
            <div className={classes.occurance}>
               <p>Occurrence:</p>
               <span>{occurrence}</span>
            </div>
            <ErrMessage text={error ? error : ""} />
            <CreateChancel
               loader={!!loader.length}
               create={"Recur"}
               chancel={"Cancel"}
               onCreate={handleRecur}
               onClose={openCloseRecur}
               buttonWidth="192px"
            />
         </div>
      </div>
   );
};
