import React, {useEffect, useState} from "react";
import {
    SimpleTabs,
    Notes,
    TableWrapperGeneralInfo,
    InactiveModal,
    Loader,
    NoItemText,
    Toast
} from "@eachbase/components";
import {adminActions, fundingSourceActions, httpRequestsOnSuccessActions, systemActions} from "@eachbase/store";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {
    FundingSourceSingleGeneral,
    FundingSourceSingleHeader,
    FundingSourceSingleServices,
    FundingSourceSingleNotes,
    FundingSourceSingleHistories
} from "./core";
import {fundingSourceItemStyle} from "./styles";
import {noteActions} from "../../../store/notes";


export const FundingSourceItem = ({}) => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const params = useParams()
    const data = useSelector(state => state.fundingSource.fundingSourceItem)
    const servicesData = useSelector(state => state.fundingSource.fundingSourceServices)
    const historiesData = useSelector(state => state.fundingSource.fundingSourceHistories)
    const globalNotes = useSelector(state => state.note.notes)
    const globalServices = useSelector(state => state.system.services)
    const [activeTab, setActiveTab] = useState(0)
    const classes = fundingSourceItemStyle()



    useEffect(() => {
        dispatch(adminActions.getAdmins())
        dispatch(fundingSourceActions.getFundingSourceById(params.id))
        dispatch(fundingSourceActions.getFoundingSourceServiceById(params.id))
        dispatch(fundingSourceActions.getFundingSourceHistoriesById(params.id,'Funder'))
        dispatch(noteActions.getGlobalNotes(params.id,'Funder'))
        dispatch(systemActions.getServices())
        dispatch(systemActions.getCredentialGlobal())


        dispatch(httpRequestsOnSuccessActions.removeSuccess())
    }, []);

    const handleOpenClose = () => {
        setOpen(!open)
    }

    const tabsLabels = [
        {label: 'General Information'},
        {label: 'Services'},
        {label: 'Notes'},
        {label: 'History'}
    ]


    const {httpOnSuccess, httpOnError, httpOnLoad} = useSelector((state) => ({
        httpOnSuccess: state.httpOnSuccess,
        httpOnError: state.httpOnError,
        httpOnLoad: state.httpOnLoad,
    }));



    const success = httpOnSuccess.length && httpOnSuccess[0].type === 'EDIT_FUNDING_SOURCE'
    let errorMessage = success ? 'Successfully Edited' : 'Something went wrong'

    const tabsContent = [
        {tabComponent: httpOnLoad.length > 0 ? <Loader/> : <FundingSourceSingleGeneral data={data}/>},
        {tabComponent: servicesData.length?  <FundingSourceSingleServices data={servicesData} globalServices={globalServices}/> :  <NoItemText text='No Services Yet' />},
        {tabComponent: globalNotes.length ? <FundingSourceSingleNotes data={globalNotes}/> : <NoItemText text='No Notes Yet' />},
        {tabComponent: historiesData.length ?   <FundingSourceSingleHistories data={historiesData}/> :  <NoItemText text='No Histories Yet' />},
    ];

    return (
        <>
            <Toast
                type={'success'}
                text={errorMessage}
                info={success}/>

            <TableWrapperGeneralInfo
                title={data?.name}
                status= {data?.status ===1 ? 'active' : 'inactive'}
                activeInactiveText={data?.status !==1 ? 'active' : 'inactive'}
                parent='Funding Source'
                parentLink='/fundingSource'
                buttonsTabAddButton={true}
                openCloseInfo={open}
                handleOpenClose={handleOpenClose}
                body={<InactiveModal info={{
                    status : data?.status,
                    path : 'funding',
                    type : 'GET_FUNDING_SOURCE_BY_ID_SUCCESS'
                }} handleOpenClose={handleOpenClose} handleClose={handleOpenClose}/>}
            >
                <div className={classes.fundingSourceItemHeader}>
                    <FundingSourceSingleHeader title={data?.name} activeTab={activeTab}/>
                    <SimpleTabs
                        setActiveTab={setActiveTab}
                        tabsLabels={tabsLabels}
                        tabsContent={tabsContent}/>
                </div>
            </TableWrapperGeneralInfo>

        </>
    )
}