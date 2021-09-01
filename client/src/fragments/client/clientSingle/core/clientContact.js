import React, {useState} from "react";
import {Card, DeleteElement, Notes, SimpleModal, TableBodyComponent} from '@eachbase/components';
import {serviceSingleStyles} from './styles';
import {Colors, Images} from "@eachbase/utils";
import {TableCell} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {clientActions} from "@eachbase/store";

export const ClientContact = ({data, setContactId, handleOpenClose, info}) => {
    const classes = serviceSingleStyles()
    // const clientContacts = useSelector(state => state.client.clientContacts)
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


    let openCloseModal = () => {
        setOpenClose(!openClose)
    }

    let deleteContact = () => {
        dispatch(clientActions.deleteClientContact(info[index].id))
        setOpenClose(!openClose)
    }

    let clientContactItem = (item, index) => {
        return (
            <TableBodyComponent key={index}>
                <TableCell><p className={classes.tableName}>{item.firstName}</p></TableCell>
                <TableCell>  {item.lastName}  </TableCell>
                <TableCell>  {item.relationship}  </TableCell>
                <TableCell>  {item.phoneNumber}  </TableCell>
                <TableCell>  {item.phoneNumber}  </TableCell>
                <TableCell>
                    <>
                        <img src={Images.edit} alt="edit" className={classes.iconStyle} onClick={() => {
                            setContactId(index)
                            handleOpenClose()
                        }}/>
                        <img src={Images.remove} alt="delete" className={classes.iconDeleteStyle}
                             onClick={() => {
                                 setOpenClose(!openClose)
                                 setIndex(index)
                             }}/>
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
                        text={'Delete Contact'}
                        info={index !== null && info[index].firstName}
                        handleClose={openCloseModal}/>
                }
                openDefault={openClose}/>
            <Card
                width='32.5%'
                cardInfo={generalInfo}
                showHeader={true}
                title='General Info'
                color={Colors.BackgroundBlue}
                icon={Images.generalInfoIcon}
            />
            <div className={classes.clearBoth}/>
            <div className={classes.notesWrap}>
                <Notes
                    data={info}
                    items={clientContactItem}
                    headerTitles={headerTitles}
                    defaultStyle={true}/>
            </div>

        </div>
    )
}