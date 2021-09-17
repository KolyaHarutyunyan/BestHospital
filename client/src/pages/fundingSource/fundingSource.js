import React, {useEffect, useState} from "react";
import {TableWrapper} from "@eachbase/components";
import {FundingSourceTable, CreateFundingSource,} from "@eachbase/fragments";
import {fundingSourceActions} from "@eachbase/store";
import {useDispatch} from "react-redux";


export const FundingSource = ({}) => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [page, setPage] = useState(1)
    const [status, setStatus] = useState(1)

    useEffect(() => {
        dispatch(fundingSourceActions.getFundingSource({status: status, start: 0, end: 10}))
    }, []);

    const handleOpenClose = () => {
        setOpen(!open)
    }

    const handleActiveOrInactive = (status) => {
        setStatus(status)
        if (status === 0) {
            dispatch(fundingSourceActions.getFundingSource({status: 0, start: 0, end: 10}))
        } else {
            dispatch(fundingSourceActions.getFundingSource({status: 1, start: 0, end: 10}))
        }
    }

    return (
        <TableWrapper
            getActive={() => handleActiveOrInactive(1)}
            getInactive={() => handleActiveOrInactive(0)}
            firstButton={"Active"}
            secondButton={"Inactive"}
            addButton={"Add Funding Source"}
            buttonsTab={true}
            buttonsTabAddButton={true}
            addButtonText={'Add Funding Source'}
            handleOpenClose={handleOpenClose}
            openCloseInfo={open}
            body={<CreateFundingSource handleClose={handleOpenClose}/>}
        >
            <FundingSourceTable handleGetPage={setPage} status={status}/>
        </TableWrapper>
    );
}
