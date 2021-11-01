import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {SystemItem} from "@eachbase/fragments";
import {mileagesActions, systemActions, payrollActions} from "@eachbase/store";


export const System = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(systemActions.getCredentialGlobal())
        dispatch(systemActions.getServices())
        dispatch(systemActions.getDepartments())
        dispatch(systemActions.getJobs())
        dispatch(systemActions.getPlaces())
        dispatch(payrollActions.getPayCodeGlobal())
        dispatch(payrollActions.getOvertimeSettingsGlobal())
        dispatch(mileagesActions.getMileages())
    }, [])

    return (
        <SystemItem/>
    )
}