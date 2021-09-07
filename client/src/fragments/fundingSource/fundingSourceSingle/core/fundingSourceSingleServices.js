import React, {useEffect, useState} from "react";
import {DeleteElement, Notes, SimpleModal, TableBodyComponent} from "@eachbase/components";
import {FundingSourceSinglePTModifiers} from "./fundingSourceSinglePTModifiers";
import {Images} from "@eachbase/utils";
import {useDispatch, useSelector} from "react-redux";
import {TableCell} from "@material-ui/core";
import {fundingSourceSingleStyles} from "./styles";
import {FundingSourceServiceAdd,} from "./modals";
import {fundingSourceActions} from "../../../../store";

export const FundingSourceSingleServices = ({data,}) => {



    const [toggleModal, setToggleModal] = useState(false)
    const [index, setIndex] = useState(null)
    const [delEdit, setDelEdit] = useState(null)
    const [serviceIndex, setServiceIndex] = useState(0)
    const classes = fundingSourceSingleStyles()
    const dispatch = useDispatch()
    const modifiers = useSelector(state=> state.fundingSource.modifiers)
    console.log(modifiers,'mod')
    const {httpOnSuccess, httpOnError, httpOnLoad} = useSelector((state) => ({
        httpOnSuccess: state.httpOnSuccess,
        httpOnError: state.httpOnError,
        httpOnLoad: state.httpOnLoad,
    }));
    console.log(data[serviceIndex]._id)
    useEffect(() => {
        dispatch(fundingSourceActions.getFoundingSourceServiceModifiers(data[serviceIndex]._id))
    },[serviceIndex])


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
                    <FundingSourceServiceAdd info={data[index]}
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