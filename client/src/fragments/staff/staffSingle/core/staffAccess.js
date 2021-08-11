import {Role} from '@eachbase/components';
import {Images} from '@eachbase/utils'
import { serviceSingleStyles } from "./styles";
import React from "react";


const permissionsList = ['Permission 1', 'Permission 2', 'Permission 3']

export const StaffAccess = () => {

    const classes = serviceSingleStyles()

    return (
        <div className={classes.staffAccessWrapper}>
            <Role/>
            <div className={classes.roleInformation}>
                <div className={classes.roleHeader}>
                    <div className={classes.cardIcon}>
                        <img src={Images.address} alt="role"/>
                    </div>
                    <h1 className={classes.roleTitle}>Role Name</h1>
                </div>
                <p className={classes.roleSubtitle}>Description</p>
                <p className={classes.roleText}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                    and scrambled it to make a type specimen book.</p>
                <p className={classes.roleSubtitle}>Permissions</p>
                {
                    permissionsList.map((item, index)=>{
                        return (
                            <div className={classes.rolePermissionContainer}>
                                <img src={Images.roleManagementActive} alt="permission"/>
                                <p className={classes.rolePermissionName}>{item}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}