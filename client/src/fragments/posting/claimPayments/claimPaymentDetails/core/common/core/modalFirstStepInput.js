import React, { useContext, useState } from "react";
import { claimReceivableTableStyle } from "./styles";
import { Loader, NoItemText, BillFiltersSelectors } from "@eachbase/components";
import { getSkipCount, PaginationContext } from "@eachbase/utils";
import { claimActions } from "@eachbase/store";
import { useDispatch } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import { ClaimModalTable } from "./common";
import { getFilteredClaimsForClaimPmt } from "./constants";

export const ModalFirstStepInput = ({
   claims = [],
   claimsQty = claims.length,
   page,
   handleGetPage,
   claimsLoader,
   triggerId,
}) => {
   const classes = claimReceivableTableStyle();

   const dispatch = useDispatch();

   const { handlePageChange, pageIsChanging } = useContext(PaginationContext);

   const [selectedClient, setSelectedClient] = useState("All");
   const [filteredDateFrom, setFilteredDateFrom] = useState("");
   const [filteredDateTo, setFilteredDateTo] = useState("");

   const clientsNames = claims.map(
      (claim) => `${claim?.client?.firstName} ${claim?.client?.lastName}`
   );

   const claimsWithFilters = getFilteredClaimsForClaimPmt(
      claims,
      selectedClient,
      filteredDateFrom,
      filteredDateTo
   );

   const _limit = 10;

   const changePage = (number) => {
      if (page === number) return;
      handlePageChange(true);
      const _skip = getSkipCount(number, _limit);
      dispatch(claimActions.getClaims({ limit: _limit, skip: _skip }));
      handleGetPage(number);
   };

   return (
      <div>
         <div className={classes.filtersBoxStyle}>
            <BillFiltersSelectors
               filterIsFor={"claimInModal"}
               clientsNames={clientsNames}
               passClientHandler={(selClient) => setSelectedClient(selClient)}
               selectedClient={selectedClient}
               changeDateFromInput={(ev) => setFilteredDateFrom(ev.target.value)}
               filteredDateFrom={filteredDateFrom}
               changeDateToInput={(ev) => setFilteredDateTo(ev.target.value)}
               filteredDateTo={filteredDateTo}
            />
         </div>
         <div className={classes.claimTableBoxStyle}>
            {!!claimsWithFilters.length ? (
               <div className={classes.tableAndPaginationBoxStyle}>
                  <div className={classes.tableBoxStyle}>
                     {!!claimsLoader && pageIsChanging ? (
                        <div className={classes.loaderContainerStyle}>
                           <Loader circleSize={50} />
                        </div>
                     ) : (
                        <ClaimModalTable
                           claims={claimsWithFilters}
                           triggerId={triggerId}
                        />
                     )}
                  </div>
                  <div className={classes.paginationBoxStyle}>
                     <Pagination
                        onChange={(event, number) => changePage(number)}
                        page={page}
                        count={Math.ceil(claimsQty / _limit)}
                        color={"primary"}
                        size={"small"}
                     />
                  </div>
               </div>
            ) : (
               <NoItemText text={"No Claims Yet"} />
            )}
         </div>
      </div>
   );
};
