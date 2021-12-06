import React, {useEffect, useState} from "react";
import {TableWrapper} from "@eachbase/components";
import {FundingSourceTable, CreateFundingSource,} from "@eachbase/fragments";
import {fundingSourceActions} from "@eachbase/store";
import {useDispatch} from "react-redux";

export const FundingSource = () => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [page, setPage] = useState(1)
    const [status, setStatus] = useState('ACTIVE')

    useEffect(() => {
        dispatch(fundingSourceActions.getFundingSource({status: status, start: 0, end: 10}))
    }, []);

    const handleOpenClose = () => {
        setOpen(!open)
    }

    const handleActiveOrInactive = (status) => {
        setStatus(status)
        dispatch(fundingSourceActions.getFundingSource({status: status, start: 0, end: 10}))
    }

    return (
        <TableWrapper
            handleType={handleActiveOrInactive}
            firstButton={"Active"}
            secondButton={"Inactive"}
            addButton={"Add Funding Source"}
            buttonsTab={true}
            buttonsTabAddButton={true}
            addButtonText={'Add Funding Source'}
            handleOpenClose={handleOpenClose}
            openCloseInfo={open}
            body={
                <CreateFundingSource handleClose={handleOpenClose}/>
            }
        >
            <FundingSourceTable handleGetPage={setPage} status={status}/>
        </TableWrapper>
    );
}
