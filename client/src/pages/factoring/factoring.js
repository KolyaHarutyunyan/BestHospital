import React, {useEffect} from "react";
import { TableWrapper} from "@eachbase/components";
import { FactoringTable } from "@eachbase/fragments";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";


export const Factoring = ({}) => {
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
    }, []);

    const {  } = useSelector((state)=>({

        })
    )

  return (
      <>
      <TableWrapper
          firstButton={"Active"}
          secondButton={"Inactive"}
          addButton={"Add Company"}
          buttonsTab={true}
          buttonsTabAddButton={true}
          handleClick={() => history.push('/createFactoring')}
      >
          <FactoringTable/>
      </TableWrapper>


      </>

    // <div>
    //   <div className={classes.factoringStyle}>
    //     <div />
    //
    //     <AddButton text={"Add Company"} />
    //   </div>
    //
    //   <FactoringTable />
    // </div>
  );
};
