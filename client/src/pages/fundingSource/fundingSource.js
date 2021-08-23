import React, {useEffect, useState} from "react";
import {TableWrapper} from "@eachbase/components";
import {OfficesInfo, FundingSourceTable, CreateFundingSource,} from "@eachbase/fragments";
import {fundingSourceActions} from "@eachbase/store";
import {useDispatch, useSelector} from "react-redux";



export const FundingSource = ({}) => {
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)


    useEffect(() => {
        dispatch(fundingSourceActions.getFundingSource())
    }, []);

    const {officeById} = useSelector((state) => ({
            officeById: state.offices.officeById,
        })
    )

    const handleOpenClose = () => {
        setOpen(!open)
    }
    return (
        <>
            {!officeById ?
                (
                    <TableWrapper
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
                )
                : (<OfficesInfo info={officeById}/>)
            }
        </>
    );
}
