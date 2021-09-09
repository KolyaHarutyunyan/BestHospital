import React, {useEffect, useState} from "react";
import {TableWrapper} from "@eachbase/components";
import {CreateStaff, StaffTable,} from "@eachbase/fragments";
import {adminActions} from "@eachbase/store";
import {useDispatch} from "react-redux";

export const Staff = () => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [page, setPage] = useState(1)
    const [status,setStatus] = useState(1)

    useEffect(() => {
        dispatch(adminActions.getAdmins({status: status, start: 0,end: 10}));
    }, []);

    const handleOpenClose = () => {
        setOpen(!open)
    }

    const getStaffMemberWithStatus = (status) => {
        setStatus(status)
        if(status === 0){
            dispatch(adminActions.getAdmins({status: status, start: 0,end: 10}))
        }else {
            dispatch(adminActions.getAdmins({status: status, start: page, end: 10}));
        }

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
                <StaffTable handleGetPage={setPage}  status ={status} />
            </TableWrapper>
        </>
    );
}
