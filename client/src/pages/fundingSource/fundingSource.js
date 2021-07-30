import React, {useEffect, useState} from "react";
import {TableWrapper} from "@eachbase/components";
import {OfficesInfo, FundingSourceTable, CreateFundingSource,} from "@eachbase/fragments";
import {useHistory} from "react-router-dom";
import {fundingSourceActions, officeActions} from "@eachbase/store";
import {useDispatch, useSelector} from "react-redux";
import {getFundingSourceById} from "../../store/fundingSource/fundingSource.action";


export const FundingSource = ({}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [open, setOpen] = useState(false)

    // let a = {id : '610183a4dcc59c21f0792c35'}


    useEffect(() => {
         dispatch(fundingSourceActions.getFundingSource())
         dispatch(fundingSourceActions.getFundingSourceById('610183a4dcc59c21f0792c35'))
    }, []);

    const {officeById} = useSelector((state) => ({
            officeById: state.offices.officeById,
        })
    )
    const dataf = useSelector(state=>state)

    console.log(dataf?.fundingSource?.fundingSourceItem,'iiiiiii')

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
