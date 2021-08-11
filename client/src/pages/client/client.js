import React, {useEffect, useState} from "react";
import {TableWrapper} from "@eachbase/components";
import {OfficesInfo, ClientTable,CreateClient} from "@eachbase/fragments";
import {useDispatch, useSelector} from "react-redux";

import {clientActions} from "@eachbase/store/client";
import {EditClient} from "../../fragments/client";


export const Client = ({}) => {
    const [open, setOpen] = useState(false)
    const [editClient , setEditClient] = useState('')
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(clientActions.getClients())
    }, []);

    console.log(editClient,'id')
    const {officeById} = useSelector((state) => ({
            officeById: state.offices.officeById,
        })
    )
    const handleOpenClose = () => {
        setOpen(!open)
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
                        body={editClient ? <EditClient handleClose={handleOpenClose} /> : <CreateClient handleClose={handleOpenClose}  />}
                    >

                        <ClientTable setEditClient={setEditClient} handleClose={handleOpenClose} />
                    </TableWrapper>
                )
                : (<OfficesInfo info={officeById}/>)

            }
        </>
    );
}
