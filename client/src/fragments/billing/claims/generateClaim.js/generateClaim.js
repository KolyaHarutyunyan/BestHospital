import React, { useContext, useEffect, useState } from "react";
import { NotClaimedBillTable } from "./core";
import { BillFiltersSelectors } from "../../bills/bills/core";
import { generateClaimStyle } from "./styles";
import { CreateChancel, Loader, NoItemText, Switcher } from "@eachbase/components";
import {
   CheckupContext,
   FindLoad,
   handleCreatedAtDate,
   PaginationContext,
} from "@eachbase/utils";
import { billActions, claimActions } from "@eachbase/store";
import { useDispatch } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import { useHistory } from "react-router";

function mapBills(billList = [], boolean) {
   if (!Array.isArray(billList)) return;
   return billList.map((bill) => ({ ...bill, isChecked: boolean }));
}

export const GenerateClaimFragment = ({
   notClaimedBills = [],
   notClaimedBillsQty = 0,
   page,
   handleGetPage,
   notClaimedBillsLoader,
}) => {
   const classes = generateClaimStyle();

   const history = useHistory();

   const dispatch = useDispatch();

   const generateClaimLoader = FindLoad("GENERATE_CLAIM");

   const { handlePageChange, pageIsChanging } = useContext(PaginationContext);
   const { itemsAreChecked, handleItemsCheckup } = useContext(CheckupContext);

   const [selectedPayor, setSelectedPayor] = useState("All");
   const [selectedClient, setSelectedClient] = useState("All");
   const [filteredServiceDate, setFilteredServiceDate] = useState("");
   const [merge, setMerge] = useState(true);
   const [bills, setBills] = useState(mapBills(notClaimedBills, false));

   useEffect(() => {
      if (itemsAreChecked) {
         setBills(mapBills(bills, true));
      }
   }, [itemsAreChecked]);

   function handleTriggeredBill(triggeredBill) {
      return setBills(
         bills.map((bill) => {
            if (bill._id === triggeredBill._id) {
               return triggeredBill;
            }
            return bill;
         })
      );
   }

   const payorsNames = bills.map((bill) => bill?.payor?.middleName);
   const clientsNames = bills.map((bill) => bill?.client?.middleName);

   const notClaimedBillsWithFilters =
      selectedPayor === "All" && selectedClient === "All" && filteredServiceDate === ""
         ? bills
         : selectedPayor !== "All"
         ? bills.filter(
              (bill) =>
                 bill?.payor?.middleName?.toLowerCase() === selectedPayor.toLowerCase()
           )
         : selectedClient !== "All"
         ? bills.filter(
              (bill) =>
                 bill?.client?.middleName?.toLowerCase() === selectedClient.toLowerCase()
           )
         : filteredServiceDate !== ""
         ? bills.filter(
              (bill) =>
                 handleCreatedAtDate(bill?.dateOfService, 10) ===
                 handleCreatedAtDate(filteredServiceDate, 10)
           )
         : [];

   function changePage(number) {
      if (page === number) return;
      handlePageChange(true);
      handleItemsCheckup(false);
      setBills(mapBills(bills, false));
      let start = number > 1 ? number - 1 + "0" : 0;
      dispatch(billActions.getBills({ limit: 10, skip: start }));
      handleGetPage(number);
   }

   const billsGroup = merge ? "ON" : "OFF";

   const checkedBillsIdList = bills
      .filter((bill) => bill.isChecked)
      .map((bill) => bill._id);

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
                     <NotClaimedBillTable
                        notClaimedBills={notClaimedBillsWithFilters}
                        triggerBill={handleTriggeredBill}
                        uncheckAllBills={() => setBills(mapBills(bills, false))}
                     />
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
                     loader={!!generateClaimLoader.length}
                     create={"Generate Claims"}
                     chancel={"Cancel"}
                     onCreate={() =>
                        dispatch(
                           claimActions.generateClaim(billsGroup, {
                              bills: checkedBillsIdList,
                           })
                        )
                     }
                     onClose={() => history.push("/claims")}
                     disabled={!checkedBillsIdList.length}
                  />
               </div>
            </div>
         ) : (
            <NoItemText text={"No Not Claimed Bills Yet"} />
         )}
      </div>
   );
};
