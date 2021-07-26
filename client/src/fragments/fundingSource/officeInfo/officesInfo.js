import {CreateWrapperHead, InfoWrapper} from "@eachbase/components";
import {useDispatch} from "react-redux";
import {Images, useGlobalStyles, useGlobalText, AntSwitch} from "@eachbase/utils";
import React, {useEffect, useState} from "react";
import {OfficeInfoTable} from "./core";
import {officeActions} from "@eachbase/store";

export const OfficesInfo = ({handleClose, info}) => {
    const globalStyle = useGlobalStyles()
    const globalText = useGlobalText()
    const [switchBoolean , setSwitchBoolean] = useState(info ? info.isActive : ' ')
    const [officeName , setOfficeName] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            dispatch(officeActions.clearOfficeById())
        }
    }, [])

    const handleSwitch =()=>{     
        if( switchBoolean ){
            dispatch(officeActions.inactivateOffice(info.id))
            setSwitchBoolean(false)
        }else{
            dispatch(officeActions.activateOffice(info.id))
            setSwitchBoolean(true)
        }
    }

    return (
        <div>
         <InfoWrapper
                head={
                    <CreateWrapperHead>
                        <div className={globalStyle.spaceBetween}>
                            <div className={globalStyle.centerItem}>
                                <img src={Images.officeFillBold} alt={"authorityBlueFill"}/>
                                <p>{officeName ? officeName : info.name}</p>
                            </div>
                            <div className={globalStyle.centerItem}>
                                <span className={globalText.smallSwitchText}>{switchBoolean === true ? 'Inactivate' : 'Activate'}</span>
                               <AntSwitch
                                onClick={ handleSwitch }
                                checked={ switchBoolean }
                               />
                            </div>
                        </div>
                    </CreateWrapperHead>
                }
                body={
                    <OfficeInfoTable 
                      handleChangeName={setOfficeName}
                      info={info}
                    />
                }
                parentLink={'/fundingSource'}
                parent={'Office'}
                child={'Office Info'}
            />

        </div>
    );
}
