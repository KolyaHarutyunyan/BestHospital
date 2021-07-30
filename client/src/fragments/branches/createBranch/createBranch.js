import React, {useEffect, useState} from "react";
import { CreateBranchInputs } from "./core";
import { CreateWrapper } from "@eachbase/components";
import { Images, useGlobalStyles } from "@eachbase/utils";
import {officeActions} from "@eachbase/store";
import {useDispatch} from "react-redux";


export const CreateBranchTable = ({ }) => {
  const globalStyle = useGlobalStyles();
  const dispatch =useDispatch()
  const [name, setName] = useState('')

    useEffect(() => {
        dispatch(officeActions.getOffices())
    }, []);

    return (
    <div>
      <CreateWrapper
        head={
              <div className={globalStyle.createOfficeTableHead}>
                <img src={Images.branchFill} alt={"branch"} />
                <p>{name ?name : 'BRANCH NAME'}</p>
              </div>
        }
        body={
          <CreateBranchInputs
              handleChangeName ={setName}
          />
        }
        parentLink={'/fundingSource'}
        parent={'Branches'}
        child={'Add Branch'}
      />
    </div>
  );
};
