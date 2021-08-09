import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {adminActions} from "@eachbase/store";
import {useDispatch, useSelector} from "react-redux";

const AddCredential = {
    staffId: '610bcdd691e2130e1a12371b',
    credentialId: '610cf947776f5210843ccb54',
    expirationDate: '06/11/2021'
}

const editCredentialData = {
    credentialId: "610cf947776f5210843ccb54",
    expirationDate: "05/05/2019"
}

export const StaffCredentials = () => {

    const dispatch = useDispatch()

    const params = useParams();

    const removeCredentialData = {
        id: params.id
    }

    useEffect(() => {
        dispatch(adminActions.getCredentialById(params.id))
    }, [])

    const addCredential = () => {
        dispatch(adminActions.createCredential(AddCredential))
    }

    const editCredential = () => {
        dispatch(adminActions.editCredentialById(editCredentialData, params.id))
    }
    const removeCredential = () => {
        dispatch(adminActions.deleteCredentialById(removeCredentialData))
    }

    const credentialData = useSelector(state => state.admins.credentialById)

    return (
        <div>
            {/*<button onClick={addCredential}>add credential</button>*/}
            {/*<button onClick={editCredential}>edit credential</button>*/}
            {/*<button onClick={removeCredential}>remove credential</button>*/}

            {/*<div style={{marginTop: 40}}>*/}
            {/*    <>*/}
            {/*        <p>{credentialData._id}</p>*/}
            {/*        <p>{credentialData.credentialId}</p>*/}
            {/*        <p>{credentialData.expirationDate}</p>*/}
            {/*    </>*/}

            {/*</div>*/}
            Credentials
        </div>
    )
}