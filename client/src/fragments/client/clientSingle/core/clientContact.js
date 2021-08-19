import {Card, DeleteElement, Notes, SimpleModal, TableBodyComponent} from '@eachbase/components';
import {serviceSingleStyles} from './styles';
import {Colors, Images} from "@eachbase/utils";
import {TableCell} from "@material-ui/core";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clientActions} from "@eachbase/store";

export const ClientContact = ({data, setContactId, handleOpenClose}) => {
    const classes = serviceSingleStyles()
    const clientContacts = useSelector(state => state.client.clientContacts)
    const [deleteContacts, setDeleteContacts] = useState()
    const dispatch = useDispatch()
    const [openClose, setOpenClose] = useState(false)
    const [index, setIndex] = useState(null)



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


    let openCloseModal = ()=>{
        setOpenClose(!openClose)
    }

    let deleteContact = ()=>{
        dispatch(clientActions.deleteClientContact(clientContacts[index].id))
        setOpenClose(!openClose)
    }

    let clientContactItem = (item, index) => {
        return (
            <TableBodyComponent key={index}>
                <TableCell><p style={{textOverflow: 'ellipsis', width: 100, overflow: 'hidden'}}>{item.firstName}</p>
                </TableCell>
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
                             onClick={()=>{
                                 setOpenClose(!openClose)
                                 setIndex(index)}

                             }/>
                    </>
                </TableCell>
            </TableBodyComponent>
        )
    }

    return (
        <div className={classes.staffGeneralWrapper}>
            <SimpleModal
                content={
                    <DeleteElement
                        handleDel={deleteContact}
                        className={classes}
                        text={'Delete Client'}
                        info={index!==null && clientContacts[index].firstName}
                        handleClose={openCloseModal}/>
                }
                openDefault={openClose} />
            <Card
                width='32.5%'
                cardInfo={generalInfo}
                showHeader={true}
                title='General Info'
                color={Colors.BackgroundBlue}
                icon={Images.generalInfoIcon}
            />
            <div style={{width: 24}}/>
            <div style={{marginTop: -32, width: '100%'}}>
                <Notes
                    data={clientContacts}
                    items={clientContactItem} headerTitles={headerTitles} defaultStyle={true}/>
            </div>

        </div>
    )
}