import React, {useState} from "react";
import {AddModalButton, CloseButton, ValidationInput, Textarea} from "@eachbase/components";
import {useGlobalTextStyles} from "@eachbase/utils";
import {modalsStyle} from "@eachbase/components/modal/styles";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {noteActions} from "@eachbase/store/notes";

export const StaffAddNotes = ({noteModalTypeInfo, handleClose }) => {
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


    const handleSubmit = () =>{
        let data = {
            text: inputs.text,
            subject: inputs.subject,
            resource: params.id,
            onModel: 'Staff'
        }
        if(inputs.subject){
            dispatch(noteActions.createGlobalNote(data))
            handleClose()
        }
    }
    const handleEdit = () =>{
        let data = {
            text: inputs.text,
            subject: inputs.subject,
        }
        if(inputs.subject){
            dispatch(noteActions.editGlobalNote(params.id, noteModalTypeInfo.id, data, 'Staff'))
            handleClose()
        }
    }

    return (
        <div className={classes.inactiveModalBody}>
            <h1 className={`${globalText.modalTitle}`}>{noteModalTypeInfo?.modalType === 'editNote' ? 'Edit Note' : 'asdasdAdd a New Note'}</h1>
            <div className={classes.positionedButton}>
                <CloseButton handleCLic={handleClose}/>
            </div>
            <p className={classes.inactiveModalInfo}>Please fulfill the below fields to add a comment.</p>
            <ValidationInput
                variant={"outlined"}
                value={inputs.subject}
                type={"text"}
                label={"Subject*"}
                name='subject'
                onChange={handleChange}
            />
            <Textarea
                maxRows={6}
                variant={"outlined"}
                value={inputs.text}
                label={"Add your comment here ..."}
                name='text'
                onChange={handleChange}
            />

            {
                noteModalTypeInfo?.modalType === 'editNote' ?  <AddModalButton handleClick={handleEdit} text='Edit'  /> :
                <AddModalButton handleClick={handleSubmit} text='Add'  />
            }
        </div>
    );
}
