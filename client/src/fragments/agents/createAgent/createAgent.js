import React, {useEffect, useState} from "react";
import {CreateAgentInputs} from "./core";
import {CreateWrapper} from "@eachbase/components";
import {Images, useGlobalStyles} from "@eachbase/utils";
import {fundingSourceActions, officeActions} from "@eachbase/store";
import {useDispatch} from "react-redux";

export const CreateAgent = ({}) => {
    const globalStyle = useGlobalStyles();
    const dispatch = useDispatch()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    useEffect(() => {
        dispatch(officeActions.getOffices())
        // dispatch(fundingSourceActions.getBranches())
    }, []);

    return (
        <div>
            <CreateWrapper
                head={
                    <div className={globalStyle.createOfficeTableHead}>
                        <img src={Images.agentsBlue} alt={"humanResourcesYellow"}/>
                        <p>{
                            firstName && lastName ? `${firstName} ${lastName}` :
                                firstName ? firstName :
                                    lastName ? lastName : 'AGENT NAME'
                        }</p>
                    </div>
                }
                body={
                    <CreateAgentInputs
                        handleChangeFirstName = { setFirstName }
                        handleChangeLastName = { setLastName }
                    />
                }
                parentLink={'/agents'}
                parent={'Agents'}
                child={'Add Agent'}
            />
        </div>
    );
};
