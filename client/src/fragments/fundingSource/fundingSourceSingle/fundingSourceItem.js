import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
   SimpleTabs,
   TableWrapperGeneralInfo,
   InactiveModal,
   NoItemText,
} from "@eachbase/components";
import {
   FundingSourceSingleGeneral,
   FundingSourceSingleHeader,
   FundingSourceSingleNotes,
   FundingSourceSingleHistories,
} from "./core";
import { fundingSourceItemStyle } from "./styles";
import { useParams } from "react-router-dom";
import { ServiceTable } from "./core/common";
import { makeCapitalize } from "@eachbase/utils";

const tabsLabels = [
   { label: "General Information" },
   { label: "Services" },
   { label: "Notes" },
   { label: "History" },
];

export const FundingSourceItem = ({}) => {
   const classes = fundingSourceItemStyle();

   const params = useParams();

   const data = useSelector((state) => state.fundingSource.fundingSourceItem);
   const servicesData = useSelector((state) => state.fundingSource.fundingSourceServices);
   const funderHistory = useSelector((state) => state.history.history);
   const globalNotes = useSelector((state) => state.note.notes);
   const globalServices = useSelector((state) => state.system.services);
   const globalCredentials = useSelector((state) => state.system.credentials);

   const [open, setOpen] = useState(false);
   const [activeTab, setActiveTab] = useState(0);
   const [statusType, setStatusType] = useState("");

   function handleOpenClose(status) {
      setStatusType(status);
      setOpen((prevState) => !prevState);
   }

   const tabsContent = [
      {
         tabComponent: <FundingSourceSingleGeneral data={data} />,
      },
      {
         tabComponent: servicesData.length ? (
            <div className={classes.fundindServiceItems}>
               <ServiceTable
                  services={servicesData}
                  globalServices={globalServices}
                  globalCredentials={globalCredentials}
               />
            </div>
         ) : (
            <NoItemText text="No Services Yet" />
         ),
      },
      {
         tabComponent: globalNotes.length ? (
            <FundingSourceSingleNotes data={globalNotes} />
         ) : (
            <NoItemText text="No Notes Yet" />
         ),
      },
      {
         tabComponent: funderHistory.length ? (
            <FundingSourceSingleHistories data={funderHistory} />
         ) : (
            <NoItemText text="There is no history in this date" />
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
            path={"funding"}
            type={"GET_FUNDING_SOURCE_BY_ID_SUCCESS"}
            title={makeCapitalize(data?.name)}
            parent="Funding Source"
            parentLink="/fundingSource"
            buttonsTabAddButton={true}
            openCloseInfo={open}
            handleOpenClose={handleOpenClose}
            body={
               <InactiveModal
                  statusType={statusType}
                  name={makeCapitalize(data?.name)}
                  info={{
                     path: "funding",
                     type: "GET_FUNDING_SOURCE_BY_ID_SUCCESS",
                  }}
                  handleOpenClose={handleOpenClose}
               />
            }
         >
            <div className={classes.fundingSourceItemHeader}>
               <FundingSourceSingleHeader title={data?.name} activeTab={activeTab} />
               <SimpleTabs
                  setActiveTab={setActiveTab}
                  tabsLabels={tabsLabels}
                  tabsContent={tabsContent}
               />
            </div>
         </TableWrapperGeneralInfo>
      </>
   );
};
