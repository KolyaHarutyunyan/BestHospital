import React, {useEffect, useState} from "react";
import {CreateChancel, SelectInput, ValidationInput} from "@eachbase/components";
import {ErrorText} from "@eachbase/utils";
import {scheduleModalsStyle} from "./styles";
import {modalsStyle} from "../../../../components/modal/styles";
import {useDispatch, useSelector} from "react-redux";
import {adminActions, appointmentActions, clientActions} from "@eachbase/store";
import axios from "axios";

export const Service = ({handleOpenClose, info, date, clientList, staffList, places}) => {
    const dispatch = useDispatch()
    const classes = scheduleModalsStyle()
    const global = modalsStyle()
    const [inputs, setInputs] = useState(
        // date ? {...date} :
        {});
    const [error, setError] = useState({});
    const [service, setService] = useState('');
    const [staffService, setStaffService] = useState('');

    const handleChange = e => {
        setInputs(prevState => ({...prevState, [e.target.name]: e.target.value}),);
        error === e.target.name && setError('')
    }


    const handleCreate = () => {
        const date = {
            type: 'SERVICE',
            // ...inputs,
            authorizedService: inputs.service,
            client: inputs.client,
            staff: inputs.staff,
            staffPayCode: '619ce46b620c886016d9bc55',
            startDate: inputs.startDate,
            startTime: new Date(),
            endTime: new Date(),
            eventStatus: 'PENDING',
            status: "ACTIVE",
            require: false
        }

        dispatch(appointmentActions.createAppointment(date))


        // const timeDate =  new Date("01-01-2017 " + inputs.startTime + ":00")
        //
        // // new Date(null, null, null, '17:36');
        // const setedDate = new Date(inputs.startDate);
        //
        // setedDate.setHours(timeDate.getUTCHours(), timeDate.getMinutes());
        //
        // let tzDifference = item.timezoneOffset * 60 + new Date(setedDate).getTimezoneOffset();
        // const localTime = moment(setedDate)
        //     .utcOffset(tzDifference / 60)
        //     .format('llll');
        // return item.startTime ? new Date(localTime) : item.startDate;
    }

    const handleSelect = (ev) => {
        setInputs(prevState => ({...prevState, [ev.target.name]: ev.target.value}),)
        ev.target.name === 'staff' &&  handleGetService(ev.target.value)

        // dispatch(adminActions.getStaffService(ev.target.value))

        ev.target.name === 'client' && dispatch(clientActions.getClientsAuthorizations(ev.target.value))
    }

    const handleGetService = (id) =>{
        axios.get( `/staff/${id}/service`).then(
            (res) => setStaffService(res.data.service)
        )
    }
    const clientsAuthorizations = useSelector(state => state.client.clientsAuthorizations)


    useEffect(() => {
        if (clientsAuthorizations.length) {
            axios.get( `/authorizationservice/authorization/${clientsAuthorizations[0].id}`).then(
                (res) => setService(res.data)
            )
        }
    }, [clientsAuthorizations])

    return (
        <div className={classes.serciveModall}>
            <p className={global.availableScheduleTitle}>{'Add a Service Appointment'}</p>
            <p className={classes.subTitle}>{'To add a Service Appointment, please fulfill the below fields.'}</p>

            <div className={classes.seviceModalWrapper}>
                <div>
                    <SelectInput
                        type={'id'}
                        language={null}
                        name={"client"}
                        label={"Client*"}
                        handleSelect={handleSelect}
                        value={inputs.client}
                        list={clientList ? clientList : []}
                        typeError={error === 'client' && ErrorText.field}
                    />
                    <SelectInput
                        type={'id'}
                        language={null}
                        name={"staff"}
                        label={"Staff Member*"}
                        handleSelect={handleSelect}
                        value={inputs.staff}
                        list={staffList ? staffList : []}
                        typeError={error === 'staff' && ErrorText.field}
                    />
                    <SelectInput
                        type={'id'}
                        language={null}
                        name={"placeofService"}
                        label={"Place of Service*"}
                        handleSelect={handleSelect}
                        value={inputs.placeofService}
                        list={staffService ? staffService : []}
                        typeError={error === 'placeofService' && ErrorText.field}
                    />
                    <SelectInput
                        type={'id'}
                        language={null}
                        name={"service"}
                        label={"Service*"}
                        handleSelect={handleSelect}
                        value={inputs.service}
                        list={service ? service : []}
                        typeError={error === 'service' && ErrorText.field}
                    />
                </div>


                <div>
                    <ValidationInput
                        variant={"outlined"}
                        onChange={handleChange}
                        value={inputs.startDate}
                        type={"date"}
                        label={"Start Date*"}
                        name='startDate'
                        typeError={error === 'startDate' && ErrorText.field}
                    />

                    <div className={classes.timeInputs}>

                        <ValidationInput
                            variant={"outlined"}
                            onChange={handleChange}
                            value={inputs.startTime}
                            type={"time"}
                            label={"Start Time*"}
                            name='startTime'
                            style={classes.startTime}
                            typeError={error === 'startTime' && ErrorText.field}
                        />
                        <ValidationInput
                            variant={"outlined"}
                            onChange={handleChange}
                            value={inputs.endTime}
                            type={"time"}
                            label={"End Time*"}
                            name='endTime'
                            typeError={error === 'endDate' && ErrorText.field}
                        />
                    </div>
                </div>


            </div>
            <CreateChancel
                // loader={httpOnLoad.length > 0}
                create={info ? "Save" : "Add"}
                chancel={"Cancel"}
                onCreate={handleCreate}
                onClose={handleOpenClose}
                buttonWidth='47%'
            />

        </div>
    )
}