import React, {useEffect, useState} from "react";
import {SimpleTabs, Notes, TableWrapperGeneralInfo, InactiveModal} from "@eachbase/components";
import {adminActions, fundingSourceActions} from "@eachbase/store";
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
    const [activeTab, setActiveTab] = useState(0)
    const classes = fundingSourceItemStyle()

    useEffect(() => {
        dispatch(adminActions.getAdmins())
        dispatch(fundingSourceActions.getFundingSourceById(params.id))
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

    const tabsContent = [
        {tabComponent: <FundingSourceSingleGeneral data={data}/>},
        {tabComponent: <FundingSourceSingleServices/>},
        {tabComponent: <FundingSourceSingleNotes/>},
        {tabComponent: <FundingSourceSingleHistories/>},
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