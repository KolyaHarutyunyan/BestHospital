import React, { useEffect, useState } from "react";
import { DeleteElement, TableWrapper } from "@eachbase/components";
import { ClientTable, CreateClient } from "@eachbase/fragments";
import { useDispatch } from "react-redux";
import { clientsStyle } from "./styles";
import { clientActions, httpRequestsOnSuccessActions } from "@eachbase/store";
import { FindLoad, FindSuccess } from "@eachbase/utils";

export const Client = ({}) => {
   let classes = clientsStyle();

   const dispatch = useDispatch();

   const [open, setOpen] = useState(false);
   const [deleteClient, setDeleteClient] = useState("");
   const [page, setPage] = useState(1);
   const [status, setStatus] = useState("ACTIVE");

   useEffect(() => {
      dispatch(clientActions.getClients({ status: status, start: 0, end: 10 }));
   }, []);

   const handleActiveOrInactive = (status) => {
      setStatus(status);
      dispatch(clientActions.getClients({ status: status, start: 0, end: 10 }));
   };

   const handleOpenClose = () => {
      setDeleteClient(null);
      setOpen((prevState) => !prevState);
   };

   const loader = FindLoad("DELETE_CLIENT");
   const getLoader = FindLoad("GET_CLIENTS");
   const success = FindSuccess("DELETE_CLIENT");

   useEffect(() => {
      if (!!success.length) {
         handleOpenClose();
         dispatch(httpRequestsOnSuccessActions.removeSuccess("DELETE_CLIENT"));
      }
   }, [success]);

   return (
      <>
         <TableWrapper
            loader={!!getLoader.length}
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
                  <CreateClient title={"Add Client"} handleClose={handleOpenClose} />
               )
            }
         >
            <ClientTable
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
