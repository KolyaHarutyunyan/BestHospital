import React, {useEffect, useState} from "react";
import {TableWrapper} from "@eachbase/components";
import {OfficesInfo, FundingSourceTable, CreateFundingSource,} from "@eachbase/fragments";
import {fundingSourceActions} from "@eachbase/store";
import {useDispatch, useSelector} from "react-redux";



export const FundingSource = ({}) => {
    const dispatch = useDispatch()
    const [type, setType] = useState(1)
    const [open, setOpen] = useState(false)


    useEffect(() => {
        dispatch(fundingSourceActions.getFundingSource())
    }, []);

    const handleOpenClose = () => {
        setOpen(!open)
    }

    const handleActiveOrInactive  =(status) =>{
        dispatch(fundingSourceActions.getFundingSource(status))
    }


    // const handleActiveOrInactive  =(type) =>{
    //     setType(type)
    //     if(type === 1){
    //         dispatch(fundingSourceActions.getActiveOrInactive(1))
    //     }else{
    //         dispatch(fundingSourceActions.getActiveOrInactive(0))
    //     }
    // }

    return (
        <>
                    <TableWrapper
                        getActive={() => handleActiveOrInactive(1)}
                        getInactive={() => handleActiveOrInactive(0) }
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

                        <FundingSourceTable/>
                    </TableWrapper>

        </>
    );
}
