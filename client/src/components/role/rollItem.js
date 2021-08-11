import {Images} from '@eachbase/utils'
import { roleStyles } from "./styles";

export const RoleItem = ({roleItem,handleClick}) =>{

    const classes = roleStyles()

    return (
        <div className={classes.roleItem}>
            <div>
                <img src={Images.roleManagementActive} alt="roleManagement"/>
                <p className={classes.roleItemName}>{roleItem && roleItem}</p>
            </div>
            <img onClick={handleClick} className={classes.removeIcon} src={Images.remove} alt="remove"/>
        </div>
    )
}