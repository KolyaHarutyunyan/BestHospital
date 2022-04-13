import React, { useEffect, useState } from "react";
import { serviceSingleStyles } from "./styles";
import {
   AddButton,
   AddModalButton,
   SimpleModal,
   AddNotes,
   AvailabilitySchedule,
   ValidationInput,
   CustomizedSwitch,
} from "@eachbase/components";
import { FindLoad, Images } from "@eachbase/utils";
import { CreateStaff, CredentialModal } from "@eachbase/fragments";
import { useDispatch, useSelector } from "react-redux";
import { EmploymentModal, TimesheetModal } from "./modals";
import {
   adminActions,
   fundingSourceActions,
   httpRequestsOnErrorsActions,
} from "@eachbase/store";
import { useParams } from "react-router-dom";

const editButtonStyle = {
   height: 36,
   paddingInline: 24,
};

const filterBtn = {
   width: 93,
   height: 36,
};

export const StaffItemHeader = ({
   onModel,
   availabilityData,
   title,
   noteModalTypeInfo,
   openModal,
   handleOpenClose,
   globalCredentialInformation,
   globalCredentials,
   credModalType,
   openCloseCredModal,
   openCredModal,
   activeTab,
}) => {
   const classes = serviceSingleStyles();
   const dispatch = useDispatch();
   const params = useParams();
   const [switchBoolean, setSwitchBoolean] = useState(false);
   const [searchDate, setSearchDate] = useState("");
   const [isDisabled, setIsDisabled] = useState(false);

   const staffHistoryLoader = !!FindLoad("GET_FUNDING_SOURCE_HISTORIES_BY_ID").length;

   useEffect(() => {
      dispatch(adminActions.getAllPaycodes(params.id));
   }, []);

   const { adminInfoById, adminsList, allPaycodes } = useSelector((state) => ({
      adminInfoById: state.admins.adminInfoById,
      adminsList: state.admins.adminsList,
      allPaycodes: state.admins.allPaycodes,
   }));

   let changeSwitch = (e) => {
      dispatch(adminActions.isClinician(params.id, e.target.checked));
      setSwitchBoolean(e.target.checked);
   };

   const handleChange = (e) => {
      setIsDisabled(false);
      setSearchDate(e.target.value);
      dispatch(
         httpRequestsOnErrorsActions.removeError("GET_FUNDING_SOURCE_HISTORIES_BY_ID")
      );
   };

   const handleSubmit = () => {
      setIsDisabled(true);
      dispatch(
         fundingSourceActions.getFundingSourceHistoriesById(
            "Staff",
            searchDate && new Date(searchDate).toISOString()
         )
      );
   };

   return (
      <div>
         <ul className={classes.tabsWrapper}>
            <li style={{ display: "flex", alignItems: "center" }}>
               <img src={Images.userProfile} alt="avatar" className={classes.avatar} />
               <div className={classes.nameContent}>
                  <h1 className={classes.name}>{title}</h1>
               </div>
            </li>
            <li className={classes.headerRight}>
               {activeTab === 0 ? (
                  <AddModalButton
                     btnStyles={editButtonStyle}
                     handleClick={handleOpenClose}
                     text="edit"
                  />
               ) : activeTab === 2 ? (
                  <AddButton text="Add Timesheet" handleClick={handleOpenClose} />
               ) : activeTab === 3 ? (
                  <AddButton
                     text="Add Credential"
                     handleClick={() => openCloseCredModal("addCredential")}
                  />
               ) : activeTab === 5 ? (
                  <AddButton text="Available Hours" handleClick={handleOpenClose} />
               ) : activeTab === 1 ? (
                  <>
                     <div className={classes.clinicalWrapper}>
                        <p>Clinician</p>
                        <div>
                           <CustomizedSwitch
                              checked={switchBoolean}
                              handleClick={changeSwitch}
                           />
                        </div>
                     </div>
                     <AddButton text="Add Employment" handleClick={handleOpenClose} />
                  </>
               ) : activeTab === 7 ? (
                  <AddButton text="Add Note" handleClick={handleOpenClose} />
               ) : activeTab === 3 ? (
                  <AddButton
                     text="Add Credential"
                     handleClick={() => openCloseCredModal("addCredential")}
                  />
               ) : activeTab === 1 ? (
                  <div className={classes.clinicalWrapper}>
                     <p>Clinician</p>
                     <div>
                        <CustomizedSwitch
                           checked={switchBoolean}
                           handleClick={changeSwitch}
                        />
                     </div>
                     <AddButton text="Add Employment" handleClick={handleOpenClose} />
                  </div>
               ) : activeTab === 7 ? (
                  <AddButton text="Add Note" handleClick={handleOpenClose} />
               ) : activeTab === 8 ? (
                  <div className={classes.searchContainer}>
                     <ValidationInput
                        className={classes.dateInput}
                        errorFalse={true}
                        variant={"outlined"}
                        onChange={(e) => handleChange(e)}
                        value={searchDate}
                        type={"date"}
                        name="searchDate"
                     />
                     <AddModalButton
                        handleClick={handleSubmit}
                        text="Search"
                        loader={staffHistoryLoader}
                        btnStyles={filterBtn}
                        disabled={isDisabled}
                     />
                  </div>
               ) : null}
            </li>
         </ul>
         <SimpleModal
            openDefault={activeTab === 3 ? openCredModal : openModal}
            handleOpenClose={
               activeTab === 3 ? () => openCloseCredModal() : handleOpenClose
            }
            content={
               activeTab === 0 ? (
                  <CreateStaff
                     adminsList={adminsList && adminsList.staff}
                     staffGeneral={adminInfoById}
                     resetData={false}
                     handleClose={handleOpenClose}
                  />
               ) : activeTab === 2 ? (
                  <TimesheetModal
                     handleClose={handleOpenClose}
                     allPaycodes={allPaycodes}
                  />
               ) : activeTab === 3 ? (
                  <CredentialModal
                     globalCredentialInformation={globalCredentialInformation}
                     globalCredentials={globalCredentials}
                     credModalType={credModalType}
                     handleClose={() => openCloseCredModal()}
                  />
               ) : activeTab === 1 ? (
                  <EmploymentModal handleClose={handleOpenClose} />
               ) : activeTab === 7 ? (
                  <AddNotes
                     model="Staff"
                     noteModalTypeInfo={noteModalTypeInfo}
                     handleClose={handleOpenClose}
                  />
               ) : activeTab === 5 ? (
                  <AvailabilitySchedule
                     onModel={onModel}
                     availabilityData={availabilityData}
                     handleClose={handleOpenClose}
                  />
               ) : null
            }
         />
      </div>
   );
};
