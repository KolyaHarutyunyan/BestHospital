import {CreateWrapperHead, InfoWrapper} from "@eachbase/components";
import {useDispatch} from "react-redux";
import {Images, useGlobalStyles, useGlobalText, AntSwitch} from "@eachbase/utils";
import React, {useEffect, useState} from "react";
import {adminActions} from "@eachbase/store";
import { CreateAdminInputs } from '../index'


export const AdminInfo = ({handleClose, info}) => {
    const globalStyle = useGlobalStyles()
    const globalText = useGlobalText()
    const [firstName, setFirstName] =useState('')
    const [lastName, setLastName] =useState('')
    const [switchBoolean , setSwitchBoolean] = useState(info ? info.isActive : ' ')
    const [adminName , setAdminName] = useState('')
    const dispatch = useDispatch()




    console.log(info,'infoinfoinfoinfo')
    useEffect(() => {
        return () => {
            dispatch(adminActions.clearAdminById())
        }
    }, [])

    const handleSwitch =()=>{     
        if( switchBoolean ){
            dispatch(adminActions.inactivateAdmin(info.id))
            setSwitchBoolean(false)
        }else{
            dispatch(dispatch(adminActions.activateAdmin(info.id)))
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
                                <img src={Images.humanResourcesYellow} alt={"authorityBlueFill"}/>
                                <p>{ firstName && lastName ? `${firstName} ${lastName}` :
                                    firstName  ?  firstName  :
                                        lastName ? lastName :
                                            `${info.firstName} ${info.lastName}`}
                                </p>
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
                    <CreateAdminInputs
                        handleChangeFirstName = { setFirstName }
                        handleChangeLastName = { setLastName }
                        handleChangeName={setAdminName}
                        info={info}
                    />
                   
                }
                parentLink={'/humanResources'}
                parent={'Human Recources'}
                child={'Person Info'}
            />

        </div>
    );
}
