import React, {useState} from "react";
import {Card, DeleteElement, NoItemText, Notes, SimpleModal, TableBodyComponent} from '@eachbase/components';
import {serviceSingleStyles} from './styles';
import {Colors, Images} from "@eachbase/utils";
import {TableCell} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {clientActions, httpRequestsOnErrorsActions} from "@eachbase/store";
import {useParams} from "react-router-dom";

export const ClientContact = ({data, setContactId, handleOpenClose, info}) => {
    const classes = serviceSingleStyles()
    const dispatch = useDispatch()
    const [openClose, setOpenClose] = useState(false)
    const [index, setIndex] = useState(null)
    const params = useParams()

    const { httpOnSuccess, httpOnError,httpOnLoad } = useSelector((state) => ({
        httpOnSuccess: state.httpOnSuccess,
        httpOnError: state.httpOnError,
        httpOnLoad: state.httpOnLoad,
    }));

    // Client contact with this id was not found

    const errorText = httpOnError.length && httpOnError[0].error



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
        dispatch(clientActions.deleteClientContact(info[index].id, params.id))
        dispatch(httpRequestsOnErrorsActions.removeError('GET_CLIENT_CONTACTS'))
        setIndex(null)
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
                        loader={httpOnLoad.length > 0}
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
                {errorText !== 'Client contact with this id was not found' ?  <Notes
                    data={info}
                    items={clientContactItem}
                    headerTitles={headerTitles}
                    defaultStyle={true}/> : <NoItemText text={'No Contacts Yet'} />}
            </div>

        </div>
    )
}