
import React from "react";
import { useGlobalTextStyles } from "@eachbase/utils";
import { createFoundingSourceStyle } from './styles'
import { CloseButton } from "@eachbase/components";




export const FoundingSourceHeader = ({handleClose}) => {
    const classes = createFoundingSourceStyle()
    const globalStyle = useGlobalTextStyles()

    return (
        <div className={classes.createFoundingSourceHeader}>
            <div className={classes.createFoundingSourceHeaderTop}>
                <CloseButton handleCLic={handleClose} styles={{ background: '#A3B2BD80', }} />
            </div>
            <p className={globalStyle.modalTitle}>Add Funding Source</p>


        </div>
    );
};
