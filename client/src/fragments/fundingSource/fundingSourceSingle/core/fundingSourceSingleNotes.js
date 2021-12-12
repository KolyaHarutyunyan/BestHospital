import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import moment from "moment";
import {DeleteElement, Notes, SimpleModal, TableBodyComponent} from "@eachbase/components";
import {FindLoad, FindSuccess, Images} from "@eachbase/utils";
import {TableCell} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {noteActions} from "@eachbase/store/notes";

export const FundingSourceSingleNotes = ({data}) => {
    const params = useParams()
    const dispatch = useDispatch()
    const [noteModalData, setNoteModalData] = useState({})
    const [openDelModal, setOpenDelModal] = useState(false)
    const deleteSuccess = FindSuccess('DELETE_GLOBAL_NOTE')
    const loader = FindLoad('DELETE_GLOBAL_NOTE')
    const [noteModalInfo, setNoteModalInfo] = useState({
        right: '-1000px',
        created: '',
        subject: '',
    })

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
            <TableBodyComponent key={index} handleOpenInfo={() => openNoteModal({
                created: item?.created,
                subject: item?.subject,
                id: item?.id,
                text: item?.text,
                creatorName: item && item.user && `${item.user.firstName} ${item.user.lastName}`,
            })}>
                <TableCell>{moment(item?.created).format('DD/MM/YYYY')}</TableCell>
                <TableCell>{`${item?.user?.firstName} ${item?.user?.lastName}`}</TableCell>
                <TableCell>{item?.subject}</TableCell>
                <TableCell>
                    <img src={Images.remove} alt="delete" style={{cursor: 'pointer'}} onClick={(e) => {
                        e.stopPropagation();
                        handleOpenCloseDel({id: item.id, deletedName: item.subject, text: item.text})
                    }}/>
                </TableCell>
            </TableBodyComponent>
        )
    }

    const handleOpenCloseDel = (data) => {
        setNoteModalData(data)
        setOpenDelModal(!openDelModal)
    }

    const openNoteModal = (data) => {
        setNoteModalInfo({
            right: '38px',
            created: data?.created,
            subject: data?.subject,
            id: data?.id,
            text: data?.text,
            creatorName: data?.creatorName
        })
    }

    const closeNoteModal = () => {
        setNoteModalInfo({
            right: '-1000px',
            created: '',
            subject: '',
            id: '',
            creatorName: '',
        })
    }

    const handleDeleteNote = () => {
        dispatch(noteActions.deleteGlobalNote(noteModalData.id, params.id, 'Funder'))
    }

    useEffect(() => {
        if (deleteSuccess) {
            setOpenDelModal(false)
            closeNoteModal()
        }
    }, [deleteSuccess.length])

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
                content={
                    <DeleteElement
                        loader={!!loader.length}
                        text='delete Note'
                        info={noteModalData?.deletedName}
                        handleDel={handleDeleteNote}
                        handleClose={handleOpenCloseDel}
                    />
                }
            />
        </>

    )
}