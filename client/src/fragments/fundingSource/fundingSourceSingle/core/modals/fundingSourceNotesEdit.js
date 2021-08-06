import React from "react";
import {modalsStyle} from "../../../../../components/modal/styles";
import {ErrorText, useGlobalTextStyles} from "@eachbase/utils";
import {AddModalButton, CloseButton} from "@eachbase/components/buttons";
import {ValidationInput, Textarea} from "@eachbase/components/inputs";

export const FundingSourceNotesEdit = ({handleOpenClose }) => {

    const classes = modalsStyle()
    const globalText = useGlobalTextStyles()

    return (
        <div className={classes.inactiveModalBody}>
            <h1 className={`${globalText.modalTitle}`}>Inactivate Name Surname?</h1>
            <div className={classes.positionedButton}>
                <CloseButton handleCLic={handleOpenClose}/>
            </div>
            <p className={classes.inactiveModalInfo}>Name Surname will be notified about the inactivation reason after inactivation.</p>
            <ValidationInput
                variant={"outlined"}
                // sendBoolean={handleCheck}
                onChange={()=>alert('change')}
                // value={inputs.birthDate}
                type={"date"}
                label={"Inactivation Date*"}
                name='inactivationDate'
                // typeError={error === 'birthDate' && ErrorText.field}
            />
            <Textarea
                maxRows={6}
                variant={"outlined"}
                // sendBoolean={handleCheck}
                onChange={()=>console.log('change')}
                label={"Write inactivation reason here..."}
                name='inactiveReason'
                // typeError={error === 'birthDate' && ErrorText.field}
            />
            <AddModalButton text='Inactivate' handleClick={handleOpenClose} />
        </div>
    );
}
