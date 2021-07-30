// export const Single = ({}) => {
//     return (
//         <div>
//             single
//         </div>
//     )
// }

import React, { useEffect, useState } from "react";
import { TableWrapper } from "@eachbase/components";
import { OfficesInfo, FundingSourceTable, CreateFundingSource, } from "@eachbase/fragments";
import { useHistory } from "react-router-dom";
import {fundingSourceActions, officeActions} from "@eachbase/store";
import { useDispatch, useSelector } from "react-redux";
import {getFundingSource} from "../../store/fundingSource/fundingSource.action";

export const Single = ({ }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        dispatch(fundingSourceActions.getFundingSource())
    }, []);

    const { officeById } = useSelector((state) => ({
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
                        body={<CreateFundingSource handleClose={handleOpenClose} />}
                    >

                        <FundingSourceTable />

                    </TableWrapper>
                )
                : (<OfficesInfo info={officeById} />)

            }
        </>
    );
}
