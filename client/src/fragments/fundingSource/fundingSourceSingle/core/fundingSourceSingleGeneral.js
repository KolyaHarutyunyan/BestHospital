import React from "react";
import {Card} from "../../../../components";

export const FundingSourceSingleGeneral = ({data}) => {
    return (
        <div>
            <div style={{display: 'flex', justifyContent: "space-between"}}>
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
                    {title: 'Street Address', value: 'Center',},
                    {title: 'Country', value : 'Armenia'},
                    {title: 'City',value: "Yerevan"},
                    {title: 'State',value: "Yerevan"},
                    {title: 'Zip Code',value: "005"},
                ]}
                      width={'32.5%'}/>
            </div>
        </div>
    )
}