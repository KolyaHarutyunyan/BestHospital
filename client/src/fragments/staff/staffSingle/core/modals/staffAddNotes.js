import React from "react";
import {modalsStyle} from "@eachbase/components/modal/styles";
import {ErrorText, useGlobalTextStyles} from "@eachbase/utils";
import {AddModalButton, CloseButton} from "@eachbase/components/buttons";
import {ValidationInput, Textarea} from "@eachbase/components/inputs";

export const StaffAddNotes = ({handleClose }) => {

    const classes = modalsStyle()
    const globalText = useGlobalTextStyles()

    return (
        <div className={classes.inactiveModalBody}>
            <h1 className={`${globalText.modalTitle}`}>Add a New Note</h1>
            <div className={classes.positionedButton}>
                <CloseButton handleCLic={handleClose}/>
            </div>
            <p className={classes.inactiveModalInfo}>Please fulfill the below fields to add a comment.</p>
            <ValidationInput
                variant={"outlined"}
                // sendBoolean={handleCheck}
                onChange={()=>alert('change')}
                // value={inputs.birthDate}
                type={"text"}
                label={" Subject*"}
                name='subject*'
                // typeError={error === 'birthDate' && ErrorText.field}
            />
            <Textarea
                maxRows={6}
                variant={"outlined"}
                // sendBoolean={handleCheck}
                onChange={()=>console.log('change')}
                label={"Add your comment here ..."}
                name=''
                // typeError={error === 'birthDate' && ErrorText.field}
            />
            <AddModalButton text='Add'  />
        </div>
    );
}
