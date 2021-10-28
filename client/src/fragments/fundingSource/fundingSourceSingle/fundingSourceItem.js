import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {
    SimpleTabs,
    Notes,
    TableWrapperGeneralInfo,
    InactiveModal,
    Loader,
    NoItemText,
} from "@eachbase/components";
import {adminActions, fundingSourceActions, httpRequestsOnSuccessActions, systemActions} from "@eachbase/store";
import {
    FundingSourceSingleGeneral,
    FundingSourceSingleHeader,
    FundingSourceSingleServices,
    FundingSourceSingleNotes,
    FundingSourceSingleHistories
} from "./core";
import {fundingSourceItemStyle} from "./styles";
import {noteActions} from "@eachbase/store/notes";


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
    const [getStatus, setGetStatus] = useState('')
    const [prevStatus, setPrevStatus] = useState('')
    const classes = fundingSourceItemStyle()



    useEffect(() => {
        dispatch(adminActions.getAdmins())
        dispatch(fundingSourceActions.getFundingSourceById(params.id))
        dispatch(fundingSourceActions.getFoundingSourceServiceById(params.id))
        dispatch(fundingSourceActions.getFundingSourceHistoriesById('Funder'))
        dispatch(noteActions.getGlobalNotes(params.id, 'Funder'))
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

    const tabsContent = [
        {tabComponent: httpOnLoad.length > 0 ? <Loader/> : <FundingSourceSingleGeneral data={data}/>},
        {
            tabComponent: servicesData.length ?
                <FundingSourceSingleServices data={servicesData} globalServices={globalServices}/> :
                <NoItemText text='No Services Yet'/>
        },
        {
            tabComponent: globalNotes.length ? <FundingSourceSingleNotes data={globalNotes}/> :
                <NoItemText text='No Notes Yet'/>
        },
        {
            tabComponent: historiesData.length ? <FundingSourceSingleHistories data={historiesData}/> :
                <NoItemText text='No Histories Yet'/>
        },
    ];

    return (
        <>
            <TableWrapperGeneralInfo
                title={data?.name}
                parent='Funding Source'
                parentLink='/fundingSource'
                buttonsTabAddButton={true}
                openCloseInfo={open}
                handleOpenClose={handleOpenClose}

                body={<InactiveModal
                    name ={data?.name}
                    setGetStatus={setGetStatus}
                    prevStatus={prevStatus}
                    info={{
                    status: getStatus,
                    path: 'funding',
                    type: 'GET_FUNDING_SOURCE_BY_ID_SUCCESS'
                }} handleOpenClose={handleOpenClose}
                    handleClose={handleOpenClose}/>}
            >
                <div className={classes.fundingSourceItemHeader}>
                    <FundingSourceSingleHeader
                        type= 'GET_FUNDING_SOURCE_BY_ID_SUCCESS'
                        setGetStatus={setGetStatus}
                        getStatus={getStatus}
                        setPrevStatus={setPrevStatus}
                        handleOpen={handleOpenClose}
                        status={data?.status}
                        title={data?.name}
                        activeTab={activeTab}/>
                    <SimpleTabs
                        setActiveTab={setActiveTab}
                        tabsLabels={tabsLabels}
                        tabsContent={tabsContent}/>
                </div>
            </TableWrapperGeneralInfo>
        </>
    )
}