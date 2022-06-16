import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
   SimpleTabs,
   TableWrapperGeneralInfo,
   InactiveModal,
   SimpleModal,
   NoItemText,
   Loader,
} from "@eachbase/components";
import {
   ClientGeneral,
   ClientContact,
   TabsHeader,
   ClientEnrollment,
   ClientNotes,
   // ClientAvailabilitySchedule,
   ClientHistory,
   ClientAuthorization,
} from "./core";
import { AddContact } from "../clientModals";
import { clientItemStyles } from "./styles";
import { FindLoad, makeCapitalize } from "@eachbase/utils";
import { useParams } from "react-router-dom";

const tabsLabels = [
   { label: "General" },
   { label: "Contacts" },
   { label: "Enrollments" },
   { label: "Authorization" },
   // { label: "Availability" },
   { label: "Notes" },
   { label: "History" },
];

export const ClientItem = () => {
   const classes = clientItemStyles();

   const params = useParams();

   const [open, setOpen] = useState(false);
   const [activeTab, setActiveTab] = useState(0);
   const [contactId, setContactId] = useState(null);
   const [openModal, setOpenModal] = useState(false);
   const [authItemIndex, setAuthItemIndex] = useState(null);
   const [authActive, setAuthActive] = useState(false);
   const [statusType, setStatusType] = useState("");

   const data = useSelector((state) => state.client.clientItemInfo);
   // const authItemData = useSelector(state => state.client.clientsAuthorizations[authItemIndex])
   const clientContactItem = useSelector(
      (state) => state.client.clientContacts[contactId]
   );
   const clientContact = useSelector((state) => state.client.clientContacts);
   const enrolments = useSelector((state) => state.client.clientEnrollment);
   const clientsAuthorizations = useSelector(
      (state) => state.client.clientsAuthorizations
   );
   const clientHistory = useSelector((state) => state.history.history);
   const clientsNotes = useSelector((state) => state.note.notes);
   const availabilityData = useSelector(
      (state) => state.availabilitySchedule.availabilitySchedule
   );

   function handleOpenClose(status) {
      setStatusType(status);
      setOpen((prevState) => !prevState);
   }

   function handleOpenCloseModal() {
      setOpenModal((prevState) => !prevState);
   }

   const load = FindLoad("GET_CLIENT_BY_ID");

   const tabsContent = [
      {
         tabComponent: load.length ? <Loader /> : <ClientGeneral data={data} />,
      },
      {
         tabComponent: clientContact.length ? (
            <ClientContact
               info={clientContact}
               data={data}
               handleOpenClose={handleOpenCloseModal}
               setContactId={setContactId}
            />
         ) : (
            <NoItemText text={"No Contacts Yet"} />
         ),
      },
      {
         tabComponent: enrolments.length ? (
            <ClientEnrollment info={enrolments} data={data} />
         ) : (
            <NoItemText text={"No Enrolments Yet"} />
         ),
      },
      {
         tabComponent: clientsAuthorizations.length ? (
            <ClientAuthorization
               info={clientsAuthorizations}
               setAuthItemIndex={setAuthItemIndex}
               setAuthActive={setAuthActive}
               data={data}
            />
         ) : (
            <NoItemText text={"No Authorization Yet"} />
         ),
      },
      // {
      //    tabComponent: (
      //       <ClientAvailabilitySchedule data={data} availabilityData={availabilityData} />
      //    ),
      // },
      {
         tabComponent: clientsNotes.length ? (
            <ClientNotes data={clientsNotes} />
         ) : (
            <NoItemText text={"No Notes  Yet"} />
         ),
      },
      {
         tabComponent: clientHistory.length ? (
            <ClientHistory info={clientHistory} />
         ) : (
            <NoItemText text={"There is no history in this date"} />
         ),
      },
   ];

   return (
      <>
         <TableWrapperGeneralInfo
            selectStatus={true}
            status={data?.status}
            id={params.id}
            handleOpen={(currentStatus) => {
               setOpen(true);
               setStatusType(currentStatus);
            }}
            path={"client"}
            type={"GET_CLIENT_BY_ID_SUCCESS"}
            parent="Clients"
            title={data ? makeCapitalize(`${data.firstName} ${data.lastName}`) : ""}
            parentLink="/client"
            buttonsTabAddButton={true}
            openCloseInfo={open}
            handleOpenClose={handleOpenClose}
            body={
               <InactiveModal
                  statusType={statusType}
                  name={makeCapitalize(data?.firstName)}
                  info={{
                     path: "client",
                     type: "GET_CLIENT_BY_ID_SUCCESS",
                  }}
                  handleOpenClose={handleOpenClose}
                  handleClose={handleOpenClose}
               />
            }
         >
            <SimpleModal
               openDefault={openModal}
               handleOpenClose={handleOpenCloseModal}
               content={
                  <AddContact
                     info={clientContactItem}
                     handleClose={handleOpenCloseModal}
                  />
               }
            />
            <div className={classes.headerWraperStyle}>
               <TabsHeader
                  availabilityData={availabilityData}
                  authActive={authActive}
                  data={data}
                  activeTab={activeTab}
               />
               <SimpleTabs
                  setAuthActive={setAuthActive}
                  setActiveTab={setActiveTab}
                  tabsLabels={tabsLabels}
                  tabsContent={tabsContent}
               />
            </div>
         </TableWrapperGeneralInfo>
      </>
   );
};
