import React, {useEffect, useState} from "react";
import {AddModalButton, CloseButton, ValidationInput, Textarea} from "@eachbase/components";
import {ErrorText, useGlobalTextStyles} from "@eachbase/utils";
import {modalsStyle} from "@eachbase/components/modal/styles";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {noteActions} from "@eachbase/store/notes";
import {httpRequestsOnSuccessActions} from "../../store";
import {httpRequestsOnLoadActions} from "../../store/http_requests_on_load";


export const AddNotes = ({closeModal, model, noteModalTypeInfo, handleClose}) => {
    const dispatch = useDispatch()
    const classes = modalsStyle()
    const globalText = useGlobalTextStyles()
    const params = useParams()
    const [error, setError] = useState("");
    const [inputs, setInputs] = useState(noteModalTypeInfo ? noteModalTypeInfo : {});
    const handleChange = e => {
        setInputs(
            prevState => (
                {
                    ...prevState,
                    [e.target.name]: e.target.value
                }
            ));
        error === e.target.name && setError('')
    }

    const handleSubmit = () => {
        let data = {
            text: inputs.text,
            subject: inputs.subject,
            resource: params.id,
            onModel: model
        }
        if (inputs.subject && inputs.text) {
            dispatch(noteActions.createGlobalNote(data))
        } else {
            setError(
                !inputs.subject ? 'subject' :
                    !inputs.text ? 'text' :
                            'Input is not filled'
            )
        }
    }

    const handleEdit = () => {
        let data = {
            text: inputs.text,
            subject: inputs.subject,
        }
        if (inputs.subject && inputs.text) {
            dispatch(noteActions.editGlobalNote(params.id, noteModalTypeInfo.id, data, model))
            closeModal()
        } else {
            setError(
                !inputs.subject ? 'subject' :
                    !inputs.text ? 'text' :
                        'Input is not filled'
            )
        }
    }

    const {httpOnLoad,httpOnSuccess} = useSelector((state) => ({
        httpOnSuccess: state.httpOnSuccess,
        httpOnLoad: state.httpOnLoad,
    }));

    const success =
        httpOnSuccess.length && httpOnSuccess[0].type === 'CREATE_GLOBAL_NOTE' ? true :
            httpOnSuccess.length && httpOnSuccess[0].type === 'EDIT_GLOBAL_NOTE'

    const loader =
        httpOnLoad.length && httpOnLoad[0] === 'CREATE_GLOBAL_NOTE' ? true :
            httpOnLoad.length && httpOnLoad[0] === 'EDIT_GLOBAL_NOTE'

    useEffect(() => {
        if (success) {
            dispatch(httpRequestsOnSuccessActions.removeSuccess(httpOnSuccess.length && httpOnSuccess[0].type))
            dispatch(httpRequestsOnLoadActions.removeLoading(httpOnSuccess.length && httpOnSuccess[0].type))
            handleClose()
        }
    }, [success, loader]);

    return (
        <div className={classes.inactiveModalBody}>
            <h1 className={`${globalText.modalTitle}`}>{noteModalTypeInfo?.modalType === 'editNote' ? 'Edit Note' : 'Add a New Note'}</h1>
            <div className={classes.positionedButton}>
                <CloseButton handleCLic={handleClose}/>
            </div>
            <p className={classes.inactiveModalInfo}>Please fulfill the below fields to add a comment.</p>
            <ValidationInput
                variant={"outlined"}
                value={inputs.subject}
                type={"text"}
                placeholder={"Subject*"}
                name='subject'
                onChange={handleChange}
                typeError={error === 'subject' && ErrorText.field}
            />
            <Textarea
                maxRows={6}
                variant={"outlined"}
                value={inputs.text}
                label={"Add your comment here ..."}
                name='text'
                onChange={handleChange}
                typeError={error === 'text' && ErrorText.field}
            />

            {
                noteModalTypeInfo?.modalType === 'editNote' ? <AddModalButton loader={loader} handleClick={handleEdit} text='Edit'/> :
                    <AddModalButton loader={loader} handleClick={handleSubmit} text='Add'/>
            }
        </div>
    );
}