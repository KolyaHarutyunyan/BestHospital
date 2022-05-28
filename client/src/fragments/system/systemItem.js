import React, { useEffect, useState } from "react";
import { Loader, SimpleTabs } from "@eachbase/components";
import {
   ServiceType,
   systemItemStyles,
   SystemItemHeader,
   Credentials,
   Departments,
   JobTitles,
   PayrollSetup,
} from "./core";
import { useDispatch, useSelector } from "react-redux";
import { mileagesActions, systemActions } from "@eachbase/store";
import { payrollActions } from "@eachbase/store/payroll";
import { FindLoad } from "../../utils";
import { PlaceOfService } from "./core/placeOfService";

export const SystemItem = () => {
   const [activeTab, setActiveTab] = useState(0);
   const [open, setOpen] = useState(false);
   const [modalType, setModalType] = useState("");
   const [modalInformation, setModalInformation] = useState("");
   const [deletedName, setDeletedName] = useState();
   const classes = systemItemStyles();

   const globalCredentials = useSelector((state) => state.system.credentials);
   const globalServices = useSelector((state) => state.system.services);
   const globalDepartments = useSelector((state) => state.system.departments);
   const globalJobs = useSelector((state) => state.system.jobs);
   const globalPayCodes = useSelector((state) => state.payroll.PayCodes);
   const globalOvertimeSettings = useSelector((state) => state.payroll.overtimeSettings);

   const globalPlaces = useSelector((state) => state.system.places);

   const dispatch = useDispatch();
   const [deleteModalOpened, setDeleteModalOpened] = useState(false);
   const [deletedId, setDeletedId] = useState("");

   const tabsLabels = [
      {
         label: "Service Types",
      },
      {
         label: "Credentials",
      },
      {
         label: "Departments",
      },
      {
         label: "Job Titles",
      },
      {
         label: "Payroll Setup",
      },
      {
         label: "Place of Service",
      },
   ];

   const handleOpenClose = (modalType, modalInformation) => {
      setModalType(modalType);
      setModalInformation(modalInformation);
      setOpen((prevState) => !prevState);
   };

   const handleDeletedOpenClose = () => {
      setDeleteModalOpened(false);
   };

   const handleRemoveItem = (data) => {
      setDeleteModalOpened(true);
      setDeletedId(data.id);
      setDeletedName(data.name);
      setModalType(data.type);
   };

   const { httpOnLoad } = useSelector((state) => ({
      httpOnLoad: state.httpOnLoad,
   }));

   const loader = FindLoad("GET_SERVICES");
   const tabsContent = [
      {
         tabComponent: loader.length ? (
            <Loader />
         ) : (
            <ServiceType
               globalServices={globalServices}
               removeItem={handleRemoveItem}
               openModal={handleOpenClose}
            />
         ),
      },
      {
         tabComponent: (
            <Credentials
               globalCredentials={globalCredentials}
               removeItem={handleRemoveItem}
               openModal={handleOpenClose}
            />
         ),
      },
      {
         tabComponent: (
            <Departments
               globalDepartments={globalDepartments}
               removeItem={handleRemoveItem}
               openModal={handleOpenClose}
            />
         ),
      },
      {
         tabComponent: (
            <JobTitles
               globalJobs={globalJobs}
               removeItem={handleRemoveItem}
               openModal={handleOpenClose}
            />
         ),
      },
      {
         tabComponent: (
            <PayrollSetup
               globalPayCodes={globalPayCodes}
               globalOvertimeSettings={globalOvertimeSettings}
            />
         ),
      },
      {
         tabComponent: (
            <PlaceOfService
               globalJobs={globalPlaces}
               removeItem={handleRemoveItem}
               openModal={handleOpenClose}
            />
         ),
      },
   ];

   return (
      <div className={classes.systemItemWrapper}>
         <SystemItemHeader
            deletedName={deletedName}
            modalInformation={modalInformation}
            deletedId={deletedId}
            deleteModalOpened={deleteModalOpened}
            handleDeletedOpenClose={handleDeletedOpenClose}
            modalType={modalType}
            open={open}
            handleOpenClose={handleOpenClose}
            activeTab={activeTab}
         />
         <SimpleTabs
            setActiveTab={setActiveTab}
            tabsLabels={tabsLabels}
            tabsContent={tabsContent}
         />
      </div>
   );
};
