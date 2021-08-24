import React, {useState} from "react";
import { DeleteElement, Notes, SimpleModal, TableBodyComponent} from '@eachbase/components';
import {serviceSingleStyles} from './styles';
import { Images} from "@eachbase/utils";
import {TableCell} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {clientActions} from "@eachbase/store";

export const ClientAuthorization = ({ setContactId, handleOpenClose}) => {
    const classes = serviceSingleStyles()
    const clientsAuthorizations = useSelector(state => state.client.clientsAuthorizations)
    const dispatch = useDispatch()
    const [openClose, setOpenClose] = useState(false)
    const [index, setIndex] = useState(null)



    const headerTitles = [
        {
            title: 'Auth #',
            sortable: false
        },
        {
            title: 'Funding Source',
            sortable: true
        },
        {
            title: 'Start Date',
            sortable: false
        },
        {
            title: 'End Date',
            sortable: false
        },
        {
            title: 'Status',
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

    let deleteAuthorization = () => {
        dispatch(clientActions.deleteClientContact(clientsAuthorizations[index].id))
        setOpenClose(!openClose)
    }

    let clientAuthorizationItem = (item, index) => {
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
                        handleDel={deleteAuthorization}
                        text={'Delete Authorization'}
                        info={index !== null && clientsAuthorizations[index].firstName}
                        handleClose={openCloseModal}/>
                }
                openDefault={openClose}/>
            <div className={classes.clearBoth}/>
            <div className={classes.notesWrap}>
                <Notes
                    data={clientsAuthorizations}
                    items={clientAuthorizationItem}
                    headerTitles={headerTitles}
                    defaultStyle={true}/>
            </div>

        </div>
    )
}