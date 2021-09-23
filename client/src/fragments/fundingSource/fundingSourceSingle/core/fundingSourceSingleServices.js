import React, {useEffect, useState} from "react";
import {
    DeleteElement,
    NoItemText,
    Notes,
    SimpleModal,
    TableBodyComponent
} from "@eachbase/components";
import {FundingSourceSinglePTModifiers} from "./fundingSourceSinglePTModifiers";
import {Images} from "@eachbase/utils";
import {useDispatch, useSelector} from "react-redux";
import {TableCell} from "@material-ui/core";
import {fundingSourceSingleStyles} from "./styles";
import {FundingSourceServiceAdd,} from "./modals";
import {fundingSourceActions, httpRequestsOnErrorsActions, httpRequestsOnSuccessActions} from "@eachbase/store";

export const FundingSourceSingleServices = ({data,}) => {
    const [toggleModal, setToggleModal] = useState(false)
    const [index, setIndex] = useState(null)
    const [delEdit, setDelEdit] = useState(null)
    const [serviceIndex, setServiceIndex] = useState(0)
    const [accept, setAccept] = useState(false)
    const classes = fundingSourceSingleStyles()
    const dispatch = useDispatch()
    const modifiers = useSelector(state => state.fundingSource?.modifiers[0]?.modifiers)
    const globalCredentials = useSelector(state => state.system.credentials)
    const {httpOnSuccess, httpOnError, httpOnLoad} = useSelector((state) => ({
        httpOnSuccess: state.httpOnSuccess,
        httpOnError: state.httpOnError,
        httpOnLoad: state.httpOnLoad,
    }));


    console.log(modifiers,'mooods')

    const success = httpOnSuccess.length && httpOnSuccess[0].type === 'GET_FUNDING_SOURCE_SERVICE_MODIFIERS'

    useEffect(() => {
        if (success) {
            dispatch(httpRequestsOnSuccessActions.removeSuccess('GET_FUNDING_SOURCE_SERVICE_MODIFIERS'))
            if (accept) {
                setToggleModal(!toggleModal)
                setAccept(false)
            }
        }
    }, [success])

    useEffect(() => {
        if (httpOnError.length && httpOnError[0].error === 'Modifier was not found') {
            dispatch(httpRequestsOnSuccessActions.removeSuccess('GET_FUNDING_SOURCE_SERVICE_MODIFIERS'))
            dispatch(httpRequestsOnErrorsActions.removeError('GET_FUNDING_SOURCE_SERVICE_MODIFIERS'))
            if (accept) {
                setToggleModal(!toggleModal)
                setAccept(false)
            }
        }

    }, [httpOnError])


    const headerTitles = [
        {
            title: 'Service',
            sortable: true
        },
        {
            title: 'CPT Code',
            sortable: false
        },
        {
            title: 'Unit Size',
            sortable: false
        },
        {
            title: 'Min Unit',
            sortable: false
        },
        {
            title: 'Max Unit',
            sortable: false
        },
        {
            title: 'Action',
            sortable: false
        },
    ];


    let onEdit = (index) => {
        setIndex(index)
        setDelEdit('edit')
        setAccept(true)
        dispatch(fundingSourceActions.getFoundingSourceServiceModifiers(data[serviceIndex]._id))
    }

    let onRow = (id, index) => {
        setServiceIndex(index)
        dispatch(fundingSourceActions.getFoundingSourceServiceModifiers(id))
    }

    useEffect(() => {
        if (data) {
            dispatch(fundingSourceActions.getFoundingSourceServiceModifiers(data[serviceIndex]._id))
        }
    }, [])

    let deleteService = () => {
        alert('wait Edgar')
        dispatch(fundingSourceActions.deleteFoundingSourceServiceById(data[serviceIndex]._id))
    }

    let serviceItem = (item, index) => {
        return (
            <TableBodyComponent active={index === serviceIndex} key={index} handleOpenInfo={() => onRow(item._id, index)}>
                <TableCell><p className={classes.tableTitle}>{item.name}</p></TableCell>
                <TableCell>  {item.cptCode}  </TableCell>
                <TableCell>  {item.size}  </TableCell>
                <TableCell>  {item.min}  </TableCell>
                <TableCell>  {item.max}  </TableCell>
                <TableCell>
                    <>
                        <img src={Images.edit} alt="edit" className={classes.iconCursor}
                             onClick={() => onEdit(index)}/>
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


    return (
        <div className={classes.fundindService}>
            <SimpleModal
                openDefault={toggleModal}
                handleOpenClose={() => setToggleModal(!toggleModal)}
                content={delEdit === 'del' ?
                    <DeleteElement
                        handleDel={deleteService}
                        info={index !== null ? data[index].name : ''}
                        text={'Delete Service'}
                        handleClose={() => setToggleModal(!toggleModal)}/> :
                    <FundingSourceServiceAdd modifiersID={modifiers} info={data ? data[index] : {}}
                                             handleClose={() => setToggleModal(!toggleModal)}/>}
            />
            <div className={classes.fundindServiceItems}>
                <Notes data={data} items={serviceItem} headerTitles={headerTitles} defaultStyle={true}/>
            </div>
            {modifiers && modifiers?.length >0 ? <FundingSourceSinglePTModifiers
                    globalCredentials={globalCredentials}
                    data={modifiers}
                    title={data && data[serviceIndex]?.name}/> :
                <NoItemText text=''/>}
        </div>
    )
}