import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {TableWrapper} from "@eachbase/components";
import {OfficesInfo, StaffTable, CreateStaff,} from "@eachbase/fragments";

import {adminActions} from "@eachbase/store";
import {useDispatch, useSelector} from "react-redux";

export const Staff = () => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)


    useEffect(() => {
        dispatch(adminActions.getAdmins())
    }, []);

    const handleOpenClose = () => {
        setOpen(!open)
    }

    return (
        <>
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
            {/*// : (<OfficesInfo info={officeById}/>)*/}
        </>
    );
}
