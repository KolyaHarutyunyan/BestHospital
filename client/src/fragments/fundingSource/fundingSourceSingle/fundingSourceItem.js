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

    const tabsLabels = [
        {label: 'General Information'},
        {label: 'Services'},
        {label: 'Notes'},
        {label: 'History'}
    ]

    const loader = FindLoad('GET_FUNDING_SOURCE_HISTORIES_BY_ID')
    const [statusType, setStatusType] = useState('')

    const handleOpenClose = (status) => {
        setStatusType(status)
        setOpen(!open)
    }

    const tabsContent = [
        {
            tabComponent:
                // loader.length ? <Loader/> :
                    <FundingSourceSingleGeneral data={data}/>
        },
        {
            tabComponent: servicesData.length ? <FundingSourceSingleServices data={servicesData} globalServices={globalServices}/> : <NoItemText text='No Services Yet'/>
        },
        {
            tabComponent: globalNotes.length ? <FundingSourceSingleNotes data={globalNotes}/> : <NoItemText text='No Notes Yet'/>
        },
        {
            tabComponent: historiesData.length ? <FundingSourceSingleHistories data={historiesData}/> : <NoItemText text='No Histories Yet'/>
        },
    ];

    const params = useParams()
    return (
        <>
            <TableWrapperGeneralInfo
                selectStatus={true}
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
                handleOpenClose={handleOpenClose}
                body={
                    <InactiveModal
                        statusType={statusType}
                        name={data?.name}
                        info={{
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