import React, { useContext, useEffect, useState } from "react";
import { DeleteElement, Loader, TableWrapper } from "@eachbase/components";
import { ClientTable, CreateClient } from "@eachbase/fragments";
import { useDispatch, useSelector } from "react-redux";
import { clientsStyle } from "./styles";
import { clientActions, httpRequestsOnSuccessActions } from "@eachbase/store";
import { FindLoad, FindSuccess, PaginationContext } from "@eachbase/utils";

export const Client = ({}) => {
   let classes = clientsStyle();

   const dispatch = useDispatch();

   const { pageIsChanging, handlePageChange } = useContext(PaginationContext);

   const clientList = useSelector((state) => state.client.clientList);
   const { clients, count } = clientList || {};

   const [page, setPage] = useState(1);
   const [open, setOpen] = useState(false);
   const [deleteClient, setDeleteClient] = useState("");
   const [status, setStatus] = useState("ACTIVE");

   useEffect(() => {
      dispatch(clientActions.getClients({ status: status, skip: 0, limit: 10 }));
   }, []);

   const handleActiveOrInactive = (status) => {
      setStatus(status);
      handlePageChange(true);
      setPage(1);
      dispatch(clientActions.getClients({ status: status, skip: 0, limit: 10 }));
   };

   const handleOpenClose = () => {
      setDeleteClient(null);
      setOpen((prevState) => !prevState);
   };

   const loader = FindLoad("DELETE_CLIENT");
   const success = FindSuccess("DELETE_CLIENT");

   const getClientsLoader = FindLoad("GET_CLIENTS");
   const getClientsSuccess = FindSuccess("GET_CLIENTS");

   useEffect(() => {
      if (!!success.length) {
         handleOpenClose();
         dispatch(httpRequestsOnSuccessActions.removeSuccess("DELETE_CLIENT"));
      }
   }, [success]);

   useEffect(
      () => () => {
         if (pageIsChanging) {
            handlePageChange(false);
         }
      },
      [pageIsChanging]
   );

   useEffect(() => {
      if (!!getClientsSuccess.length) {
         if (!pageIsChanging) setPage(1);
         handlePageChange(false);
         dispatch(httpRequestsOnSuccessActions.removeSuccess("GET_CLIENTS"));
      }
   }, [getClientsSuccess]);

   if (!!getClientsLoader.length && !pageIsChanging) return <Loader />;

   return (
      <>
         <TableWrapper
            handleType={handleActiveOrInactive}
            firstButton={"Active"}
            secondButton={"Inactive"}
            buttonsTab={true}
            buttonsTabAddButton={true}
            addButtonText={"Add Client"}
            handleOpenClose={handleOpenClose}
            openCloseInfo={open}
            body={
               deleteClient ? (
                  <DeleteElement
                     loader={!!loader.length}
                     handleDel={() =>
                        dispatch(clientActions.deleteClient(deleteClient.id))
                     }
                     className={classes}
                     text={"Delete Client"}
                     info={deleteClient.firstName}
                     handleClose={handleOpenClose}
                  />
               ) : (
                  <CreateClient title={"Add Client"} handleClose={() => setOpen(false)} />
               )
            }
         >
            <ClientTable
               clients={clients}
               clientsLoader={!!getClientsLoader.length}
               clientsCount={count}
               page={page}
               status={status}
               handleGetPage={setPage}
               setDeleteClient={setDeleteClient}
               setOpen={setOpen}
               handleClose={handleOpenClose}
            />
         </TableWrapper>
      </>
   );
};
