import React from "react";
import {AddModalButton, Card,} from '@eachbase/components';
import {serviceSingleStyles} from './styles';
import {Colors, Images} from "@eachbase/utils";
import {AvailableHours} from "./availableHours";



export const ClientAvailabilitySchedule = ({data,}) => {
    const classes = serviceSingleStyles()


    const generalInfo = [
        {title: 'First Name', value: data?.firstName},
        {title: 'Middle Name', value: data?.middleName},
        {title: 'Last Name', value: data?.lastName},
        {title: 'Code', value: data?.code},
    ]


    return (
        <div className={classes.staffGeneralWrapper}>
            <Card
                width='32.5%'
                cardInfo={generalInfo}
                showHeader={true}
                title='General Info'
                color={Colors.BackgroundBlue}
                icon={Images.generalInfoIcon}
            />
            <div style={{width: 24}}/>


           <AvailableHours />

        </div>
    )
}