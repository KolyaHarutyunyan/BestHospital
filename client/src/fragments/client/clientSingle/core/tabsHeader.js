import React, { useState } from "react";
import { editButtonStyle, serviceSingleStyles } from "./styles";
import { FindLoad, Images } from "@eachbase/utils";
import {
   AddButton,
   AddModalButton,
   SimpleModal,
   AddNotes,
   ValidationInput,
   AvailabilitySchedule,
} from "@eachbase/components";
import {
   AddContact,
   AddEnrollment,
   CreateClient,
   AddAuthorization,
   AddAuthorizationService,
} from "@eachbase/fragments/client";
import { fundingSourceActions } from "@eachbase/store";
import { useDispatch } from "react-redux";

const filterBtn = {
   width: 93,
   height: 36,
};

export const TabsHeader = ({
   activeTab,
   data,
   authActive,
   availabilityData,
}) => {
   const classes = serviceSingleStyles();
   const dispatch = useDispatch();
   const [open, setOpen] = useState();
   const [searchDate, setSearchDate] = useState("");

   const clientHistoryLoader = !!FindLoad("GET_FUNDING_SOURCE_HISTORIES_BY_ID")
      .length;

   const handleOpenClose = () => {
      setOpen(!open);
   };

   const handleChangeDate = (e) => {
      setSearchDate(e.target.value);
   };

   const handleSubmit = () => {
      dispatch(
         fundingSourceActions.getFundingSourceHistoriesById(
            "Client",
            searchDate && new Date(searchDate).toISOString()
         )
      );
   };

   return (
      <div>
         <ul className={classes.tabsWrapper}>
            <li style={{ display: "flex", alignItems: "center" }}>
               <img
                  src={Images.userProfile}
                  alt="avatar"
                  className={classes.avatar}
               />
               <div className={classes.nameContent}>
                  <h1 className={classes.name}>
                     {data ? `${data?.firstName} ${data?.lastName}` : ""}
                  </h1>
               </div>
            </li>
            <li className={classes.headerRight}>
               {activeTab === 6 ? (
                  <>
                     <div className={classes.searchContainer}>
                        <ValidationInput
                           className={classes.dateInput}
                           errorFalse={true}
                           variant={"outlined"}
                           onChange={(e) => handleChangeDate(e)}
                           value={searchDate}
                           type={"date"}
                           name="searchDate"
                        />
                        <AddModalButton
                           handleClick={handleSubmit}
                           text="Search"
                           btnStyles={filterBtn}
                           loader={clientHistoryLoader}
                        />
                     </div>
                  </>
               ) : activeTab === 0 ? (
                  <AddModalButton
                     btnStyles={editButtonStyle}
                     handleClick={() => setOpen(true)}
                     text="Edit"
                  />
               ) : activeTab === 4 ? (
                  <AddButton
                     text="Available Hours"
                     handleClick={handleOpenClose}
                  />
               ) : activeTab !== 6 && activeTab !== 4 ? (
                  <AddButton
                     text={
                        authActive
                           ? "Add Authorization Service"
                           : activeTab === 1
                           ? "Add Contact"
                           : activeTab === 2
                           ? "Add Enrollments"
                           : activeTab === 3
                           ? "Add Authorization"
                           : "Add Notes"
                     }
                     handleClick={handleOpenClose}
                  />
               ) : null}
            </li>
         </ul>
         <SimpleModal
            openDefault={open}
            handleOpenClose={handleOpenClose}
            content={
               authActive ? (
                  <AddAuthorizationService handleClose={handleOpenClose} />
               ) : activeTab === 0 ? (
                  <CreateClient info={data} handleClose={handleOpenClose} />
               ) : activeTab === 1 ? (
                  <AddContact handleClose={handleOpenClose} />
               ) : activeTab === 2 ? (
                  <AddEnrollment handleClose={handleOpenClose} />
               ) : activeTab === 3 ? (
                  <AddAuthorization handleClose={handleOpenClose} />
               ) : activeTab === 4 ? (
                  <AvailabilitySchedule
                     onModel={"Client"}
                     availabilityData={availabilityData}
                     handleClose={handleOpenClose}
                  />
               ) : activeTab === 5 ? (
                  <AddNotes model="Client" handleClose={handleOpenClose} />
               ) : null
            }
         />
      </div>
   );
};
