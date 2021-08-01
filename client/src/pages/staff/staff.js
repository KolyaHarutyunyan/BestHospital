import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {TableWrapper, Notes} from "@eachbase/components";
import {OfficesInfo, StaffTable, CreateStaff,} from "@eachbase/fragments";

import {officeActions} from "@eachbase/store";
import {useDispatch, useSelector} from "react-redux";

export const Staff = ({}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [open, setOpen] = useState(false)
    useEffect(() => {
        dispatch(officeActions.getOffices())
    }, []);

    // const {officeById} = useSelector((state)=>({
    //         officeById: state.offices.officeById,
    //     })
    // )
    const handleOpenClose = () => {
        setOpen(!open)
    }

    return (
        <>
            {/*{!officeById ?*/}
            {/*    (*/}
            <TableWrapper
                firstButton={"Active"}
                secondButton={"Inactive"}
                buttonsTab={true}
                buttonsTabAddButton={true}
                addButtonText={'Add Staff Member'}
                openCloseInfo={open}
                handleOpenClose={handleOpenClose}
                body={<CreateStaff handleClose={handleOpenClose}/>}
            >
                <StaffTable/>
            </TableWrapper>

            {/*)*/}
            {/*: (<OfficesInfo info={officeById}/>)*/}
        </>
    );
}
