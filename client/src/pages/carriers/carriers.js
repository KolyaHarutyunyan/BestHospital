import React, {useEffect} from "react";
import { TableWrapper } from "@eachbase/components";
import {OfficesInfo, FundingSourceTable,} from "@eachbase/fragments";
import { useHistory } from "react-router-dom";
import { officeActions } from "@eachbase/store";
import {useDispatch, useSelector} from "react-redux";
import {CarriersTable} from "@eachbase/fragments";

export const Carriers = ({}) => {
  const dispatch = useDispatch()
  const history = useHistory()

  // useEffect(() => {
  //   dispatch(officeActions.getOffices())
  // }, []);
  //
  // const {officeById} = useSelector((state)=>({
  //       officeById: state.fundingSource.officeById
  //     })
  // )


  return (
      <>
          <TableWrapper
                firstButton={"Active"}
                secondButton={"Inactive"}
                addButton={"Add Carrier"}
                buttonsTab={true}
                buttonsTabAddButton={true}
                handleClick={() => history.push('/createCarriers')}
            >
                <CarriersTable/>
            </TableWrapper>

          </>
  );
}
