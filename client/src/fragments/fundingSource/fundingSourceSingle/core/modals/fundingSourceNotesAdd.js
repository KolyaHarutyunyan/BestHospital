import React, {useEffect, useState} from "react";
import {ErrorText, useGlobalTextStyles} from "@eachbase/utils";
import {AddModalButton, CloseButton} from "@eachbase/components/buttons";
import {ValidationInput, Textarea} from "@eachbase/components/inputs";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fundingSourceActions} from "@eachbase/store";
import {modalsStyle} from "../../../../../components/modal/styles";

export const FundingSourceNotesAdd = ({handleClose, info}) => {
    console.log(info,'infoooo')
    const [error, setError] = useState("");
    const [inputs, setInputs] = useState(info ? {...info}:{});

    const params = useParams()
    const dispatch = useDispatch()
    const globalText = useGlobalTextStyles()
    const classes = modalsStyle()

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
                'onModel': 'Funder'

            }
            if(info){
                dispatch(fundingSourceActions.editFoundingSourceNote(info.id,data))
            }else {
                dispatch(fundingSourceActions.createFoundingSourceNote(data))
            }
        } else {
            setError(
                !inputs.subject ? 'subject' :
                    !inputs.text ? 'text' :
                        'Input is not field'
            )
        }
    }


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
            <AddModalButton text={info ? 'Save' : 'Add'} handleClick={handleCreate}/>
        </div>
    );
}
