import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Paper, Table, TableCell, TableContainer} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {
    TableHeadComponent,
    SearchAndFilter,
    PaginationItem,
    NoItemText,
    CloseButton,
    SimpleModal,
    AddNotes, DeleteElement, Toast
} from "@eachbase/components";
import {Images, useGlobalStyles} from "@eachbase/utils";
import moment from "moment";
import {noteActions} from "../../store/notes";
import {useParams} from "react-router-dom";
import {httpRequestsOnErrorsActions, httpRequestsOnSuccessActions} from "../../store";
import {httpRequestsOnLoadActions} from "../../store/http_requests_on_load";

export const Notes = ({
                          closeModal,
                          noteModalInfo,
                          showModal,
                          data,
                          headerTitles,
                          pagination,
                          defaultStyle,
                          items,
                          noItemsYet,
                          model,
                      }) => {

    const officesStyle = makeStyles(({}) => ({
        thWidth: {
            '&:last-child': {
                width: '7%'
            },
            '&:nth-last-child(2)': {
                width: '58%'
            },
        },
    }));

    const dispatch = useDispatch()
    const params = useParams()
    const classes = officesStyle()

    const globalStyle = useGlobalStyles();

    const [page, setPage] = useState(1);
    const {officesList} = useSelector((state) => ({
        officesList: state.offices.officesList,
        httpOnLoad: state.httpOnLoad,
    }));

    const changePage = (number) => {
        setPage(number);
    };

    const [open, setOpen] = useState(false);
    const [openDelModal, setOpenDelModal] = useState(false)
    const [noteModalInfoEdit, setNoteModalInfoEdit] = useState({})
    const [deletedData, setDeletedData] = useState('')
    const handleOpenClose = (data) => {
        setNoteModalInfoEdit(data)
        setOpen(!open)
    }
    const handleOpenCloseDel = (data) => {
        setDeletedData(data)
        setOpenDelModal(!openDelModal)
    }

    const handleDelete = () => {
        dispatch(noteActions.deleteGlobalNote(deletedData.id, params.id, model))
        closeModal()
    }

    const {httpOnLoad, httpOnSuccess, httpOnError} = useSelector((state) => ({
        httpOnSuccess: state.httpOnSuccess,
        httpOnError: state.httpOnError,
        httpOnLoad: state.httpOnLoad,
    }));

    const success =
        httpOnSuccess.length && httpOnSuccess[0].type === 'CREATE_GLOBAL_NOTE' ? true :
            httpOnSuccess.length && httpOnSuccess[0].type === 'EDIT_GLOBAL_NOTE' ? true :
                httpOnSuccess.length && httpOnSuccess[0].type === 'DELETE_GLOBAL_NOTE'
    const errorText =
        httpOnError.length && httpOnError[0].type === 'CREATE_GLOBAL_NOTE' ? true :
            httpOnError.length && httpOnError[0].type === 'EDIT_GLOBAL_NOTE' ? true :
                httpOnError.length && httpOnError[0].type === 'DELETE_GLOBAL_NOTE'

    const loader = httpOnLoad.length &&
    httpOnLoad[0] === 'CREATE_GLOBAL_NOTE' ? true :
        httpOnLoad[0] === 'EDIT_GLOBAL_NOTE' ? true :
            httpOnLoad[0] === 'DELETE_GLOBAL_NOTE'

    useEffect(() => {
        if (success) {
            dispatch(httpRequestsOnSuccessActions.removeSuccess(httpOnSuccess.length && httpOnSuccess[0].type))
            dispatch(httpRequestsOnLoadActions.removeLoading(httpOnLoad.length && httpOnLoad[0].type))
            setOpenDelModal(false)
        }
        if (errorText) {
            dispatch(httpRequestsOnErrorsActions.removeError(httpOnError.length && httpOnError[0].type))
        }
    }, [success]);

    console.log(loader, errorText, success);

    let errorMessage = success ? 'Success' : 'Something went wrong'

    return (
        <div className={globalStyle.tableWrapper}>
            <TableContainer className={globalStyle.tableContainer} component={Paper}>
                <Table
                    className={globalStyle.table}
                    size="small"
                    aria-label="a dense table"
                >
                    <TableHeadComponent >
                        {
                            headerTitles && headerTitles.map((headerItem, index) => {
                                return (
                                    <TableCell key={index} className={defaultStyle ? null : classes.thWidth}>
                                        <SearchAndFilter title={headerItem.title} custom={headerItem.sortable}/>
                                    </TableCell>
                                )
                            })
                        }
                    </TableHeadComponent>
                    {
                        data ? data.map((item, index) => {

                            return (
                                <>
                                    {items(item, index)}
                                </>
                            )
                        }) : null
                    }
                </Table>

                {!noItemsYet && !data && <NoItemText text='No Items Yet'/>}

                {pagination && <PaginationItem
                    text={`Showing 30 to 30 of 200 entries`}
                    handleReturn={(number) => changePage(number)}
                    page={page}
                    count={officesList.length}
                />}
                {
                    showModal &&
                    <>
                        <div className={globalStyle.previewModal} style={{right: noteModalInfo.right}}>
                            <h1>{noteModalInfo.subject}</h1>
                            <span>By John Smith</span>
                            <div className={globalStyle.dateContainer}>
                                <p>{moment(noteModalInfo?.created).format('DD/MM/YYYY')}</p>
                                <div>
                                    <div className={globalStyle.icons}>
                                        <img src={Images.edit} onClick={() => handleOpenClose({
                                            modalType: 'editNote',
                                            text: 'text text',
                                            subject: noteModalInfo.subject,
                                            id: noteModalInfo.id
                                        })} alt="edit"/>
                                        <img src={Images.remove} alt="delete" onClick={() => handleOpenCloseDel({
                                            id: noteModalInfo.id,
                                            deletedName: noteModalInfo.subject
                                        })}/>
                                    </div>
                                </div>
                            </div>
                            <p>Lorem Ipsum is simply dummy text
                                of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's
                                standard dummy text ever since the 1500s,
                                when an unknown printer took a galley of
                                type and scrambled it to make a type specimen
                                book. It has survived not only five centuries,
                                but also the leap into electronic typesetting.</p>
                            <div className={globalStyle.positionedButton}>
                                <CloseButton handleCLic={closeModal}/>
                            </div>
                        </div>
                        <SimpleModal
                            openDefault={open}
                            handleOpenClose={handleOpenClose}
                            content={<AddNotes closeModal={closeModal} model={model} noteModalTypeInfo={noteModalInfoEdit}
                                               handleClose={handleOpenClose}/>}
                        />
                        <SimpleModal
                            openDefault={openDelModal}
                            handleOpenClose={handleOpenCloseDel}
                            content={<DeleteElement loader={loader} text='some information'
                                                    info={deletedData?.deletedName}
                                                    handleDel={handleDelete} handleClose={handleOpenCloseDel}/>}
                        />
                    </>
                }
            </TableContainer>
            <Toast
                type={success ? 'Successfully added' : errorText ? 'Something went wrong' : ''}
                text={errorMessage}
                info={success ? success : errorText ? errorText : ''}/>
        </div>
    )
}