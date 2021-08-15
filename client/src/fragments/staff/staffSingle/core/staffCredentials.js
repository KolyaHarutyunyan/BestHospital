import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {adminActions} from "@eachbase/store";
import {useDispatch, useSelector} from "react-redux";
import {Notes, TableBodyComponent} from "@eachbase/components";
import {TableCell} from "@material-ui/core";
import {Images} from "@eachbase/utils";

const AddCredential = {
    staffId: '610bcdd691e2130e1a12371b',
    credentialId: '610cf947776f5210843ccb54',
    expirationDate: '06/11/2021'
}

const editCredentialData = {
    credentialId: "610cf947776f5210843ccb54",
    expirationDate: "05/05/2019"
}

const types = [
    {name: 'type'},
    {name: 'type 1'},
    {name: 'type 2'},
    {name: 'type 3'},
]


export const StaffCredentials = ({openModal}) => {

    // const dispatch = useDispatch()

    // const params = useParams();

    // const removeCredentialData = {
    //     id: params.id
    // }

    const editCredential = (modalType) => {
        openModal(modalType)
    }

    // useEffect(() => {
    //     dispatch(adminActions.getCredentialById(params.id))
    // }, [])

    // const addCredential = () => {
    //     dispatch(adminActions.createCredential(AddCredential))
    // }

    // const editCredential = () => {
    //     dispatch(adminActions.editCredentialById(editCredentialData, params.id))
    // };
    // const removeCredential = () => {
    //     dispatch(adminActions.deleteCredentialById(removeCredentialData))
    // }

    // const credentialData = useSelector(state => state.admins.credentialById)

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

    const data = [
        {
            name: 'HB',
            type: 'License',
            receivedDate: '06/20/2020',
            expirationDate: '06/20/2021',
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
                            alert('remove Credential')
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
        </div>
    )
}