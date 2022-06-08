import React, { useContext, useEffect, useState } from "react";
import { Loader, TableWrapper } from "@eachbase/components";
import { FundingSourceTable, CreateFundingSource } from "@eachbase/fragments";
import { fundingSourceActions, httpRequestsOnSuccessActions } from "@eachbase/store";
import { useDispatch } from "react-redux";
import { FindLoad, FindSuccess, PaginationContext } from "@eachbase/utils";

export const FundingSource = () => {
   const dispatch = useDispatch();
   const [open, setOpen] = useState(false);
   const [page, setPage] = useState(1);
   const [status, setStatus] = useState("ACTIVE");

   const { pageIsChanging, handlePageChange } = useContext(PaginationContext);

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
   const success = FindSuccess("GET_FUNDING_SOURCE");

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
         dispatch(httpRequestsOnSuccessActions.removeSuccess("GET_FUNDING_SOURCE"));
      }
   }, [success]);

   if (!!loader.length && !pageIsChanging) return <Loader />;

   return (
      <TableWrapper
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
         <FundingSourceTable
            handleGetPage={setPage}
            status={status}
            fundingSourceLoader={!!loader.length}
            page={page}
         />
      </TableWrapper>
   );
};
