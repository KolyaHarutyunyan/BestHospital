import React, {useState} from "react";
import {TableCell} from "@material-ui/core";
import {DeleteElement, Notes, SimpleModal, TableBodyComponent} from "@eachbase/components";
import {Images} from "@eachbase/utils";
import moment from 'moment';
import {useDispatch} from "react-redux";
import {adminActions} from "@eachbase/store";

export const StaffCredentials = ({credentialData, openModal}) => {
    const [open, setOpen] = useState(false)
    const [deletedId, setDeletedId] = useState('')
    const dispatch = useDispatch()

    const handleClose = () =>{
        setOpen(false)
    }

    const editCredential = (modalType,globalCredentialInfo) => {
        openModal(modalType,globalCredentialInfo)
    }

    const removeCredential = () => {
        dispatch(adminActions.deleteCredentialById(deletedId))
        handleClose()
    }

    const convertType = (index) =>{
        if (index === 0) {
            return 'Degree'
        } else if (index === 1) {
            return 'Clearance'
        } else if (index === 2) {
            return 'licence'
        }
    }


    const notesItem = (item, index) => {
        return (
            <TableBodyComponent key={index} handleClick={() => editCredential('credentialPreview')}>
                <TableCell>{item?.credentialId?.name}</TableCell>
                <TableCell>{convertType(item?.credentialId?.type)}</TableCell>
                <TableCell>{item?.receivedDate}</TableCell>
                <TableCell>{item.expirationDate && moment(item.expirationDate).format('L')}</TableCell>
                <TableCell>{
                    <>
                        <img
                            src={Images.edit}
                            style={{cursor: 'pointer'}}
                            onClick={(e) => {
                                e.stopPropagation();
                                editCredential('editCredential', {
                                    id: item._id,
                                    credId: item.credentialId?._id,
                                    type:item.credentialId?.name,
                                    expirationDate: item.expirationDate

                                })
                            }
                            } alt="edit"/>
                        <img
                            src={Images.remove}
                            alt="delete"
                            style={{cursor: 'pointer', marginLeft: 16}}
                            onClick={(e) => {
                                e.stopPropagation();
                                setDeletedId(item._id)
                                setOpen(true);
                            }
                            }
                        />
                    </>
                }</TableCell>
            </TableBodyComponent>
        )
    }

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
                credentialData.length && <Notes defaultStyle={true} data={credentialData} pagination={true} items={notesItem} headerTitles={headerTitles}/>
            }
            <SimpleModal
                openDefault={open}
                handleOpenClose={handleClose}
                content={<DeleteElement text='Delete Credential' info='info'  handleClose={handleClose} handleDel={removeCredential} />}
            />
        </div>
    )
}