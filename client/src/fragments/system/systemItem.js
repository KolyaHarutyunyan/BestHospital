import React, { useContext, useEffect, useState } from "react";
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
import { httpRequestsOnSuccessActions } from "@eachbase/store";
import { FindSuccess, FindLoad, PaginationContext } from "@eachbase/utils";
import { PlaceOfService } from "./core/placeOfService";
import { tabsLabels } from "./constants";

export const SystemItem = () => {
   const classes = systemItemStyles();

   const dispatch = useDispatch();

   const { pageIsChanging, handlePageChange } = useContext(PaginationContext);

   const loader = FindLoad("GET_SERVICES");
   const success = FindSuccess("GET_SERVICES");

   const globalCredentials = useSelector((state) => state.system.credentials);
   const globalDepartments = useSelector((state) => state.system.departments);
   const globalJobs = useSelector((state) => state.system.jobs);
   const globalPayCodes = useSelector((state) => state.payroll.PayCodes);
   const globalOvertimeSettings = useSelector((state) => state.payroll.overtimeSettings);
   const globalPlaces = useSelector((state) => state.system.places);
   const globalServices = useSelector((state) => state.system.services);
   const { services, count } = globalServices;

   const [deleteModalOpened, setDeleteModalOpened] = useState(false);
   const [deletedId, setDeletedId] = useState("");
   const [activeTab, setActiveTab] = useState(0);
   const [open, setOpen] = useState(false);
   const [modalType, setModalType] = useState("");
   const [modalInformation, setModalInformation] = useState("");
   const [deletedName, setDeletedName] = useState();
   const [page, setPage] = useState(1);

   useEffect(
      () => () => {
         if (pageIsChanging) {
            handlePageChange(false);
         }
      },
      [pageIsChanging]
   );

   useEffect(() => {
      if (!!success.length) {
         if (!pageIsChanging) setPage(1);
         handlePageChange(false);
         dispatch(httpRequestsOnSuccessActions.removeSuccess("GET_SERVICES"));
      }
   }, [success]);

   if (!!loader.length && !pageIsChanging) return <Loader />;

   function handleOpenClose(modalType, modalInformation) {
      setModalType(modalType);
      setModalInformation(modalInformation);
      setOpen((prevState) => !prevState);
   }

   function handleDeletedOpenClose() {
      setDeleteModalOpened(false);
   }

   function handleRemoveItem(data) {
      setDeleteModalOpened(true);
      setDeletedId(data.id);
      setDeletedName(data.name);
      setModalType(data.type);
   }

   const tabsContent = [
      {
         tabComponent: (
            <ServiceType
               globalServices={services}
               serviceTypesQty={count}
               page={page}
               handleGetPage={setPage}
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
