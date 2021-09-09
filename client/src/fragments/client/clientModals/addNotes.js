import React, {useEffect, useState} from "react";
import {ErrorText, useGlobalTextStyles} from "@eachbase/utils";
import {AddModalButton, CloseButton} from "@eachbase/components/buttons";
import {ValidationInput, Textarea} from "@eachbase/components/inputs";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clientActions, httpRequestsOnErrorsActions, httpRequestsOnSuccessActions,} from "@eachbase/store";
import {modalsStyle} from "../../../components/modal/styles";


export const AddNotes = ({handleClose, info}) => {




    const [error, setError] = useState("");
    const [inputs, setInputs] = useState(info ? {...info} : {});

    const params = useParams()
    const dispatch = useDispatch()
    const globalText = useGlobalTextStyles()
    const classes = modalsStyle()

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
        <div className={classes.inactiveModalBody}>
            <h1 className={`${globalText.modalTitle}`}> {info ? 'Edit Note' : 'Add a New Note'} </h1>
            <div className={classes.positionedButton}>
                <CloseButton handleCLic={handleClose}/>
            </div>
            <p className={classes.inactiveModalInfo}>Please fulfill the below fields to add a comment.</p>
            <ValidationInput
                variant={"outlined"}
                onChange={handleChange}
                type={"text"}
                label={" Subject*"}
                name='subject'
                typeError={error === 'subject' && ErrorText.field}
                value={inputs.subject}
            />
            <Textarea
                maxRows={6}
                variant={"outlined"}
                onChange={handleChange}
                label={"Add your comment here ..."}
                name='text'
                value={inputs.text}
                typeError={error === 'text' && ErrorText.field}
            />
            <AddModalButton
                text={info ? 'Save' : 'Add'}
                handleClick={handleCreate}
                loader={httpOnLoad.length > 0}
            />
        </div>
    );
}
