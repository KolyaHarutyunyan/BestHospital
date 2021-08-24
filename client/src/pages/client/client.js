import React, {useEffect, useState} from "react";
import {DeleteElement,  TableWrapper} from "@eachbase/components";
import {OfficesInfo, ClientTable, CreateClient} from "@eachbase/fragments";
import {useDispatch, useSelector} from "react-redux";
import {clientsStyle} from './styles'
import {clientActions} from "@eachbase/store/client";



export const Client = ({}) => {
    let classes = clientsStyle()
    const [open, setOpen] = useState(false)
    const [deleteClient, setDeleteClient] = useState('')
    const dispatch = useDispatch()
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
    const removeClient=()=>{
         dispatch(clientActions.deleteClient(deleteClient.id))
    }
    return (
        <>
            {!officeById ?
                (
                    <TableWrapper
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
                        <ClientTable  setDeleteClient={setDeleteClient} setOpen={setOpen} handleClose={handleOpenClose}/>
                    </TableWrapper>
                )
                : (<OfficesInfo info={officeById}/>)

            }
        </>
    );
}
