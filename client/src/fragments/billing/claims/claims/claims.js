import React, { useContext, useState } from "react";
import { claimsStyle } from "./styles";
import {
   AddButton,
   Loader,
   NoItemText,
   PaginationItem,
   BillFiltersSelectors,
} from "@eachbase/components";
import { enumValues, getSkipCount, PaginationContext } from "@eachbase/utils";
import { claimActions } from "@eachbase/store";
import { useDispatch } from "react-redux";
import { ClaimTable } from "./core";
import { useHistory } from "react-router";
import { getFilteredClaims } from "./constants";

export const ClaimsFragment = ({
   claims = [],
   claimsQty = claims.length,
   page,
   handleGetPage,
   claimsLoader,
}) => {
   const classes = claimsStyle();

   const history = useHistory();

   const dispatch = useDispatch();

   const { handlePageChange, pageIsChanging } = useContext(PaginationContext);

   const [selectedPayor, setSelectedPayor] = useState("All");
   const [selectedClient, setSelectedClient] = useState("All");
   const [filteredDateFrom, setFilteredDateFrom] = useState("");
   const [filteredDateTo, setFilteredDateTo] = useState("");
   const [selectedStatus, setSelectedStatus] = useState("All");

   const payorsNames = claims.map((claim) => claim?.funder?.name);
   const clientsNames = claims.map(
      (claim) => `${claim?.client?.firstName} ${claim?.client?.lastName}`
   );

   const claimsWithFilters = getFilteredClaims(
      claims,
      selectedPayor,
      selectedClient,
      filteredDateFrom,
      filteredDateTo,
      selectedStatus
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
         <div className={classes.addButton}>
            <BillFiltersSelectors
               filterIsFor={"claim"}
               payorsNames={payorsNames}
               passPayorHandler={(selPayor) => setSelectedPayor(selPayor)}
               selectedPayor={selectedPayor}
               clientsNames={clientsNames}
               passClientHandler={(selClient) => setSelectedClient(selClient)}
               selectedClient={selectedClient}
               changeDateFromInput={(ev) => setFilteredDateFrom(ev.target.value)}
               filteredDateFrom={filteredDateFrom}
               changeDateToInput={(ev) => setFilteredDateTo(ev.target.value)}
               filteredDateTo={filteredDateTo}
               statuses={enumValues.CLAIM_STATUSES}
               passStatusHandler={(selStatus) => setSelectedStatus(selStatus)}
               selectedStatus={selectedStatus}
            />
            <AddButton
               addButtonClassName={classes.generateClaimButnStyle}
               text={"Generate Claim"}
               handleClick={() => history.push("/generateClaim")}
            />
         </div>
         {!!claimsWithFilters.length ? (
            <div className={classes.tableAndPaginationBoxStyle}>
               <div className={classes.tableBoxStyle}>
                  {!!claimsLoader && pageIsChanging ? (
                     <div className={classes.loaderContainerStyle}>
                        <Loader circleSize={50} />
                     </div>
                  ) : (
                     <ClaimTable claims={claimsWithFilters} />
                  )}
               </div>
               <PaginationItem
                  listLength={claimsWithFilters.length}
                  page={page}
                  handleChangePage={(number) => changePage(number)}
                  count={claimsQty}
                  limitCountNumber={_limit}
               />
            </div>
         ) : (
            <NoItemText text={"No Claims Yet"} />
         )}
      </div>
   );
};
