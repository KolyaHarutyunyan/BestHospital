import React, {useEffect} from "react";
import { TableWrapper} from "@eachbase/components";
import {OfficesInfo, FundingSourceTable, CreateFundingSource,} from "@eachbase/fragments";
import { useHistory } from "react-router-dom";
import { officeActions } from "@eachbase/store";
import {useDispatch, useSelector} from "react-redux";

export const FundingSource = ({}) => {
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(officeActions.getOffices())
  }, []);

  const {officeById} = useSelector((state)=>({
        officeById: state.offices.officeById,
      })
  )

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
                body={ <CreateFundingSource/> }
            >

                <FundingSourceTable/>

            </TableWrapper>
            )
            : (<OfficesInfo info={officeById}/>)

        }
          </>
  );
}
