import React, {useState} from "react";
import {DeleteElement, Notes, SimpleModal, TableBodyComponent} from "@eachbase/components";
import {Images} from "@eachbase/utils";
import {fundingSourceSingleStyles} from "./styles";
import {TableCell} from "@material-ui/core";
import moment from "moment";
import {FundingSourceNotesAdd} from "./modals";
import { fundingSourceActions} from "@eachbase/store";
import {useDispatch} from "react-redux";


export const FundingSourceSingleNotes = ({data}) => {
    console.log(data,'dataaaassssss')
    const [toggleModal, setToggleModal] = useState(false)
    const [index, setIndex] = useState(null)
    const [delEdit, setDelEdit] = useState(null)
    const dispatch = useDispatch()
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

    let notesItem = (item, index) => {
        return (
            <TableBodyComponent key={index} >
                <TableCell> {moment(item?.created).format('DD/MM/YYYY')}</TableCell>
                <TableCell><p className={classes.tableTitle}>{item?.user && item.user.firstName }</p>  </TableCell>
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
        dispatch(fundingSourceActions.deleteFoundingSourceNote(data[index].id))
        setToggleModal(false)
    }


    return (
        <>
            <SimpleModal
                openDefault={toggleModal}
                handleOpenClose={() => setToggleModal(!toggleModal)}
                content={delEdit === 'del' ?
                    <DeleteElement
                        handleDel={deleteNote}
                        info={index !== null ? data[index].name : ''}
                        text={'Delete Note'}
                        handleClose={() => setToggleModal(!toggleModal)}/> :
                    <FundingSourceNotesAdd
                        info={data[index]}
                        handleClose={() => setToggleModal(!toggleModal)} />}
            />
            <Notes data={data} items={notesItem} headerTitles={headerTitles} defaultStyle={true}/>
        </>

    )
}