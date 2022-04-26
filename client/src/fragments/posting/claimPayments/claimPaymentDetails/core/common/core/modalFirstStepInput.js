import React, { useContext, useState } from "react";
import { claimReceivableTableStyle } from "./styles";
import { Loader, NoItemText, BillFiltersSelectors } from "@eachbase/components";
import { handleCreatedAtDate, PaginationContext } from "@eachbase/utils";
import { claimActions } from "@eachbase/store";
import { useDispatch } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import { ClaimModalTable } from "./common";

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

   const clientsNames = claims.map((claim) => claim?.client?.firstName);

   const claimsWithFilters =
      selectedClient === "All" && filteredDateFrom === "" && filteredDateTo === ""
         ? claims
         : selectedClient !== "All"
         ? claims.filter(
              (claim) =>
                 claim?.client?.firstName?.toLowerCase() === selectedClient.toLowerCase()
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
         {!!claimsWithFilters.length ? (
            <div className={classes.tableAndPaginationBoxStyle}>
               <div className={classes.tableBoxStyle}>
                  {!!claimsLoader && pageIsChanging ? (
                     <div className={classes.loaderContainerStyle}>
                        <Loader circleSize={50} />
                     </div>
                  ) : (
                     <ClaimModalTable claims={claimsWithFilters} triggerId={triggerId} />
                  )}
               </div>
               <div className={classes.paginationBoxStyle}>
                  <Pagination
                     onChange={(event, number) => changePage(number)}
                     page={page}
                     count={Math.ceil(claimsQty / 10)}
                     color={"primary"}
                     size={"small"}
                  />
               </div>
            </div>
         ) : (
            <NoItemText text={"No Claims Yet"} />
         )}
      </div>
   );
};
