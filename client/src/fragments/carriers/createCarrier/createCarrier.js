import React, {useState} from "react";
import { CreateCarrierInputs } from "./core";
import { CreateWrapper } from "@eachbase/components";
import { Images, useGlobalStyles } from "@eachbase/utils";

export const CreateCarrier = ({ }) => {
  const globalStyle = useGlobalStyles();
  const [name, setName] = useState('')
  return (
    <div>
      <CreateWrapper
        head={
              <div className={globalStyle.createOfficeTableHead}>
                <img src={Images.carrierBold} alt={"Carrier"} />
                <p>{name ? name : 'CARRIER NAME'}</p>
              </div>
        }
        body={
          <CreateCarrierInputs
            handleChangeName ={setName}
          />
        }
        parentLink={'/carriers'}
        parent={'Carriers'}
        child={'Add Carrier'}
      />
    </div>
  );
};
