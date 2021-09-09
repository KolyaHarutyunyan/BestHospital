import React, {useEffect, useState} from "react";
import {DeleteElement, NoItemText, Notes, SimpleModal, TableBodyComponent} from "@eachbase/components";
import {Images} from "@eachbase/utils";
import {TableCell} from "@material-ui/core";
import moment from "moment";
import {fundingSourceActions, httpRequestsOnSuccessActions} from "@eachbase/store";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {noteActions} from "@eachbase/store/notes";


export const ClientNotes = ({globalNotes, data}) => {
    const params = useParams()
    const [toggleModal, setToggleModal] = useState(false)
    const [index, setIndex] = useState(null)
    const [delEdit, setDelEdit] = useState(null)
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


    // const success = httpOnSuccess.length && httpOnSuccess[0].type === 'DELETE_FUNDING_SOURCE_NOTE'


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


    // useEffect(() => {
    //     if (success) {
    //         setToggleModal(!toggleModal)
    //         dispatch(httpRequestsOnSuccessActions.removeSuccess('DELETE_FUNDING_SOURCE_NOTE'))
    //     }
    //
    // }, [success])

    let notesItem = (item, index) => {
        return (
            <TableBodyComponent key={index} handleClick={()=> openNoteModal({
                created:item?.created,
                subject: item?.subject,
                id: item.id
            })}>
                <TableCell>{moment(item?.created).format('DD/MM/YYYY')}</TableCell>
                <TableCell>{`${item?.user?.firstName} ${item?.user?.lastName}`}</TableCell>
                <TableCell>{item?.subject}</TableCell>
                <TableCell>
                    <img src={Images.remove} alt="delete" style={{cursor: 'pointer'}} onClick={(e) => {
                        e.stopPropagation();
                        handleOpenCloseDel({id: item.id,deletedName: item.subject})
                    }} />
                </TableCell>
            </TableBodyComponent>
        )
    }

    const handleOpenCloseDel = (data)=>{
        setNoteModalData(data)
        setOpenDelModal(!openDelModal)
    }

    let deleteNote = () => {
        dispatch(fundingSourceActions.deleteFoundingSourceNote(params.id, data[index].id))
    }

    const openNoteModal = (data) =>{
        setNoteModalInfo({
            right: '1px',
            created: data?.created,
            subject: data?.subject,
            id: data?.id
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
        dispatch(noteActions.deleteGlobalNote(noteModalData.id, params.id, 'Client'))
        setOpenDelModal(false)
        closeNoteModal()
    }
    return (
        <>
            {/*<SimpleModal*/}
            {/*    openDefault={toggleModal}*/}
            {/*    handleOpenClose={() => setToggleModal(!toggleModal)}*/}
            {/*    content={delEdit === 'del' ?*/}
            {/*        <DeleteElement*/}
            {/*            loader={httpOnLoad.length > 0}*/}
            {/*            handleDel={deleteNote}*/}
            {/*            info={index !== null ? data[index].name : ''}*/}
            {/*            text={'Delete Note'}*/}
            {/*            handleClose={() => setToggleModal(!toggleModal)}/> :*/}
            {/*        <FundingSourceNotesAdd*/}
            {/*            info={data[index]}*/}
            {/*            handleClose={() => setToggleModal(!toggleModal)}/>}*/}
            {/*/>*/}
            {/*<Notes */}
            {/*    data={data} */}
            {/*    items={notesItem} */}
            {/*    headerTitles={headerTitles} */}
            {/*    defaultStyle={true}*/}
            {/*/>*/}
            {
                data ? <Notes
                        model={'Client'}
                        closeModal={closeNoteModal}
                        noteModalInfo={noteModalInfo}
                        showModal={true}
                        pagination={true}
                        data={data}
                        items={notesItem}
                        headerTitles={headerTitles}/> :
                    <NoItemText text='No Notes Yet' />
            }
            <SimpleModal
                openDefault={openDelModal}
                handleOpenClose={handleOpenCloseDel}
                content={<DeleteElement text='some information' info={noteModalData?.deletedName} handleDel={handleDeleteNote} handleClose={handleOpenCloseDel}/>}
            />
        </>

    )
}