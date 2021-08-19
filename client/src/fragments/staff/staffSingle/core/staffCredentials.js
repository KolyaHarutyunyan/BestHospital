import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {TableCell} from "@material-ui/core";
import {Notes, TableBodyComponent} from "@eachbase/components";
import {Images} from "@eachbase/utils";
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


export const StaffCredentials = ({credentialData,openModal}) => {

    // const removeCredentialData = {
    //     id: params.id
    // }

    const editCredential = (modalType) => {
        openModal(modalType)
    }
    console.log(credentialData,'cred Data');

    // const removeCredential = () => {
    //     dispatch(adminActions.deleteCredentialById(removeCredentialData))
    // }


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
            name: credentialData.credentialId?.name,
            type: credentialData.credentialId?.type,
            receivedDate: moment(credentialData.expirationDate).format('L'),
            expirationDate: moment(credentialData.expirationDate).format('L'),
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