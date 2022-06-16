import React, { useState } from "react";
import { editButtonStyle, serviceSingleStyles } from "./styles";
import { FindLoad, Images, makeCapitalize } from "@eachbase/utils";
import {
   AddButton,
   AddModalButton,
   SimpleModal,
   AddNotes,
   ValidationInput,
   // AvailabilitySchedule,
   SimpleTooltip,
} from "@eachbase/components";
import {
   AddContact,
   AddEnrollment,
   CreateClient,
   AddAuthorization,
   AddAuthorizationService,
} from "@eachbase/fragments/client";
import { historyActions } from "@eachbase/store";
import { useDispatch, useSelector } from "react-redux";

const filterBtn = {
   width: 93,
   height: 36,
};

export const TabsHeader = ({ activeTab, data, authActive, availabilityData }) => {
   const classes = serviceSingleStyles();

   const dispatch = useDispatch();

   const _activeEnrollments = useSelector(
      (state) => state?.client?.clientEnrollment
   ).filter((item) => !item.terminationDate);

   const [open, setOpen] = useState();
   const [searchDate, setSearchDate] = useState("");
   const [isDisabled, setIsDisabled] = useState(false);

   const clientHistoryLoader = !!FindLoad("GET_HISTORY").length;

   const handleOpenClose = () => {
      setOpen((prevState) => !prevState);
   };

   const handleChangeDate = (e) => {
      setIsDisabled(false);
      setSearchDate(e.target.value);
   };

   const handleSubmit = () => {
      setIsDisabled(true);
      const paramsForClientHistory = {
         onResource: data?.id,
         start: searchDate && new Date(searchDate).toISOString(),
      };
      dispatch(historyActions.getHistory("Client", paramsForClientHistory));
   };

   return (
      <div>
         <ul className={classes.tabsWrapper}>
            <li style={{ display: "flex", alignItems: "center" }}>
               <img src={Images.userProfile} alt="avatar" className={classes.avatar} />
               <div className={classes.nameContent}>
                  <h1 className={classes.name}>
                     {data ? makeCapitalize(`${data?.firstName} ${data?.lastName}`) : ""}
                  </h1>
               </div>
            </li>
            <li className={classes.headerRight}>
               {activeTab === 5 ? (
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
                           disabled={isDisabled}
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
                  <AddButton text="Add Notes" handleClick={handleOpenClose} />
               ) : activeTab !== 6 && activeTab !== 4 ? (
                  activeTab === 3 && !_activeEnrollments?.length ? (
                     <SimpleTooltip
                        title={
                           <p className={classes.infoTextForAuthStyle}>
                              You can only add Authorization if you have at least one
                              Enrollment.
                           </p>
                        }
                        placement="top-end"
                     >
                        <div>
                           <AddButton text={"Add Authorization"} disabled={true} />
                        </div>
                     </SimpleTooltip>
                  ) : (
                     <AddButton
                        text={
                           authActive
                              ? "Add Authorized Service"
                              : activeTab === 1
                              ? "Add Contact"
                              : activeTab === 2
                              ? "Add Enrollments"
                              : activeTab === 3
                              ? "Add Authorization"
                              : "Available Hours"
                        }
                        handleClick={handleOpenClose}
                     />
                  )
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
                  <CreateClient info={data} handleClose={() => setOpen(false)} />
               ) : activeTab === 1 ? (
                  <AddContact handleClose={handleOpenClose} />
               ) : activeTab === 2 ? (
                  <AddEnrollment handleClose={handleOpenClose} />
               ) : activeTab === 3 ? (
                  <AddAuthorization handleClose={handleOpenClose} />
               ) : // ) : activeTab === 4 ? (
               //    <AvailabilitySchedule
               //       onModel={"Client"}
               //       availabilityData={availabilityData}
               //       handleClose={handleOpenClose}
               //    />
               activeTab === 4 ? (
                  <AddNotes model="Client" handleClose={handleOpenClose} />
               ) : null
            }
         />
      </div>
   );
};
