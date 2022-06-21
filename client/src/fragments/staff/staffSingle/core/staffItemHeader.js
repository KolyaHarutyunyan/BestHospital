import React, { Fragment, useEffect, useState } from "react";
import { serviceSingleStyles } from "./styles";
import {
   AddButton,
   AddModalButton,
   SimpleModal,
   AddNotes,
   AvailabilitySchedule,
   ValidationInput,
   CustomizedSwitch,
   DeleteElement,
} from "@eachbase/components";
import { FindLoad, FindSuccess, Images } from "@eachbase/utils";
import { CreateStaff, CredentialModal } from "@eachbase/fragments";
import { useDispatch, useSelector } from "react-redux";
import { EmploymentModal, TimesheetModal } from "./modals";
import {
   adminActions,
   historyActions,
   httpRequestsOnSuccessActions,
} from "@eachbase/store";
import { useParams } from "react-router-dom";
import { editButtonStyle, filterBtnStyle } from "./constants";

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
   const { adminInfoById, adminsList, allPaycodes } = useSelector((state) => ({
      adminInfoById: state.admins.adminInfoById,
      adminsList: state.admins.adminsList,
      allPaycodes: state.admins.allPaycodes,
   }));

   const classes = serviceSingleStyles();

   const dispatch = useDispatch();

   const params = useParams();

   const staffHistoryLoader = FindLoad("GET_HISTORY");
   const clinicianLoader = FindLoad("IS_CLINICIAN");
   const clinicianSuccess = FindSuccess("IS_CLINICIAN");

   useEffect(() => {
      if (!!clinicianSuccess.length) {
         setClinicianModalIsOpen(false);
         setSwitched(false);
         dispatch(httpRequestsOnSuccessActions.removeSuccess("IS_CLINICIAN"));
      }
   }, [clinicianSuccess]);

   const [switchBoolean, setSwitchBoolean] = useState(false);
   const [switched, setSwitched] = useState(false);
   const [searchDate, setSearchDate] = useState("");
   const [isDisabled, setIsDisabled] = useState(false);
   const [clinicianModalIsOpen, setClinicianModalIsOpen] = useState(false);

   useEffect(() => {
      setSwitchBoolean(adminInfoById?.clinical);
   }, [adminInfoById]);

   useEffect(() => {
      dispatch(adminActions.getAllPaycodes(params.id));
   }, []);

   useEffect(() => {
      if (switched) {
         dispatch(adminActions.isClinician(params.id, switchBoolean));
      }
   }, [switched]);

   function handleChange(e) {
      setIsDisabled(false);
      setSearchDate(e.target.value);
   }

   function handleSwitchChange() {
      setSwitched(true);
      setSwitchBoolean((prevState) => !prevState);
   }

   function handleSubmit() {
      setIsDisabled(true);
      const paramsForStaffHistory = {
         onResource: params.id,
         start: searchDate && new Date(searchDate).toISOString(),
      };
      dispatch(historyActions.getHistory("Staff", paramsForStaffHistory));
   }

   return (
      <Fragment>
         <div>
            <ul className={classes.tabsWrapper}>
               <li style={{ display: "flex", alignItems: "center" }}>
                  <img src={Images.userProfile} alt="avatar" className={classes.avatar} />
                  <div className={classes.nameContent}>
                     <h1 className={classes.name}>{title}</h1>
                  </div>
               </li>
               <li className={classes.headerRight}>
                  <div className={classes.clinicalWrapper}>
                     <p>Clinician</p>
                     <div>
                        <CustomizedSwitch
                           checked={switchBoolean}
                           handleClick={() => setClinicianModalIsOpen(true)}
                        />
                     </div>
                  </div>
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
                  ) : // ) : activeTab === 5 ? (
                  //    <AddButton text="Available Hours" handleClick={handleOpenClose} />
                  activeTab === 1 ? (
                     <AddButton text="Add Employment" handleClick={handleOpenClose} />
                  ) : activeTab === 7 ? (
                     <AddButton text="Add Note" handleClick={handleOpenClose} />
                  ) : activeTab === 3 ? (
                     <AddButton
                        text="Add Credential"
                        handleClick={() => openCloseCredModal("addCredential")}
                     />
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
                           loader={!!staffHistoryLoader.length}
                           btnStyles={filterBtnStyle}
                           disabled={isDisabled}
                        />
                     </div>
                  ) : null}
               </li>
            </ul>
         </div>
         <SimpleModal
            openDefault={activeTab === 3 ? openCredModal : openModal}
            handleOpenClose={() =>
               activeTab === 3 ? openCloseCredModal() : handleOpenClose()
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
         <SimpleModal
            openDefault={clinicianModalIsOpen}
            handleOpenClose={() => setClinicianModalIsOpen(false)}
            content={
               <DeleteElement
                  info="Are you sure?"
                  handleDel={handleSwitchChange}
                  handleClose={() => setClinicianModalIsOpen(false)}
                  innerText={"Designate"}
                  loader={!!clinicianLoader.length}
               />
            }
         />
      </Fragment>
   );
};
