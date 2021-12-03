import {NoItemText, Role} from '@eachbase/components';
import {Images} from '@eachbase/utils'
import {serviceSingleStyles} from "./styles";
import React, {useState} from "react";

export const StaffAccess = ({rolesList, accessList}) => {
    const classes = serviceSingleStyles()
    const [info, setInfo] = useState('')

    const sendItem = (item) => {
        setInfo(item)
    }

    return (
        <div className={classes.staffAccessWrapper}>
            <Role rolesList={rolesList} accessList={accessList} sendItem={sendItem}/>
            <div className={classes.roleInformation}>
                {info ?
                    <>
                        <div className={classes.roleHeader}>
                            <div className={classes.cardIcon}>
                                <img src={Images.address} alt="role"/>
                            </div>
                            <h1 className={classes.roleTitle}>{info ? info.title : ''}</h1>
                        </div>
                        <p className={classes.roleSubtitle}>Description</p>
                        <p className={classes.roleText}>{info ? info.description : ''}</p>
                        <p className={classes.roleSubtitle}>Permissions</p>
                        <div className={classes.permissionsList}>
                        {
                            info && info.permissions && info.permissions.map((item, j) => (
                                <div key={j} className={classes.rolePermissionContainer}>
                                    <img src={Images.roleManagementActive} alt="permission"/>
                                    <p className={classes.rolePermissionName}>{item.title}</p>
                                </div>
                            ))
                        }
                        </div>
                    </>
                    :
                    <div className={classes.selectRole}>
                        <p>
                            Select Access
                        </p>
                    </div>
                }
            </div>
        </div>
    )
}