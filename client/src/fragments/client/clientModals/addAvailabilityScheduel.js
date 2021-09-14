import React, {useEffect, useState} from "react";
import {ErrorText, useGlobalTextStyles} from "@eachbase/utils";
import {CloseButton, CreateChancel} from "@eachbase/components/buttons";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clientActions, httpRequestsOnErrorsActions, httpRequestsOnSuccessActions,} from "@eachbase/store";
import {modalsStyle} from "../../../components/modal/styles";
import {availabilityStyles} from "../../../components/availability/styles";


export const AddAvailabilityScheduel = ({handleClose, info}) => {




    const [error, setError] = useState("");
    const [inputs, setInputs] = useState(info ? {...info} : {});

    const params = useParams()
    const dispatch = useDispatch()
    const globalText = useGlobalTextStyles()
    const classes = modalsStyle()
    const classesModal = availabilityStyles()
    const {httpOnSuccess, httpOnError, httpOnLoad} = useSelector((state) => ({
        httpOnSuccess: state.httpOnSuccess,
        httpOnError: state.httpOnError,
        httpOnLoad: state.httpOnLoad,
    }));
    const errorText = httpOnError.length && httpOnError[0].error


    const success = httpOnSuccess.length && httpOnSuccess[0].type === 'EDIT_CLIENT_NOTE'
    const successCreate = httpOnSuccess.length && httpOnSuccess[0].type === 'CREATE_CLIENT_NOTE'


    const handleChange = e => {

        setInputs(
            prevState => ({...prevState, [e.target.name]: e.target.value}),
            error === e.target.name && setError(''),
        );


    }


    const handleCreate = () => {
        if (inputs.subject && inputs.text) {
            const data = {
                "subject": inputs.subject,
                'text': inputs.text,
                'resource': params.id,
                'onModel': 'Client'

            }
            if (info) {
                dispatch(clientActions.editClientNote(params.id, info.id, data))
                handleClose()
            } else {
                dispatch(clientActions.createClientNote(data))
                handleClose()
            }
        } else {
            setError(
                !inputs.subject ? 'subject' :
                    !inputs.text ? 'text' :
                        'Input is not field'
            )
        }
    }

    useEffect(() => {
        if (success) {
            handleClose()
            dispatch(httpRequestsOnSuccessActions.removeSuccess('EDIT_CLIENT_NOTE'))
        }
        if (successCreate) {
            handleClose()
            dispatch(httpRequestsOnSuccessActions.removeSuccess('CREATE_CLIENT_NOTE'))
        }
    }, [success, successCreate])


    return (
        <div className={classesModal.AddAvailabilityScheduel}>
            <h1 className={`${globalText.modalTitle}`}> {'Edit Availability Schedule'} </h1>
            <div className={classes.positionedButton}>
                <CloseButton handleCLic={handleClose}/>
            </div>

            <div className={classes.AddAvailabilityScheduelBlock}>
                <div className={classes.AddAvailabilityScheduelBox}>
                    <p>MON</p>
                </div>
            </div>


            <CreateChancel
                // loader={httpOnLoad.length > 0}
                 create={'Save'}
                chancel={"Cancel"}
                // onCreate={handleCreate}
                onClose={handleClose}
                buttonWidth='269px'
            />
        </div>
    );
}
