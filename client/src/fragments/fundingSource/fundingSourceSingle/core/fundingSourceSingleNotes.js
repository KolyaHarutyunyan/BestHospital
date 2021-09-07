import React, {useEffect, useState} from "react";
import {DeleteElement, Notes, SimpleModal, TableBodyComponent} from "@eachbase/components";
import {Images} from "@eachbase/utils";
import {fundingSourceSingleStyles} from "./styles";
import {TableCell} from "@material-ui/core";
import moment from "moment";
import {FundingSourceNotesAdd} from "./modals";
import {fundingSourceActions, httpRequestsOnSuccessActions} from "@eachbase/store";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";


export const FundingSourceSingleNotes = ({data}) => {
    const params = useParams()
    const [toggleModal, setToggleModal] = useState(false)
    const [index, setIndex] = useState(null)
    const [delEdit, setDelEdit] = useState(null)
    const dispatch = useDispatch()


    const {httpOnSuccess, httpOnError, httpOnLoad} = useSelector((state) => ({
        httpOnSuccess: state.httpOnSuccess,
        httpOnError: state.httpOnError,
        httpOnLoad: state.httpOnLoad,
    }));


    const success = httpOnSuccess.length && httpOnSuccess[0].type === 'DELETE_FUNDING_SOURCE_NOTE'


    const classes = fundingSourceSingleStyles()
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


    useEffect(() => {
        if (success) {
            setToggleModal(!toggleModal)
            dispatch(httpRequestsOnSuccessActions.removeSuccess('DELETE_FUNDING_SOURCE_NOTE'))
        }

    }, [success])

    let notesItem = (item, index) => {
        return (
            <TableBodyComponent key={index}>
                <TableCell> {moment(item?.created).format('DD/MM/YYYY')}</TableCell>
                <TableCell><p
                    className={classes.tableTitle}>{item?.user?.firstName ? item.user.firstName : item?.user ? item.user : ''}</p>
                </TableCell>
                <TableCell><p className={classes.tableTitle}>{item?.text}</p></TableCell>
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
        dispatch(fundingSourceActions.deleteFoundingSourceNote(params.id, data[index].id))
    }


    return (
        <>
            <SimpleModal
                openDefault={toggleModal}
                handleOpenClose={() => setToggleModal(!toggleModal)}
                content={delEdit === 'del' ?
                    <DeleteElement
                        loader={httpOnLoad.length > 0}
                        handleDel={deleteNote}
                        info={index !== null ? data[index].name : ''}
                        text={'Delete Note'}
                        handleClose={() => setToggleModal(!toggleModal)}/> :
                    <FundingSourceNotesAdd
                        info={data[index]}
                        handleClose={() => setToggleModal(!toggleModal)}/>}
            />
            <Notes data={data} items={notesItem} headerTitles={headerTitles} defaultStyle={true}/>
        </>

    )
}