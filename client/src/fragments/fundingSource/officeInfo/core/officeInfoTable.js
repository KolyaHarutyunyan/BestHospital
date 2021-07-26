import React from "react";
import { CreateFundingSource } from "../../createFundingSource";
import { Colors, useGlobalText} from "@eachbase/utils";
import {OfficeManagement} from "./officeManagement";
import { FundingSourceTable } from "@eachbase/fragments"

import { Documents, Payment, Branches} from './index'


export const OfficeInfoTable =({ info, handleChangeName })=>{
    const globalStyle = useGlobalText();
    return(
        <div>
            <CreateFundingSource
            
              handleChangeName={handleChangeName}
              info={info}
              />

             <OfficeManagement/>


             <Payment/>

            <Documents/>


            <Branches/>
     
        </div>
    )
}