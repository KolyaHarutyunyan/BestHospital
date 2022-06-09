import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Table, TableBody, TableContainer } from "@material-ui/core";
import { FundingSourceTableBody, FundingSourceTableHead } from "./core";
import { PaginationContext, useGlobalStyles } from "@eachbase/utils";
import { Loader, NoItemText, PaginationItem } from "@eachbase/components";
import { fundingSourceActions } from "@eachbase/store";

export const FundingSourceTable = ({
   status,
   handleGetPage,
   fundingSourceLoader,
   page,
}) => {
   const globalStyle = useGlobalStyles();
   const dispatch = useDispatch();

   const { fundingSourceList } = useSelector((state) => ({
      fundingSourceList: state.fundingSource.fundingSourceList,
   }));

   const { handlePageChange, pageIsChanging } = useContext(PaginationContext);

   const changePage = (number) => {
      if (page === number) return;
      handlePageChange(true);
      let start = number > 1 ? number - 1 + "0" : 0;
      dispatch(
         fundingSourceActions.getFundingSource({
            status: status,
            skip: start,
            limit: 10,
         })
      );
      handleGetPage(number);
   };

   return (
      <div className={globalStyle.tableWrapper}>
         <Paper className={globalStyle.tableBack}>
            {!!fundingSourceList?.funders?.length ? (
               <div>
                  {!!fundingSourceLoader && pageIsChanging ? (
                     <div className={globalStyle.loaderContainerStyle}>
                        <Loader circleSize={50} />
                     </div>
                  ) : (
                     <TableContainer
                        style={{
                           height: `calc(100vh - ${
                              fundingSourceList?.funders?.length ? "250px" : "150px"
                           } )`,
                        }}
                        className={globalStyle.tableContainer}
                        component={Paper}
                     >
                        <Table
                           stickyHeader
                           className={globalStyle.table}
                           size="small"
                           aria-label="a dense table"
                        >
                           <FundingSourceTableHead />

                           <TableBody>
                              {fundingSourceList?.funders &&
                                 fundingSourceList.funders.map((item, i) => (
                                    <FundingSourceTableBody data={item} key={i} />
                                 ))}
                           </TableBody>
                        </Table>
                     </TableContainer>
                  )}
                  <PaginationItem
                     listLength={fundingSourceList?.funders?.length}
                     page={page}
                     handleReturn={(number) => changePage(number)}
                     count={fundingSourceList?.count}
                     entries={fundingSourceList?.funders?.length}
                  />
               </div>
            ) : (
               <NoItemText text={"No Funding Source Yet"} />
            )}
         </Paper>
      </div>
   );
};
