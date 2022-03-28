import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Table, TableBody, TableContainer } from "@material-ui/core";
import { ClientTableBody, ClientTableHead } from "./core";
import { FindLoad, useGlobalStyles } from "@eachbase/utils";
import { Loader, NoItemText, PaginationItem } from "@eachbase/components";
import { clientActions } from "@eachbase/store";

export const ClientTable = ({
   setOpen,
   handleClose,
   setDeleteClient,
   handleGetPage,
   status,
}) => {
   const globalStyle = useGlobalStyles();
   const [page, setPage] = useState(1);
   const dispatch = useDispatch();

   const { clientList } = useSelector((state) => ({
      clientList: state.client.clientList,
   }));

   const changePage = (number) => {
      if (page === number) return;

      let start = number > 1 ? number - 1 + "0" : 0;
      setPage(number);
      dispatch(
         clientActions.getClients({ status: status, start: start, end: 10 })
      );
      handleGetPage(start);
   };

   const loader = FindLoad("GET_CLIENTS");

   if (!!loader.length) return <Loader />;

   if (!clientList?.clients?.length)
      return <NoItemText text={"No Clients Yet"} />;

   return (
      <div className={globalStyle.tableWrapper}>
         <TableContainer
            component={Paper}
            style={{
               height: `calc(100vh - ${
                  clientList?.clients?.length ? "250px" : "150px"
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
                  {clientList?.clients?.map((item, i) => (
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
         <PaginationItem
            listLength={clientList?.clients?.length}
            page={page}
            handleReturn={(number) => changePage(number)}
            count={clientList?.count}
            entries={clientList?.clients?.length}
         />
      </div>
   );
};
