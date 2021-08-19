import {SimpleModal} from "@eachbase/components";
import {Images} from "@eachbase/utils";
import {SystemItemAddService} from "./modals";
import {systemItemStyles} from "./styles";

export const SystemItemHeader = ({modalType, open ,handleOpenClose}) => {

    const classes = systemItemStyles()

    return (
        <div className={[`${classes.systemHeaderStyles} ${classes.spaceBottom}`]}>
            <div className={classes.systemHeaderStyles}>
                <img src={Images.systemIcon} className={classes.systemIcon} alt="founding"/>
                <p className={classes.systemTitle}>System</p>
            </div>
            <SimpleModal
                openDefault={open}
                handleOpenClose={handleOpenClose}
                content={<SystemItemAddService modalType={modalType} handleClose={handleOpenClose}/>}
            />
        </div>
    )
}

