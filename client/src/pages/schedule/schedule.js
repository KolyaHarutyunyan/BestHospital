import {ScheduleFragment} from "@eachbase/fragments";
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {adminActions, appointmentActions, clientActions, systemActions} from "@eachbase/store";
import {FindLoad} from "@eachbase/utils";
import {Loader} from "@eachbase/components";

export const Schedule = ({}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(appointmentActions.getAppointment('load'))
        dispatch(clientActions.getClients({status: 'ACTIVE'}))
        dispatch(adminActions.getAdmins({status: 'ACTIVE'}))
        dispatch(systemActions.getPlaces())
    }, [])



    return (
        <div>
                <ScheduleFragment/>
        </div>
    )
}