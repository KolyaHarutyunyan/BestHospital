import React, {useEffect, useState} from "react";
import {TableWrapper} from "@eachbase/components";
import {CreateStaff, StaffTable,} from "@eachbase/fragments";

import {adminActions} from "@eachbase/store";
import {useDispatch} from "react-redux";

export const Staff = () => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        dispatch(adminActions.getAdmins());
    }, []);

    const handleOpenClose = () => {
        setOpen(!open)
    }

    const getStaffMemberWithStatus = (status) => {
        dispatch(adminActions.getAdmins(status));
    }

    return (
        <>
            <TableWrapper
                getActive={() => getStaffMemberWithStatus(1)}
                getInactive={() => getStaffMemberWithStatus(0)}
                firstButton={"Active"}
                secondButton={"Inactive"}
                buttonsTab={true}
                buttonsTabAddButton={true}
                addButtonText={'Add Staff Member'}
                openCloseInfo={open}
                handleOpenClose={handleOpenClose}
                body={<CreateStaff resetData={true} handleClose={handleOpenClose}/>}
            >
                <StaffTable/>
            </TableWrapper>
        </>
    );
}
