import React, {useState} from "react";
import {TableCell} from "@material-ui/core";
import {DeleteElement, Notes, SimpleModal, TableBodyComponent} from "@eachbase/components";
import {Images} from "@eachbase/utils";
import moment from 'moment';

export const StaffCredentials = ({credentialData, openModal}) => {
    const [open, setOpen] = useState(false)

    // const removeCredentialData = {
    //     id: params.id
    // }

    const handleClose = () =>{
        setOpen(false)
    }

    const editCredential = (modalType) => {
        openModal(modalType)
    }
    // const removeCredential = () => {
    //     dispatch(adminActions.deleteCredentialById(removeCredentialData))
    // }

    const removeCredential = () => {
        handleClose()
        alert('remove Credential');
    }


    const notesItem = (item, index) => {
        return (
            <TableBodyComponent key={index} handleClick={() => editCredential('credentialPreview')}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.receivedDate}</TableCell>
                <TableCell>{item.expirationDate}</TableCell>
                <TableCell>{item.action}</TableCell>
            </TableBodyComponent>
        )
    }

    const receivedData = credentialData.expirationDate
    const expirationDate = credentialData.expirationDate

    const data = [
        {
            name: credentialData.credentialId?.name,
            type: credentialData.credentialId?.type,
            receivedDate: receivedData && moment(credentialData.expirationDate).format('L'),
            expirationDate: expirationDate && moment(credentialData.expirationDate).format('L'),
            action:
                <>
                    <img
                        src={Images.edit}
                        style={{cursor: 'pointer'}}
                        onClick={(e) => {
                            e.stopPropagation();
                            editCredential('editCredential')
                        }
                        } alt="edit"/>
                    <img
                        src={Images.remove}
                        alt="delete"
                        style={{cursor: 'pointer', marginLeft: 16}}
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpen(true)
                        }
                        }
                    />
                </>,
        }
    ]

    const headerTitles = [
        {
            title: 'Name',
            sortable: true
        },
        {
            title: 'Type',
            sortable: true
        },
        {
            title: 'Received Date',
            sortable: true
        },
        {
            title: 'Expiration Date',
            sortable: false
        },
        {
            title: 'Action',
            sortable: false
        },
    ];
    return (
        <div>
            {
                credentialData && <Notes defaultStyle={true} data={credentialData && data} pagination={true} items={notesItem} headerTitles={headerTitles}/>
            }
            <SimpleModal
                openDefault={open}
                handleOpenClose={handleClose}
                content={<DeleteElement text='Delete Credential' info={credentialData && credentialData.credentialId.name} handleClose={handleClose} handleDel={removeCredential} />}
            />
        </div>
    )
}