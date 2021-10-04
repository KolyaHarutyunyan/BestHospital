import React, {useEffect, useState} from "react";
import {TableWrapper} from "@eachbase/components";
import {CreateStaff, StaffTable,} from "@eachbase/fragments";
import {adminActions, systemActions} from "@eachbase/store";
import {useDispatch, useSelector} from "react-redux";

export const Staff = () => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [page, setPage] = useState(1)
    const [status,setStatus] = useState(1)

    const { adminsList } = useSelector((state) => ({
        adminsList: state.admins.adminsList,
    }));
    const globalDepartments = useSelector(state => state.system.departments)

    useEffect(() => {
        dispatch(adminActions.getAdmins({ status : status, start : 0, end : 20 }))
        dispatch(systemActions.getDepartments())
    }, []);

    const handleOpenClose = () => {
        setOpen(!open)
    }

    const getStaffMemberWithStatus = (status) => {
        setStatus(status)
        if(status === 0){
            dispatch(adminActions.getAdmins({status: 0, start: 0,end: 20}))
        }else {
            dispatch(adminActions.getAdmins({status: 1, start: 0, end: 20}));
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
                body={<CreateStaff globalDepartments={globalDepartments} adminsList={adminsList && adminsList.staff} resetData={true} handleClose={handleOpenClose}/>}
            >
                <StaffTable handleGetPage={setPage}  status ={status} />
            </TableWrapper>
        </>
    );
}
