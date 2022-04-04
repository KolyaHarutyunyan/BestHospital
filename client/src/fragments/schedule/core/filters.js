import React, { useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";
import { scheduleStyle } from "./styles";
import {
   AddModalButton,
   ButtonsTab,
   ValidationInput,
} from "@eachbase/components";
import { InputBase, InputLabel, NativeSelect, styled } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { useDispatch } from "react-redux";
import { appointmentActions } from "@eachbase/store";

const filterBtn = {
   width: 93,
   height: 36,
};

export const Filters = ({
   goToBack,
   goToNext,
   label,
   handleChangeScreenView,
   viewType,
   handleOpen,
   adminsList,
   clientList,
   handleSendDate,
}) => {
   const BootstrapInput = styled(InputBase)(({ theme }) => ({
      marginRight: "24px",
      "label + &": {
         marginTop: theme.spacing(3),
      },
      "& .MuiInputBase-input": {
         borderRadius: 4,
         width: 200,
         position: "relative",
         backgroundColor: theme.palette.background.paper,
         border: "1px solid #ced4da",
         fontSize: 16,
         padding: "10px 26px 10px 12px",
         transition: theme.transitions.create(["border-color", "box-shadow"]),
         fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
         ].join(","),
         "&:focus": {
            borderRadius: 4,
            borderColor: "#80bdff",
            boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
         },
      },
   }));

   const [inputs, setInputs] = useState({});
   const [screen, setScreen] = useState("calendar");
   const [filterDate, setFilterDate] = useState("");
   const [isDisabled, setIsDisabled] = useState(false);

   const classes = scheduleStyle();

   const dispatch = useDispatch();

   const handleChange = (e) => {
      e.target.value === "All"
         ? setInputs((prevState) => ({ ...prevState, [e.target.name]: "All" }))
         : setInputs((prevState) => ({
              ...prevState,
              [e.target.name]: e.target.value,
           }));
   };

   const handleChangeDate = (e) => {
      setIsDisabled(false);
      setFilterDate(e.target.value);
   };

   const handleFilter = () => {
      setIsDisabled(true);
      dispatch(appointmentActions.searchAppointmentDate(filterDate));
   };

   useEffect(() => {
      const newFilters = {
         staff: inputs.staff,
         client: inputs.client,
         type: inputs.type,
         eventStatus: inputs.eventStatus,
      };
      delete newFilters[inputs.staff === "All" ? "staff" : ""];
      delete newFilters[inputs.client === "All" ? "client" : ""];
      delete newFilters[inputs.type === "All" ? "type" : ""];
      delete newFilters[inputs.eventStatus === "All" ? "eventStatus" : ""];
      handleSendDate && handleSendDate(newFilters);
      dispatch(appointmentActions.getAppointmentFiltered(newFilters));
   }, [inputs]);

   const handleChangeScreen = (type) => {
      setScreen(type);
      handleChangeScreenView && handleChangeScreenView(type);
   };

   return (
      <div className={classes.selectButtonsLabel}>
         <div className={classes.calendarNextPrewButtons}>
            <div className={classes.buttonsWrapper}>
               <ButtonsTab
                  viewType={viewType}
                  getActive={() => handleChangeScreen("list")}
                  getInactive={() => handleChangeScreen("calendar")}
                  first={"List View"}
                  second={"Calendar View"}
               />
               <div className={classes.dateStyle}>
                  <span> {label}</span>
               </div>

               <div className={classes.navigationButtons}>
                  <NavigateBefore
                     style={{ color: "#387DFF", cursor: "pointer" }}
                     onClick={() => goToBack()}
                  />
                  <NavigateNext
                     style={{ color: "#387DFF", cursor: "pointer" }}
                     onClick={() => goToNext()}
                  />
               </div>
            </div>
            <div className={classes.searchWrapper}>
               <ValidationInput
                  variant={"outlined"}
                  onChange={handleChangeDate}
                  value={filterDate}
                  type={"date"}
                  label={""}
                  size={"small"}
                  name="filterDate"
               />
               <AddModalButton
                  disabled={!filterDate.length}
                  handleClick={handleFilter}
                  text="Search"
                  btnStyles={filterBtn}
                  disabled={isDisabled}
               />
            </div>
         </div>
         <div className={classes.filtersWrapper}>
            <div className={classes.filtersWrapperRow}>
               <div>
                  <FormControl sx={{ m: 1 }} variant="standard">
                     <InputLabel
                        className={classes.label}
                        htmlFor="demo-customized-select-native"
                     >
                        Staff Member
                     </InputLabel>
                     <NativeSelect
                        id="demo-customized-select-native"
                        value={inputs.staff}
                        name={"staff"}
                        onChange={handleChange}
                        input={<BootstrapInput />}
                     >
                        <option value="All">All</option>
                        {adminsList &&
                           adminsList.staff &&
                           adminsList.staff.map((i, j) => (
                              <option
                                 key={j}
                                 value={i.id}
                              >{`${i.firstName} ${i.lastName}`}</option>
                           ))}
                     </NativeSelect>
                  </FormControl>
               </div>
               <div>
                  <FormControl sx={{ m: 1 }} variant="standard">
                     <InputLabel
                        className={classes.label}
                        htmlFor="demo-customized-select-native"
                     >
                        Client
                     </InputLabel>
                     <NativeSelect
                        id="demo-customized-select-native"
                        value={inputs.client}
                        name={"client"}
                        onChange={handleChange}
                        input={<BootstrapInput />}
                     >
                        <option value="All">All</option>
                        {clientList &&
                           clientList.clients &&
                           clientList.clients.map((i, j) => (
                              <option
                                 key={j}
                                 value={i.id}
                              >{`${i.firstName} ${i.lastName}`}</option>
                           ))}
                     </NativeSelect>
                  </FormControl>
               </div>
               <div>
                  <FormControl sx={{ m: 1 }} variant="standard">
                     <InputLabel
                        className={classes.label}
                        htmlFor="demo-customized-select-native"
                     >
                        Event Type
                     </InputLabel>
                     <NativeSelect
                        id="demo-customized-select-native"
                        name={"type"}
                        value={inputs.type}
                        onChange={handleChange}
                        input={<BootstrapInput />}
                     >
                        <option value="All">All</option>
                        <option value={"DRIVE"}>Drive</option>
                        <option value={"PAID"}>Paid</option>
                        <option value={"BREAK"}>Break</option>
                        <option value={"SERVICE"}>Service</option>
                     </NativeSelect>
                  </FormControl>
               </div>
               <div>
                  <FormControl sx={{ m: 1 }} variant="standard">
                     <InputLabel
                        className={classes.label}
                        htmlFor="demo-customized-select-native"
                     >
                        Event Status
                     </InputLabel>
                     <NativeSelect
                        id="demo-customized-select-native"
                        name={"eventStatus"}
                        value={inputs.eventStatus}
                        onChange={handleChange}
                        input={<BootstrapInput />}
                     >
                        <option value="All">All</option>
                        <option value={"RENDERED"}>Rendered</option>
                        <option value={"COMPLETED"}>Completed</option>
                        <option value={"NOTRENDERED"}>Not Rendered</option>
                        <option value={"PENDING"}>Pending</option>
                        <option value={"CANCELLED"}>Cancelled</option>
                     </NativeSelect>
                  </FormControl>
               </div>
            </div>
            <div onClick={handleOpen} className={classes.addEvent}>
               <div>+</div>
               <p>Add Event</p>
            </div>
         </div>
      </div>
   );
};
