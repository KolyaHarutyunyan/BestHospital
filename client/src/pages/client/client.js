import React, {useEffect, useState} from "react";
import {DeleteElement, TableWrapper} from "@eachbase/components";
import {ClientTable, CreateClient} from "@eachbase/fragments";
import {useDispatch} from "react-redux";
import {clientsStyle} from './styles'
import {clientActions} from "@eachbase/store";
import {FindLoad, FindSuccess} from "@eachbase/utils";

export const Client = ({}) => {
    let classes = clientsStyle()
    const [open, setOpen] = useState(false)
    const [deleteClient, setDeleteClient] = useState('')
    const [page, setPage] = useState(1)
    const dispatch = useDispatch()
    const [status, setStatus] = useState('ACTIVE')

    useEffect(() => {
        dispatch(clientActions.getClients({status: status, start: 0, end: 10}))
    }, []);

    const handleActiveOrInactive = (status) => {
        setStatus(status)
        dispatch(clientActions.getClients({status: status, start: 0, end: 10}))
    }

    const handleOpenClose = () => {
        setDeleteClient(null)
        setOpen(!open)
    }

    const removeClient = () => dispatch(clientActions.deleteClient(deleteClient.id))
    const loader = FindLoad('DELETE_CLIENT')
    const getLoader = FindLoad('GET_CLIENTS')
    const success = FindSuccess('DELETE_CLIENT')

    useEffect(() => {
        if (success) {
            handleOpenClose()
        }
    }, [success.length])

    return (
        <>

            <TableWrapper
                loader={!!getLoader.length}
                handleType={handleActiveOrInactive}
                firstButton={"Active"}
                secondButton={"Inactive"}
                addButton={"Add Client"}
                buttonsTab={true}
                buttonsTabAddButton={true}
                addButtonText={'Add Client'}
                handleOpenClose={handleOpenClose}
                openCloseInfo={open}
                body={deleteClient ?
                    <DeleteElement
                        loader={!!loader.length}
                        handleDel={removeClient}
                        className={classes}
                        text={'Delete Client'}
                        info={deleteClient.firstName}
                        handleClose={handleOpenClose}
                    />
                    :
                    <CreateClient
                        title={'Add Client'}
                        handleClose={handleOpenClose}
                    />
                }
            >
                <ClientTable status={status}
                             handleGetPage={setPage}
                             setDeleteClient={setDeleteClient}
                             setOpen={setOpen}
                             handleClose={handleOpenClose}
                />
            </TableWrapper>
        </>
    );
}
