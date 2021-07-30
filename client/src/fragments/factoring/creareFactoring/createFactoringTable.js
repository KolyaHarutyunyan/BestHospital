import React, {useState} from "react";
import { CreateFactoringInputs } from "./core";
import { CreateWrapper } from "@eachbase/components";
import { Images, useGlobalStyles } from "@eachbase/utils";

export const CreateFactoringTable = ({ }) => {
  const globalStyle = useGlobalStyles();
  const [name, setName] = useState('')
  return (
    <div>
      <CreateWrapper
        head={
              <div className={globalStyle.createOfficeTableHead}>
                <img src={Images.factoringBold} alt={"factoring"} />
                <p>{name ? name : 'FACTORING COMPANY NAME'}</p>
              </div>
        }
        body={
          <CreateFactoringInputs
            handleChangeName ={setName}
          />
        }
        parentLink={'/factoring'}
        parent={'Factoring Companies'}
        child={'Add Factoring Company'}
      />
    </div>
  );
};
