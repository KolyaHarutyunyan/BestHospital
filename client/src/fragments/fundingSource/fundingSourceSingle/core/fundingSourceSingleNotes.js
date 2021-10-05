import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import moment from "moment";
import {DeleteElement, Notes, SimpleModal, TableBodyComponent} from "@eachbase/components";
import {Images} from "@eachbase/utils";
import {TableCell} from "@material-ui/core";
import {httpRequestsOnSuccessActions} from "@eachbase/store";
import {useDispatch, useSelector} from "react-redux";
import {noteActions} from "@eachbase/store/notes";


export const FundingSourceSingleNotes = ({ data}) => {
    const params = useParams()
    const [toggleModal, setToggleModal] = useState(false)
    const dispatch = useDispatch()
    const [noteModalInfo, setNoteModalInfo] = useState({
        right: '-1000px',
        created: '',
        subject: '',
    })
    const [noteModalData, setNoteModalData] = useState({})
    const [openDelModal,setOpenDelModal] = useState(false)
    const {httpOnSuccess, httpOnError, httpOnLoad} = useSelector((state) => ({
        httpOnSuccess: state.httpOnSuccess,
        httpOnError: state.httpOnError,
        httpOnLoad: state.httpOnLoad,
    }));
    const success = httpOnSuccess.length && httpOnSuccess[0].type === 'DELETE_FUNDING_SOURCE_NOTE'

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
            <TableBodyComponent key={index} handleOpenInfo={()=> openNoteModal({
                created:item?.created,
                subject: item?.subject,
                id: item?.id,
                text: item?.text
            })}>
                <TableCell>{moment(item?.created).format('DD/MM/YYYY')}</TableCell>
                <TableCell>{`${item?.user?.firstName} ${item?.user?.lastName}`}</TableCell>
                <TableCell>{item?.subject}</TableCell>
                <TableCell>
                    <img src={Images.remove} alt="delete" style={{cursor: 'pointer'}} onClick={(e) => {
                        e.stopPropagation();
                        handleOpenCloseDel({id: item.id,deletedName: item.subject,text: item.text})
                    }} />
                </TableCell>
            </TableBodyComponent>
        )
    }

    const handleOpenCloseDel = (data)=>{
        setNoteModalData(data)
        setOpenDelModal(!openDelModal)
    }

    const openNoteModal = (data) =>{
        setNoteModalInfo({
            right: '1px',
            created: data?.created,
            subject: data?.subject,
            id: data?.id,
            text: data?.text
        })
    }

    const closeNoteModal = () =>{
        setNoteModalInfo({
            right: '-1000px',
            created: '',
            subject: '',
            id: ''
        })
    }
    const handleDeleteNote = () =>{
        dispatch(noteActions.deleteGlobalNote(noteModalData.id, params.id, 'Funder'))
        setOpenDelModal(false)
        closeNoteModal()
    }
    return (
        <>
            <Notes
                    restHeight='360px'
                    model={'Funder'}
                    closeModal={closeNoteModal}
                    noteModalInfo={noteModalInfo}
                    showModal={true}
                    pagination={true}
                    data={data}
                    items={notesItem}
                    headerTitles={headerTitles}/>
            <SimpleModal
                openDefault={openDelModal}
                handleOpenClose={handleOpenCloseDel}
                content={<DeleteElement text='delete Note' info={noteModalData?.deletedName} handleDel={handleDeleteNote} handleClose={handleOpenCloseDel}/>}
            />
        </>

    )
}