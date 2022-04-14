import React, { useContext, useState } from "react";
import { claimsStyle } from "./styles";
import { AddButton, Loader, NoItemText, PaginationItem } from "@eachbase/components";
import { enumValues, handleCreatedAtDate, PaginationContext } from "@eachbase/utils";
import { claimActions } from "@eachbase/store";
import { useDispatch } from "react-redux";
import { ClaimTable } from "./core";
import { useHistory } from "react-router";
import { BillFiltersSelectors } from "../../bills/bills/core";

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

   const { handlePageChange } = useContext(PaginationContext);

   const [selectedPayor, setSelectedPayor] = useState("All");
   const [selectedClient, setSelectedClient] = useState("All");
   const [filteredDateFrom, setFilteredDateFrom] = useState("");
   const [filteredDateTo, setFilteredDateTo] = useState("");
   const [selectedStatus, setSelectedStatus] = useState("All");

   const clientsNames = claims.map((claim) => claim?.client?.middleName);
   const payorsNames = claims.map((claim) => claim?.payor?.middleName);

   const claimsWithFilters =
      selectedPayor === "All" &&
      selectedClient === "All" &&
      filteredDateFrom === "" &&
      filteredDateTo === "" &&
      selectedStatus === "All"
         ? claims
         : selectedPayor !== "All"
         ? claims.filter(
              (claim) =>
                 claim?.payor?.middleName?.toLowerCase() === selectedPayor.toLowerCase()
           )
         : selectedClient !== "All"
         ? claims.filter(
              (claim) =>
                 claim?.client?.middleName?.toLowerCase() === selectedClient.toLowerCase()
           )
         : filteredDateFrom !== ""
         ? claims.filter(
              (claim) =>
                 handleCreatedAtDate(claim?.dateRange?.early, 10) ===
                 handleCreatedAtDate(filteredDateFrom, 10)
           )
         : filteredDateTo !== ""
         ? claims.filter(
              (claim) =>
                 handleCreatedAtDate(claim?.dateRange?.latest, 10) ===
                 handleCreatedAtDate(filteredDateTo, 10)
           )
         : selectedStatus !== "All"
         ? claims.filter(
              (claim) => claim?.status.toLowerCase() === selectedStatus.toLowerCase()
           )
         : [];

   const changePage = (number) => {
      if (page === number) return;
      handlePageChange(true);
      let start = number > 1 ? number - 1 + "0" : 0;
      dispatch(claimActions.getClaims({ limit: 10, skip: start }));
      handleGetPage(number);
   };

   return (
      <div>
         <div className={classes.addButton}>
            <BillFiltersSelectors
               filterIsForClaim={true}
               clientsNames={clientsNames}
               payorsNames={payorsNames}
               passPayorHandler={(selPayor) => setSelectedPayor(selPayor)}
               selectedPayor={selectedPayor}
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
                  {claimsLoader ? (
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
                  handleReturn={(number) => changePage(number)}
                  count={claimsQty}
                  entries={claims.length}
               />
            </div>
         ) : (
            <NoItemText text={"No Claims Yet"} />
         )}
      </div>
   );
};
