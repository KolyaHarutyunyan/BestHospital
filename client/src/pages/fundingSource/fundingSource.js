import React, { useEffect, useState } from "react";
import { TableWrapper } from "@eachbase/components";
import { FundingSourceTable, CreateFundingSource } from "@eachbase/fragments";
import { fundingSourceActions } from "@eachbase/store";
import { useDispatch } from "react-redux";
import { FindLoad } from "@eachbase/utils";

export const FundingSource = () => {
   const dispatch = useDispatch();
   const [open, setOpen] = useState(false);
   const [page, setPage] = useState(1);
   const [status, setStatus] = useState("ACTIVE");

   useEffect(() => {
      dispatch(
         fundingSourceActions.getFundingSource({
            status: status,
            start: 0,
            end: 10,
         })
      );
   }, []);

   const handleOpenClose = () => {
      setOpen((prevState) => !prevState);
   };

   const handleActiveOrInactive = (status) => {
      setStatus(status);
      dispatch(
         fundingSourceActions.getFundingSource({
            status: status,
            start: 0,
            end: 10,
         })
      );
   };

   const loader = FindLoad("GET_FUNDING_SOURCE");
   return (
      <TableWrapper
         loader={!!loader.length}
         handleType={handleActiveOrInactive}
         firstButton={"Active"}
         secondButton={"Inactive"}
         buttonsTab={true}
         buttonsTabAddButton={true}
         addButtonText={"Add Funding Source"}
         openCloseInfo={open}
         handleOpenClose={handleOpenClose}
         body={<CreateFundingSource handleClose={handleOpenClose} />}
      >
         <FundingSourceTable handleGetPage={setPage} status={status} />
      </TableWrapper>
   );
};
