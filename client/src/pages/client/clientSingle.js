import React, {useEffect} from "react";
import {ClientItem} from "@eachbase/fragments/client";
import {clientActions, fundingSourceActions, noteActions, availabilityScheduleActions} from "@eachbase/store";

import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";

export const ClientSingle = () => {

    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        dispatch(clientActions.getClientsById(params.id))
        dispatch(clientActions.getClientsContacts(params.id))
        dispatch(clientActions.getClientsEnrollment(params.id))
        dispatch(clientActions.getClientsAuthorizations(params.id))
        dispatch(fundingSourceActions.getFundingSourceHistoriesById('Client'))
        dispatch(noteActions.getGlobalNotes(params.id, 'Client'))
        dispatch(availabilityScheduleActions.getAvailabilitySchedule(params.id))
        dispatch(fundingSourceActions.getFundingSource())
    }, []);

    return (
        <ClientItem/>
    )
}