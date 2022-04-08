import React, { useContext, useState } from "react";
import { NotClaimedBillTable } from "./core";
import { BillFiltersSelectors } from "../../bills/bills/core";
import { generateClaimStyle } from "./styles";
import { CreateChancel, Loader, NoItemText, Switcher } from "@eachbase/components";
import { handleCreatedAtDate, PaginationContext } from "@eachbase/utils";
import { billActions } from "@eachbase/store";
import { useDispatch } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";

export const GenerateClaimFragment = ({
   notClaimedBills = [],
   notClaimedBillsQty = 0,
   page,
   handleGetPage,
   notClaimedBillsLoader,
}) => {
   const classes = generateClaimStyle();

   const dispatch = useDispatch();

   const { handlePageChange, pageIsChanging } = useContext(PaginationContext);

   const [selectedPayor, setSelectedPayor] = useState("All");
   const [selectedClient, setSelectedClient] = useState("All");
   const [filteredServiceDate, setFilteredServiceDate] = useState("");
   const [merge, setMerge] = useState(true);

   const payorsNames = notClaimedBills.map((bill) => bill?.payor?.middleName);
   const clientsNames = notClaimedBills.map((bill) => bill?.client?.middleName);

   const notClaimedBillsWithFilters =
      selectedPayor === "All" && selectedClient === "All" && filteredServiceDate === ""
         ? notClaimedBills
         : selectedPayor !== "All"
         ? notClaimedBills.filter(
              (bill) =>
                 bill?.payor?.middleName?.toLowerCase() === selectedPayor.toLowerCase()
           )
         : selectedClient !== "All"
         ? notClaimedBills.filter(
              (bill) =>
                 bill?.client?.middleName?.toLowerCase() === selectedClient.toLowerCase()
           )
         : filteredServiceDate !== ""
         ? notClaimedBills.filter(
              (bill) =>
                 handleCreatedAtDate(bill?.dateOfService, 10) ===
                 handleCreatedAtDate(filteredServiceDate, 10)
           )
         : [];

   const changePage = (number) => {
      if (page === number) return;
      handlePageChange(true);
      let start = number > 1 ? number - 1 + "0" : 0;
      dispatch(billActions.getBills({ limit: 10, skip: start }));
      handleGetPage(number);
   };

   return (
      <div className={classes.generateClaimContainerStyle}>
         <div className={classes.generateClaimActionsStyle}>
            <BillFiltersSelectors
               clientsNames={clientsNames}
               payorsNames={payorsNames}
               passPayorHandler={(selPayor) => setSelectedPayor(selPayor)}
               selectedPayor={selectedPayor}
               passClientHandler={(selClient) => setSelectedClient(selClient)}
               selectedClient={selectedClient}
               forIncompleteBills={true}
               changeDateInput={(ev) => setFilteredServiceDate(ev.target.value)}
               filteredDate={filteredServiceDate}
            />
            <div className={classes.mergeBillsBoxStyle}>
               <p className={classes.mergeBillsTitleStyle}>Merge Bills</p>
               <Switcher
                  switcherClassName={classes.mergeBillsSwitcherStyle}
                  checked={merge}
                  handleClick={() => setMerge((prevState) => !prevState)}
               />
            </div>
         </div>
         {!!notClaimedBillsWithFilters.length ? (
            <div className={classes.tableAndPaginationBoxStyle}>
               <div className={classes.tableBoxStyle}>
                  {notClaimedBillsLoader && pageIsChanging ? (
                     <div className={classes.loaderContainerStyle}>
                        <Loader circleSize={50} />
                     </div>
                  ) : (
                     <NotClaimedBillTable notClaimedBills={notClaimedBillsWithFilters} />
                  )}
               </div>
               <div className={classes.notClaimedBillsFooterStyle}>
                  <Pagination
                     onChange={(event, value) => changePage(value)}
                     page={page}
                     count={Math.ceil(notClaimedBillsQty / 10)}
                     color={"primary"}
                  />
                  <CreateChancel
                     classes={classes.generateOrCancelButnStyle}
                     //  loader={!!loader.length}
                     create={"Generate Claims"}
                     chancel={"Cancel"}
                     //  onCreate={handleSubmit}
                     //  onClose={() => {}}
                  />
               </div>
            </div>
         ) : (
            <NoItemText text={"No Not Claimed Bills Yet"} />
         )}
      </div>
   );
};
