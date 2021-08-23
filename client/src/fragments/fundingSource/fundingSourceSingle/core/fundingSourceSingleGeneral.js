import React from "react";
import {Card} from "@eachbase/components";
import {fundingSourceSingleStyles} from "./styles";

export const FundingSourceSingleGeneral = ({data}) => {
    const classes = fundingSourceSingleStyles()
    return (
        <div>
            <div className={classes.fundingSourceSingleGeneralStyles}>
                <Card cardInfo={[
                    {title: 'Name', value: data?.name,},
                    {title: 'Email Address', value: data?.email},
                    {title: 'Phone Number', value: data?.phoneNumber}
                ]}
                      width={'32.5%'}/>
                <Card cardInfo={[
                    {title: 'Type', value: data?.type,},
                    {title: 'Contact Person', value: data?.contact},
                    {title: 'Website', value: data?.website}
                ]}
                      width={'32.5%'}/>
                <Card cardInfo={[
                    {title: 'Street Address', value: data?.address?.street,},
                    {title: 'Country', value : data?.address?.country,},
                    {title: 'City',value: data?.address?.city,},
                    {title: 'State',value: data?.address?.state,},
                    {title: 'Zip Code',value: data?.address?.zip,},
                ]}
                      width={'32.5%'}/>
            </div>
        </div>
    )
}