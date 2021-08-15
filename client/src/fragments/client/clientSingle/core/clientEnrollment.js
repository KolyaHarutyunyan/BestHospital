import {Card, Notes, TableBodyComponent} from '@eachbase/components';
import { serviceSingleStyles } from './styles';
import { Colors, Images } from "@eachbase/utils";
import {TableCell} from "@material-ui/core";
import React from "react";
import {useSelector} from "react-redux";
import moment from "moment";

export const ClientEnrollment = ({data}) =>{
    const classes = serviceSingleStyles()
    const enrolments = useSelector(state=>state.client.clientEnrollment)
    console.log(enrolments,'enrolmentsData')
    const generalInfo = [
        {title: 'First Name', value: data?.firstName},
        {title: 'Middle Name', value: data?.middleName},
        {title: 'Last Name', value: data?.lastName},
        {title: 'Code', value: data?.code},
    ]

    const headerTitles = [
        {
            title: 'Primary',
            sortable: false
        },
        {
            title: 'Funding Source',
            sortable: true
        },
        {
            title: 'Client ID',
            sortable: false
        },
        {
            title: 'Start Date',
            sortable: true
        },
        {
            title: 'Terminated...',
            sortable: true
        },
        {
            title: 'Action',
            sortable: false,
        },
    ];


    let enrollmentsItem = (item, index) => {
        let startDate = moment(item?.startDate).format('DD/MM/YYYY')
        let terminationDate = moment(item?.terminationDate).format('DD/MM/YYYY')
        return (
            <TableBodyComponent key={index}>
                <TableCell><p style={{textOverflow: 'ellipsis', width: 100, overflow: 'hidden'}}>true</p></TableCell>
                <TableCell>  {item.funderId?.name}  </TableCell>
                <TableCell>  <p style={{textOverflow: 'ellipsis', width: 60, overflow: 'hidden'}}>{item?.clientId}</p>  </TableCell>
                <TableCell>  {startDate}  </TableCell>
                <TableCell>  {terminationDate}  </TableCell>
                <TableCell>
                    <>
                        <img src={Images.edit} alt="edit" style={{cursor: 'pointer'}} onClick={() => alert(item.id)}/>
                        <img src={Images.remove} alt="delete" style={{marginLeft: 16, cursor: 'pointer'}}
                             onClick={() => alert(index)}/>
                    </>
                </TableCell>
            </TableBodyComponent>
        )
    }

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
            <div style={{width:24}} />
            <div style={{marginTop: -32, width: '100%'}}>
                <Notes
                     data={enrolments}
                    items={enrollmentsItem} headerTitles={headerTitles} defaultStyle={true}/>
            </div>

        </div>
    )
}