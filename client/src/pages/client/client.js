import React, {useEffect, useState} from "react";
import {TableWrapper} from "@eachbase/components";
import {OfficesInfo, FundingSourceTable, CreateFundingSource} from "@eachbase/fragments";


import {useDispatch, useSelector} from "react-redux";
import {ClientTable} from "@eachbase/fragments";
import {clientActions} from "@eachbase/store/client";



export const Client = ({}) => {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(clientActions.getClients())
    }, []);


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
                        body={<p>add client</p> }
                    >

                        <ClientTable/>
                    </TableWrapper>
                )
                : (<OfficesInfo info={officeById}/>)

            }
        </>
    );
}
