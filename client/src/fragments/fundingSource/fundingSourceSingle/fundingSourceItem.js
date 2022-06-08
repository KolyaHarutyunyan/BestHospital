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
   const historiesData = useSelector(
      (state) => state.fundingSource.fundingSourceHistories
   );
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
         tabComponent: historiesData.length ? (
            <FundingSourceSingleHistories data={historiesData} />
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
            handleOpen={handleOpenClose}
            path={"funding"}
            type={"GET_FUNDING_SOURCE_BY_ID_SUCCESS"}
            title={data?.name}
            parent="Funding Source"
            parentLink="/fundingSource"
            buttonsTabAddButton={true}
            openCloseInfo={open}
            handleOpenClose={handleOpenClose}
            body={
               <InactiveModal
                  statusType={statusType}
                  name={data?.name}
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
