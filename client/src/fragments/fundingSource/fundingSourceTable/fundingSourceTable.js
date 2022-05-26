import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Table, TableBody, TableContainer } from "@material-ui/core";
import { FundingSourceTableBody, FundingSourceTableHead } from "./core";
import { FindLoad, useGlobalStyles } from "@eachbase/utils";
import { Loader, NoItemText, PaginationItem } from "@eachbase/components";
import { fundingSourceActions } from "@eachbase/store";

export const FundingSourceTable = ({ status, handleGetPage }) => {
   const globalStyle = useGlobalStyles();
   const [page, setPage] = useState(1);
   const dispatch = useDispatch();

   const { fundingSources } = useSelector((state) => ({
      fundingSources: state.fundingSource.fundingSources,
   }));

   const loader = FindLoad("GET_FUNDING_SOURCE");

   const changePage = (number) => {
      if (page === number) return;

      let start = number > 1 ? number - 1 + "0" : 0;
      setPage(number);
      dispatch(
         fundingSourceActions.getFundingSource({
            status: status,
            start: start,
            end: 10,
         })
      );
      handleGetPage(start);
   };

   return (
      <div className={globalStyle.tableWrapper}>
         <Paper className={globalStyle.tableBack}>
            {!!fundingSources?.funders?.length ? (
               <>
                  <TableContainer
                     style={{
                        height: `calc(100vh - ${
                           fundingSources?.funders?.length ? "250px" : "150px"
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
                        {loader.length ? (
                           <Loader />
                        ) : (
                           <TableBody>
                              {fundingSources?.funders &&
                                 fundingSources.funders.map((item, i) => (
                                    <FundingSourceTableBody data={item} key={i} />
                                 ))}
                           </TableBody>
                        )}
                     </Table>
                  </TableContainer>
                  <PaginationItem
                     listLength={fundingSources?.funders?.length}
                     page={page}
                     handleReturn={(number) => changePage(number)}
                     count={fundingSources?.count}
                     entries={fundingSources?.funders?.length}
                  />
               </>
            ) : (
               <NoItemText text={"No Funding source yet"} />
            )}
         </Paper>
      </div>
   );
};
