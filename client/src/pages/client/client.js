import React, {useEffect, useState} from "react";
import {DeleteElement, TableWrapper} from "@eachbase/components";
import {OfficesInfo, ClientTable, CreateClient} from "@eachbase/fragments";
import {useDispatch, useSelector} from "react-redux";
import {clientsStyle} from './styles'
import {clientActions} from "@eachbase/store/client";
import {httpRequestsOnSuccessActions} from "@eachbase/store";


export const Client = ({}) => {
    let classes = clientsStyle()
    const [open, setOpen] = useState(false)
    const [deleteClient, setDeleteClient] = useState('')
    const [page, setPage] = useState(1)
    const dispatch = useDispatch()
    const [status, setStatus] = useState(1)


    const {httpOnSuccess, httpOnError, httpOnLoad} = useSelector((state) => ({
        httpOnSuccess: state.httpOnSuccess,
        httpOnError: state.httpOnError,
        httpOnLoad: state.httpOnLoad,
    }));
    const errorText = httpOnError.length && httpOnError[0].error
    const success = httpOnSuccess.length && httpOnSuccess[0].type === 'DELETE_CLIENT'


    useEffect(() => {
        dispatch(clientActions.getClients({status: status, start: 0, end: 10}))
    }, []);

    const handleActiveOrInactive = (status) => {
        setStatus(status)
        if (status === 0) {
            dispatch(clientActions.getClients({status: status, start: 0, end: 10}))
        } else {
            dispatch(clientActions.getClients({status: status, start: 0, end: 10}))
        }
    }

    useEffect(() => {
        dispatch(clientActions.getClients())
    }, []);


    const {officeById} = useSelector((state) => ({
            officeById: state.offices.officeById,
        })
    )
    const handleOpenClose = () => {
        setDeleteClient(null)
        setOpen(!open)
    }
    const removeClient = () => {
        dispatch(clientActions.deleteClient(deleteClient.id))
    }


    useEffect(() => {
        if (success) {
            handleOpenClose()
            dispatch(httpRequestsOnSuccessActions.removeSuccess('DELETE_CLIENT'))
        }

    }, [success])

    return (
        <>
            {!officeById ?
                (
                    <TableWrapper
                        getActive={() => handleActiveOrInactive(1)}
                        getInactive={() => handleActiveOrInactive(0)}
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
                                handleDel={removeClient}
                                className={classes}
                                text={'Delete Client'}
                                info={deleteClient.firstName}
                                handleClose={handleOpenClose}/>
                            :
                            <CreateClient title={'Add Client'} handleClose={handleOpenClose}/>}
                    >
                        <ClientTable status={status} handleGetPage={setPage} setDeleteClient={setDeleteClient}
                                     setOpen={setOpen} handleClose={handleOpenClose}/>
                    </TableWrapper>
                )
                : (<OfficesInfo info={officeById}/>)
            }
        </>
    );
}
