import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { Paper, Table, TableBody, TableContainer } from "@material-ui/core";
import { ClientTableBody, ClientTableHead } from "./core";
import { PaginationContext, useGlobalStyles } from "@eachbase/utils";
import { Loader, NoItemText, PaginationItem } from "@eachbase/components";
import { clientActions } from "@eachbase/store";

export const ClientTable = ({
   clients = [],
   clientsLoader,
   clientsCount,
   page,
   setOpen,
   handleClose,
   setDeleteClient,
   handleGetPage,
   status,
}) => {
   const globalStyle = useGlobalStyles();

   const dispatch = useDispatch();

   const { pageIsChanging, handlePageChange } = useContext(PaginationContext);

   const changePage = (number) => {
      if (page === number) return;
      handlePageChange(true);
      let start = number > 1 ? number - 1 + "0" : 0;
      dispatch(clientActions.getClients({ status: status, start: start, end: 10 }));
      handleGetPage(number);
   };

   return (
      <div className={globalStyle.tableWrapper}>
         {!!clients.length ? (
            <div>
               {clientsLoader && pageIsChanging ? (
                  <div className={globalStyle.loaderContainerStyle}>
                     <Loader circleSize={50} />
                  </div>
               ) : (
                  <>
                     <TableContainer
                        component={Paper}
                        style={{
                           height: `calc(100vh - ${
                              !!clients.length ? "250px" : "150px"
                           } )`,
                        }}
                     >
                        <Table
                           stickyHeader
                           className={globalStyle.table}
                           size="small"
                           aria-label="a dense table"
                        >
                           <ClientTableHead />
                           <TableBody>
                              {clients.map((item, i) => (
                                 <ClientTableBody
                                    key={i}
                                    data={item}
                                    index={i}
                                    setOpen={setOpen}
                                    handleClose={handleClose}
                                    setDeleteClient={setDeleteClient}
                                 />
                              ))}
                           </TableBody>
                        </Table>
                     </TableContainer>
                  </>
               )}
               <PaginationItem
                  listLength={clients.length}
                  page={page}
                  handleReturn={(number) => changePage(number)}
                  count={clientsCount}
                  entries={clients.length}
               />
            </div>
         ) : (
            <NoItemText text={"No Clients Yet"} />
         )}
      </div>
   );
};
