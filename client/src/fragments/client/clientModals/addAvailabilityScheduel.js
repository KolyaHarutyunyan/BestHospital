import React, {useEffect, useState} from "react";
import {ErrorText, Images, useGlobalTextStyles} from "@eachbase/utils";
import {CloseButton, CreateChancel} from "@eachbase/components/buttons";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clientActions, httpRequestsOnErrorsActions, httpRequestsOnSuccessActions,} from "@eachbase/store";
import {modalsStyle} from "../../../components/modal/styles";
import {availabilityStyles} from "../../../components/availability/styles";
import {WeeklyDays} from "./weeklyDays";


export const AddAvailabilityScheduel = ({handleClose, info}) => {


    let data = {
        monday: [{"from": "12:00", "to": "13:00", "available": true}, {
            "from": "14:00",
            "to": "15:00",
            "available": false
        }],
        tuesday: [{"from": "12:00", "to": "13:00", "available": true}, {
            "from": "14:00",
            "to": "15:00",
            "available": false
        }]
    }

    const [addForm, setAddForm] = useState(null);

    const globalText = useGlobalTextStyles()
    const classes = modalsStyle()
    const classesModal = availabilityStyles()


    let addHours = () => {
        setAddForm({})
    }

    return (
        <div className={classesModal.AddAvailabilityScheduel}>
            <h1 className={`${globalText.modalTitle}`}> {'Edit Availability Schedule'} </h1>
            <div className={classes.positionedButton}>
                <CloseButton handleCLic={handleClose}/>
            </div>

            <div className={classes.AddAvailabilityScheduelBlock}>
                <WeeklyDays info={data.monday} day={'MON'} addHours={addHours} addForm={addForm}/>
                <WeeklyDays day={'FR'}/>
                <WeeklyDays day={'SA'}/>
                <WeeklyDays day={'MON'}/>
                <WeeklyDays day={'MON'}/>
                <WeeklyDays day={'MON'}/>
                <WeeklyDays day={'MON'}/>
            </div>


            <CreateChancel
                // loader={httpOnLoad.length > 0}
                create={'Save'}
                chancel={"Cancel"}
                // onCreate={handleCreate}
                onClose={handleClose}
                buttonWidth='269px'
            />
        </div>
    );
}
