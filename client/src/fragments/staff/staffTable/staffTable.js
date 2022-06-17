import React, { useContext } from "react";
import { Paper, Table, TableBody, TableContainer } from "@material-ui/core";
import { PaginationContext, useGlobalStyles } from "@eachbase/utils";
import { Loader, NoItemText, PaginationItem } from "@eachbase/components";
import { StaffTableBody, StaffTableHead } from "./core";
import { useDispatch } from "react-redux";
import { adminActions } from "@eachbase/store";

export const StaffTable = ({
   staff = [],
   staffLoader,
   staffCount,
   page,
   status,
   handleGetPage,
}) => {
   const globalStyle = useGlobalStyles();

   const dispatch = useDispatch();

   const { pageIsChanging, handlePageChange } = useContext(PaginationContext);

   function changePage(number) {
      if (page === number) return;
      handlePageChange(true);
      let start = number > 1 ? number - 1 + "0" : 0;
      dispatch(adminActions.getAdmins({ status: status, skip: start, limit: 10 }));
      handleGetPage(number);
   }

   return (
      <div className={globalStyle.tableWrapper}>
         <Paper className={globalStyle.tableBack}>
            {!!staff.length ? (
               <div>
                  {staffLoader && pageIsChanging ? (
                     <div className={globalStyle.loaderContainerStyle}>
                        <Loader circleSize={50} />
                     </div>
                  ) : (
                     <TableContainer
                        style={
                           staff.length
                              ? { height: "calc(100vh - 260px)" }
                              : { height: "calc(100vh - 185px)" }
                        }
                        component={Paper}
                     >
                        <Table
                           stickyHeader
                           className={globalStyle.table}
                           size="small"
                           aria-label="sticky table"
                        >
                           <StaffTableHead />
                           <TableBody>
                              {staff &&
                                 adminsList.staff.map((item, i) => (
                                    <StaffTableBody key={i} data={item} index={i} />
                                 ))}
                           </TableBody>
                        </Table>
                     </TableContainer>
                  )}
                  <PaginationItem
                     listLength={staff.length}
                     page={page}
                     component="div"
                     handleReturn={(number) => changePage(number)}
                     count={staffCount}
                     entries={staff.length}
                  />
               </div>
            ) : (
               <NoItemText text="No Staffs Yet" />
            )}
         </Paper>
      </div>
   );
};
