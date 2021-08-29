import React, {useState} from "react";
import {Card, DeleteElement, Notes, SimpleModal, TableBodyComponent} from '@eachbase/components';
import {serviceSingleStyles} from './styles';
import {Colors, Images} from "@eachbase/utils";
import {TableCell} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {clientActions} from "@eachbase/store";

export const ClientAuthorizationItem = ({data, setContactId, handleOpenClose}) => {
    const classes = serviceSingleStyles()
    const clientContacts = useSelector(state => state.client.clientContacts)
    const dispatch = useDispatch()
    const [openClose, setOpenClose] = useState(false)
    const [index, setIndex] = useState(null)



    const generalInfo = [
        {title: 'Funding Source', value: data?.funderId?.name},
        {title: 'Start Date', value: data?.startDate},
        {title: 'End Date', value: data?.endDate},
        {title: 'Status', value: data?.status},
        {title: 'Service Location:', value: data?.address?.street},
    ]

    const headerTitles = [
        {
            title: 'Service Code',
            sortable: false
        },
        {
            title: 'Modifiers',
            sortable: false
        },
        {
            title: 'Total...',
            sortable: false
        },
        {
            title: 'Completed...',
            sortable: false
        },
        {
            title: 'Available...',
            sortable: false
        },
        {
            title: 'Percent Utiliza...',
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
        dispatch(clientActions.deleteClientContact(clientContacts[index].id))
        setOpenClose(!openClose)
    }

    let clientAuthsItem = (item, index) => {
        return (
            <TableBodyComponent key={index}>
                <TableCell><p className={classes.tableName}>{item.firstName}</p></TableCell>
                <TableCell>  {item.lastName}  </TableCell>
                <TableCell>  {item.relationship}  </TableCell>
                <TableCell>  {item.phoneNumber}  </TableCell>
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
                        info={index !== null && clientContacts[index].firstName}
                        handleClose={openCloseModal}/>
                }
                openDefault={openClose}/>
            <Card
                width='32.5%'
                cardInfo={generalInfo}
                showHeader={true}
                title={`Auth # ${data.authId}`}
                color={'#FE7070'}
                icon={Images.authIcon}
            />
            <div className={classes.clearBoth}/>
            <div className={classes.notesWrap}>
                <Notes
                    data={clientContacts}
                    items={clientAuthsItem}
                    headerTitles={headerTitles}
                    defaultStyle={true}/>
            </div>

        </div>
    )
}