import {Card, Notes, TableBodyComponent} from '@eachbase/components';
import { serviceSingleStyles } from './styles';
import { Colors, Images } from "@eachbase/utils";
import {TableCell} from "@material-ui/core";
import React from "react";
import {useSelector} from "react-redux";

export const ClientContact = ({data,setContactId,handleOpenClose}) =>{
    const classes = serviceSingleStyles()

    const clients = useSelector(state=>state.client.clientContacts)
    console.log(clients,'clieeeeeeentssssasasasa')

    const generalInfo = [
        {title: 'First Name', value: data?.firstName},
        {title: 'Middle Name', value: data?.middleName},
        {title: 'Last Name', value: data?.lastName},
        {title: 'Code', value: data?.code},
    ]

    const headerTitles = [
        {
            title: 'First Na...',
            sortable: true
        },
        {
            title: 'Last Name',
            sortable: true
        },
        {
            title: 'Relationship',
            sortable: false
        },
        {
            title: 'Address',
            sortable: true
        },
        {
            title: 'Phone Num...',
            sortable: false
        },
        {
            title: 'Action',
            sortable: false,
        },
    ];


    let clientContactItem = (item, index) => {
        return (
            <TableBodyComponent key={index}>
                <TableCell><p style={{textOverflow: 'ellipsis', width: 100, overflow: 'hidden'}}>{item.firstName}</p></TableCell>
                <TableCell>  {item.lastName}  </TableCell>
                <TableCell>  {item.relationship}  </TableCell>
                <TableCell>  {item.phoneNumber}  </TableCell>
                <TableCell>  {item.phoneNumber}  </TableCell>
                <TableCell>
                    <>
                        <img src={Images.edit} alt="edit" style={{cursor: 'pointer'}} onClick={() => {
                            setContactId(index)
                            handleOpenClose()
                        }}/>
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
                     data={clients}
                    items={clientContactItem} headerTitles={headerTitles} defaultStyle={true}/>
            </div>

        </div>
    )
}