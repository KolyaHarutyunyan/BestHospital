import React, {useEffect, useState} from "react";
import {SimpleTabs, Notes, TableWrapperGeneralInfo, InactiveModal, Loader} from "@eachbase/components";
import {adminActions, fundingSourceActions, systemActions} from "@eachbase/store";
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


export const FundingSourceItem = ({}) => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const params = useParams()
    const data = useSelector(state => state.fundingSource.fundingSourceItem)
    const servicesData = useSelector(state => state.fundingSource.fundingSourceServices)
    const historiesData = useSelector(state => state.fundingSource.fundingSourceHistories)
    const notesData = useSelector(state => state.fundingSource.fundingSourceNotes)
    const globalServices = useSelector(state => state.system.services)
    const [activeTab, setActiveTab] = useState(0)
    const classes = fundingSourceItemStyle()



    useEffect(() => {
        dispatch(adminActions.getAdmins())
        dispatch(fundingSourceActions.getFundingSourceById(params.id))
        dispatch(fundingSourceActions.getFoundingSourceServiceById(params.id))
        dispatch(fundingSourceActions.getFundingSourceHistoriesById(params.id,'Funder'))
        dispatch(fundingSourceActions.getFundingSourceNotes(params.id,'Funder'))
        dispatch(systemActions.getServices())
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
        {tabComponent: <FundingSourceSingleServices data={servicesData} globalServices={globalServices}/>},
        {tabComponent: <FundingSourceSingleNotes data={notesData}/>},
        {tabComponent: <FundingSourceSingleHistories data={historiesData}/>},
    ];

    return (
        <>
            <TableWrapperGeneralInfo
                title={data?.name}
                status='inactive'
                parent='Funding Source'
                parentLink='/fundingSource'
                buttonsTabAddButton={true}
                activeInactiveText={'Inactive'}
                openCloseInfo={open}
                handleOpenClose={handleOpenClose}
                body={<InactiveModal handleOpenClose={handleOpenClose} handleClose={handleOpenClose}/>}
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