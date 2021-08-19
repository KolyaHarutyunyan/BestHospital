import React, {useState} from "react";
import {TableCell} from "@material-ui/core";
import {DeleteElement, Notes, SimpleModal, TableBodyComponent} from "@eachbase/components";
import {Images, Backgrounds} from "@eachbase/utils";
import moment from 'moment';

const AddCredential = {
    staffId: '610bcdd691e2130e1a12371b',
    credentialId: '610cf947776f5210843ccb54',
    expirationDate: '06/11/2021'
}

const editCredentialData = {
    credentialId: "610cf947776f5210843ccb54",
    expirationDate: "05/08/2019"
}

const types = [
    {name: 'type'},
    {name: 'type 1'},
    {name: 'type 2'},
    {name: 'type 3'},
]

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
    console.log(credentialData, 'cred Data');
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

    console.log(moment(undefined).format('L'), 'aaaa');

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
            <Notes defaultStyle={true} data={data} pagination={true} items={notesItem} headerTitles={headerTitles}/>
            <SimpleModal
                openDefault={open}
                handleOpenClose={handleClose}
                content={<DeleteElement handleClose={handleClose} handleDel={removeCredential} />}
            />
        </div>
    )
}