import {scheduleModalsStyle} from "./styles";
import {modalsStyle} from "../../../../components/modal/styles";
import {CloseButton} from "@eachbase/components";
import React, {useState} from "react";
import {Images} from "@eachbase/utils";
import {Break} from "./break";
import {Service} from "./service";

export const CreateEvent = ({handleOpenClose, date}) => {
    const classes = scheduleModalsStyle()
    const global = modalsStyle()
    const [screenType, setScreenType] = useState('')

    const handleChange = (type) => {
        setScreenType(type)
    }


    return (
        <>
            <div className={screenType === 'Service' ? classes.bigModal :  global.inactiveModalBody}>
                <div className={global.positionedButton}>
                    <CloseButton handleCLic={handleOpenClose}/>
                </div>

                {screenType === 'Service' ?
                    <Service date={date} handleOpenClose={handleOpenClose} />
                    :
                    screenType ? screenType !== 'Service' &&
                    <Break date={date} type={screenType}  handleOpenClose={handleOpenClose}/>

                    :
                    <>
                        <p className={global.availableScheduleTitle}>Select the Event Type</p>
                        <p className={classes.subTitle}>Please select the event type you want to add.</p>


                        <div className={classes.typesWrapper}>
                            <div onClick={() => handleChange('Service')} className={classes.typesItem}>
                                <p>Service Appointment</p>
                                <img src={Images.forward} alt="icon"/>
                            </div>
                            <div onClick={() => handleChange('Break')} className={classes.typesItem}>
                                <p>Break</p>
                                <img src={Images.forward} alt="icon"/>
                            </div>
                            <div onClick={() => handleChange('Drive')} className={classes.typesItem}>
                                <p>Drive Time</p>
                                <img src={Images.forward} alt="icon"/>
                            </div>
                            <div onClick={() => handleChange('Paid')} className={classes.typesItem}>
                                <p>Paid Time Off</p>
                                <img src={Images.forward} alt="icon"/>
                            </div>
                        </div>
                    </>
                }


            </div>


        </>
    )
}