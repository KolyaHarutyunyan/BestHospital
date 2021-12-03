import {Images} from '@eachbase/utils'
import {roleStyles} from "./styles";

export const RoleItem = ({key, roleItem, handleClick, handleOpen, active}) => {
    const classes = roleStyles()

    return (
        <div onClick={handleOpen} key={key} className={active ? classes.roleItemActive : classes.roleItemHover}>
            <div className={classes.roleItem}>
                <div>
                    <img src={Images.accessManagementOutline} alt="roleManagement"/>
                    <p className={classes.roleItemName}>{roleItem && roleItem}</p>
                </div>
                <img onClick={handleClick} className={classes.removeIcon} src={Images.remove} alt="remove"/>
            </div>
        </div>
    )
}