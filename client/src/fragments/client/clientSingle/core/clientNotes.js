import React, {useState} from "react";
import {DeleteElement, Notes, SimpleModal, TableBodyComponent} from "@eachbase/components";
import {Images} from "@eachbase/utils";
import {serviceSingleStyles} from "./styles";
import {TableCell} from "@material-ui/core";
import moment from "moment"
import {clientActions, fundingSourceActions} from "@eachbase/store";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {FundingSourceNotesAdd} from "../../../fundingSource/fundingSourceSingle/core/modals";
import {AddNotes} from "../../clientModals";
// import {AddNotes} from "../../clientModals";


export const ClientNotes = ({ info}) => {
    const params = useParams()
    const [toggleModal, setToggleModal] = useState(false)
    const [index, setIndex] = useState(null)
    const [delEdit, setDelEdit] = useState(null)
    const dispatch = useDispatch()
    const classes = serviceSingleStyles()

    const headerTitles = [
        {
            title: 'Date',
            sortable: true
        },
        {
            title: 'Creator Name',
            sortable: true
        },
        {
            title: 'Subject',
            sortable: false
        },
        {
            title: 'Action',
            sortable: false
        },
    ];
    let notesItem = (item, index) => {
        return (
            <TableBodyComponent key={index} >
                <TableCell> {moment(item?.created).format('DD/MM/YYYY')}</TableCell>
                <TableCell><p className={classes.tableTitle}>{item?.user?.firstName ? item.user.firstName :  item?.user ? item.user : ''}</p>  </TableCell>
                <TableCell>  <p className={classes.tableTitle}>{item?.text}</p>  </TableCell>
                <TableCell>
                    <>
                        <img src={Images.edit} alt="edit" className={classes.iconCursor}
                             onClick={(e) => {
                                 e.stopPropagation()
                                 setIndex(index)
                                 setDelEdit('edit')
                                 setToggleModal(!toggleModal)
                             }}/>
                        <img src={Images.remove} alt="delete" className={classes.iconCursordelete}
                             onClick={(e) => {
                                 e.stopPropagation()
                                 setIndex(index)
                                 setDelEdit('del')
                                 setToggleModal(!toggleModal)
                             }}/>
                    </>
                </TableCell>
            </TableBodyComponent>
        )
    }

    let deleteNote = () => {
        dispatch(clientActions.deleteClientNote(params.id, info[index].id))
        setToggleModal(false)
        setIndex(null)
    }


    return (
        <>
            <SimpleModal
                openDefault={toggleModal}
                handleOpenClose={() => setToggleModal(!toggleModal)}
                content={delEdit === 'del' ?
                    <DeleteElement
                        handleDel={deleteNote}
                        info={index !== null ? info[index].name : ''}
                        text={'Delete Note'}
                        handleClose={() => setToggleModal(!toggleModal)}/> :
                    <AddNotes
                         info={info[index]}
                        handleClose={() => setToggleModal(!toggleModal)} />}
            />
            <Notes data={info} items={notesItem} headerTitles={headerTitles} defaultStyle={true}/>
        </>

    )
}