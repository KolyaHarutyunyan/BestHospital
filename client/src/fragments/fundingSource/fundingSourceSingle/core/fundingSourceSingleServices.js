import React, {useEffect, useState} from "react";
import {DeleteElement, Loader, MinLoader, Notes, SimpleModal, TableBodyComponent} from "@eachbase/components";
import {FundingSourceSinglePTModifiers} from "./fundingSourceSinglePTModifiers";
import {Colors, Images} from "@eachbase/utils";
import {useDispatch, useSelector} from "react-redux";
import {TableCell} from "@material-ui/core";
import {fundingSourceSingleStyles} from "./styles";
import {FundingSourceServiceAdd,} from "./modals";
import {fundingSourceActions, httpRequestsOnSuccessActions} from "../../../../store";

export const FundingSourceSingleServices = ({data,}) => {


    const [toggleModal, setToggleModal] = useState(false)
    const [index, setIndex] = useState(null)
    const [delEdit, setDelEdit] = useState(null)
    const [serviceIndex, setServiceIndex] = useState(0)
    const [accept, setAcept] = useState(false)
    const classes = fundingSourceSingleStyles()
    const dispatch = useDispatch()
    const modifiers = useSelector(state => state.fundingSource.modifiers)

    const {httpOnSuccess, httpOnError, httpOnLoad} = useSelector((state) => ({
        httpOnSuccess: state.httpOnSuccess,
        httpOnError: state.httpOnError,
        httpOnLoad: state.httpOnLoad,
    }));


    const success = httpOnSuccess.length && httpOnSuccess[0].type === 'GET_FUNDING_SOURCE_SERVICE_MODIFIERS'


    useEffect(() => {
        if (success) {
            // handleClose()
            dispatch(httpRequestsOnSuccessActions.removeSuccess('GET_FUNDING_SOURCE_SERVICE_MODIFIERS'))
        }

    }, [success])


    useEffect(() => {
        dispatch(fundingSourceActions.getFoundingSourceServiceModifiers(data[serviceIndex]._id))
    }, [serviceIndex])

    console.log(success, 'succes mods')


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


    let serviceItem = (item, index) => {
        return (
            <TableBodyComponent key={index} handleClick={() => setServiceIndex(index)}>


                <TableCell><p className={classes.tableTitle}>{item.name}</p></TableCell>
                <TableCell>  {item.cptCode}  </TableCell>
                <TableCell>  {item.size}  </TableCell>
                <TableCell>  {item.min}  </TableCell>
                <TableCell>  {item.max}  </TableCell>
                <TableCell>
                    <>
                        {!httpOnLoad.length > 0 ?
                            <img src={Images.edit} alt="edit" className={classes.iconCursor}
                                 onClick={(e) => {
                                     setIndex(index)
                                     setDelEdit('edit')
                                     setToggleModal(!toggleModal)
                                 }}/> : <MinLoader margin={'0'} color={Colors.TextPrimary}/>}
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
        <div style={{display: 'flex', justifyContent: "space-between", marginTop: 50}}>
            <SimpleModal
                openDefault={toggleModal}
                handleOpenClose={() => setToggleModal(!toggleModal)}
                content={delEdit === 'del' ?
                    <DeleteElement
                        info={index !== null ? data[index].name : ''}
                        text={'Delete Service'}
                        handleClose={() => setToggleModal(!toggleModal)}/> :
                    <FundingSourceServiceAdd modifiersID={modifiers} info={data[index]}
                                             handleClose={() => setToggleModal(!toggleModal)}/>}
            />
            <div style={{marginTop: -32, width: '100%'}}>
                <Notes data={data} items={serviceItem} headerTitles={headerTitles} defaultStyle={true}/>
            </div>
            <FundingSourceSinglePTModifiers data={modifiers}
                                            title={data && data[serviceIndex]?.name}/>
        </div>
    )
}