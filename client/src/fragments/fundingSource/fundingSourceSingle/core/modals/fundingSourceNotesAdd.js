import React from "react";
import {modalsStyle} from "../../../../../components/modal/styles";
import { useGlobalTextStyles} from "@eachbase/utils";
import {AddModalButton, CloseButton} from "@eachbase/components/buttons";
import {ValidationInput, Textarea} from "@eachbase/components/inputs";

export const FundingSourceNotesAdd = ({handleClose }) => {

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
                onChange={()=>alert('change')}
                type={"text"}
                label={" Subject*"}
                name='subject*'
            />
            <Textarea
                maxRows={6}
                variant={"outlined"}
                onChange={()=>console.log('change')}
                label={"Add your comment here ..."}
                name=''
            />
            <AddModalButton text='Add'  />
        </div>
    );
}
