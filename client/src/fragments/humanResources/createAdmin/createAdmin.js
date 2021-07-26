import React, {useState} from "react";
import { CreateAdminInputs } from "./core";
import { CreateWrapper } from "@eachbase/components";
import { Images, useGlobalStyles } from "@eachbase/utils";

export const CreateAdminTable = ({ }) => {
  const globalStyle = useGlobalStyles();
  const [firstName, setFirstName] =useState('')
  const [lastName, setLastName] =useState('')

  return (
    <div>
      <CreateWrapper
        head={
              <div className={globalStyle.createOfficeTableHead}>
                <img src={Images.humanResourcesYellow} alt={"humanResourcesYellow"} />
                <p>{
                    firstName && lastName ? `${firstName} ${lastName}` :
                     firstName  ?  firstName  :
                        lastName ? lastName : 'FULL NAME/USERNAME'
                }</p>
              </div>
        }
        body={
          <CreateAdminInputs
              handleChangeFirstName = { setFirstName }
              handleChangeLastName = { setLastName }
          />
        }
        parentLink={'/humanResources'}
        parent={'Human Recources'}
        child={'Add People'}
      />
    </div>
  );
};
