
import React from "react";
import { useGlobalTextStyles } from "@eachbase/utils";
import { createFoundingSourceStyle } from './styles'
import { CloseButton } from "@eachbase/components";
import CreateFundingSourceHeaderBottom from "./createFundingSourceHeaderBottom";




export const CreateFoundingSourceHeader = ({handleClose,title}) => {
    const classes = createFoundingSourceStyle()
    const globalStyle = useGlobalTextStyles()

    return (
        <div className={classes.createFoundingSourceHeader}>
            <div className={classes.createFoundingSourceHeaderTop}>
                <CloseButton handleCLic={handleClose}  />
            </div>
            <p className={globalStyle.modalTitle}>{title}</p>
            <CreateFundingSourceHeaderBottom />

        </div>
    );
};
