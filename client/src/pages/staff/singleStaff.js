import React, {useEffect} from "react";
import {StaffItem} from "@eachbase/fragments";
import {useDispatch, useSelector} from "react-redux";
import {
    adminActions,
    fundingSourceActions,
    systemActions,
    noteActions,
    availabilityScheduleActions,
    roleActions, authActions
} from "../../store";
import {useParams} from "react-router-dom";

export const SingleStaff = () => {
    const staffGeneral = useSelector(state => state.admins.adminInfoById)
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        dispatch(adminActions.getCredential(params.id))
        dispatch(adminActions.getAdminById(params.id))
        dispatch(systemActions.getCredentialGlobal())
        dispatch(noteActions.getGlobalNotes(params.id, 'Staff'))
        dispatch(fundingSourceActions.getFundingSourceHistoriesById('Staff'))
        dispatch(availabilityScheduleActions.getAvailabilitySchedule(params.id))
        dispatch(adminActions.getEmployment(params.id))
        dispatch(adminActions.getStaffService(params.id))
        dispatch(adminActions.getTimesheet(params.id))
        dispatch(systemActions.getServices())
        dispatch(roleActions.getRole());
        dispatch(authActions.getAccess(params.id))
    }, [])

    return (
        <>
            <StaffItem gen={staffGeneral}/>
        </>
    );
}
