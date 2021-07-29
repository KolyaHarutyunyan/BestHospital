import React, {} from "react";
import {createStaffModalStyle} from "./style";
import {Steps} from "../../../../components";
import {useGlobalTextStyles} from "../../../../utils";
import {CloseButton} from "../../../../components";
import address from "@eachbase/assets/images/icons/address.svg";

const steps = ['General Info', 'Address', 'Other Details']
const icons = [address]
export const CreateStaff = ({}) => {
    const classes = createStaffModalStyle()
    const globalText = useGlobalTextStyles()
    return (
        <div className={classes.modalDimensions}>
            <h1 className={`${globalText.modalTitle} ${classes.modalTitle}`}>Add Staff Member</h1>
            <div className={classes.positionedButton}>
                <CloseButton />
            </div>
            <Steps stepTitles={steps} />
        </div>
    );
};
