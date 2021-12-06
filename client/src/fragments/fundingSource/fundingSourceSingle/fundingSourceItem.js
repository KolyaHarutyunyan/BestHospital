import React, {useState} from "react";
import {useSelector} from "react-redux";
import {
    SimpleTabs,
    Notes,
    TableWrapperGeneralInfo,
    InactiveModal,
    Loader,
    NoItemText,
} from "@eachbase/components";
import {
    FundingSourceSingleGeneral,
    FundingSourceSingleHeader,
    FundingSourceSingleServices,
    FundingSourceSingleNotes,
    FundingSourceSingleHistories
} from "./core";
import {fundingSourceItemStyle} from "./styles";
import {FindLoad} from "@eachbase/utils";
import {useParams} from "react-router-dom";

export const FundingSourceItem = ({}) => {
    const classes = fundingSourceItemStyle()
    const data = useSelector(state => state.fundingSource.fundingSourceItem)
    const servicesData = useSelector(state => state.fundingSource.fundingSourceServices)
    const historiesData = useSelector(state => state.fundingSource.fundingSourceHistories)
    const globalNotes = useSelector(state => state.note.notes)
    const globalServices = useSelector(state => state.system.services)
    const [open, setOpen] = useState(false)
    const [activeTab, setActiveTab] = useState(0)
    const [getStatus, setGetStatus] = useState('')
    const [prevStatus, setPrevStatus] = useState('')

    const tabsLabels = [
        {label: 'General Information'},
        {label: 'Services'},
        {label: 'Notes'},
        {label: 'History'}
    ]

    const loader = FindLoad('GET_FUNDING_SOURCE_HISTORIES_BY_ID')
    const [statusType, setStatusType] = useState('')

    const handleOpenClose = (status) => {
        setGetStatus(data?.status)
        setStatusType(status)
        setOpen(!open)
    }

    const tabsContent = [
        {
            tabComponent: loader.length ?
                <Loader/>
                :
                <FundingSourceSingleGeneral data={data}/>
        },
        {
            tabComponent: servicesData.length ?
                <FundingSourceSingleServices data={servicesData} globalServices={globalServices}/>
                :
                <NoItemText text='No Services Yet'/>
        },
        {
            tabComponent: globalNotes.length ? <FundingSourceSingleNotes data={globalNotes}/>
                :
                <NoItemText text='No Notes Yet'/>
        },
        {
            tabComponent: historiesData.length ? <FundingSourceSingleHistories data={historiesData}/>
                :
                <NoItemText text='No Histories Yet'/>
        },
    ];
    const list = [
        {name: 'ACTIVE', id:'ACTIVE'},
        {name: 'INACTIVE', id:'INACTIVE'},
        {name: 'HOLD', id:'HOLD'},
        {name: 'TERMINATE', id:'TERMINATE'},
    ]




    const params = useParams()
    return (
        <>
            <TableWrapperGeneralInfo
                selectStatus={true}
                setGetStatus={setGetStatus}
                getStatus={getStatus}
                setPrevStatus={setPrevStatus}
                status={data?.status}
                id={params.id}
                handleOpen={handleOpenClose}
                path={'funding'}
                type={'GET_FUNDING_SOURCE_BY_ID_SUCCESS'}

                title={data?.name}
                parent='Funding Source'
                parentLink='/fundingSource'
                buttonsTabAddButton={true}
                openCloseInfo={open}
                list={list}
                handleOpenClose={handleOpenClose}
                body={
                    <InactiveModal
                        statusType={statusType}
                        status={data?.status}
                        name={data?.name}
                        info={{
                            status: getStatus,
                            path: 'funding',
                            type: 'GET_FUNDING_SOURCE_BY_ID_SUCCESS'
                        }}
                        handleOpenClose={handleOpenClose}
                    />
                }
            >
                <div className={classes.fundingSourceItemHeader}>
                    <FundingSourceSingleHeader
                        title={data?.name}
                        activeTab={activeTab}
                    />
                    <SimpleTabs
                        setActiveTab={setActiveTab}
                        tabsLabels={tabsLabels}
                        tabsContent={tabsContent}
                    />
                </div>
            </TableWrapperGeneralInfo>
        </>
    )
}