import React, {useEffect, useState} from "react";
import {CreateChancel, SelectInput, Switcher, ValidationInput} from "@eachbase/components";
import {ErrorText, FindLoad} from "@eachbase/utils";
import {scheduleModalsStyle} from "./styles";
import {modalsStyle} from "../../../../components/modal/styles";
import {useDispatch, useSelector} from "react-redux";
import {adminActions, appointmentActions, clientActions, systemActions} from "@eachbase/store";
import axios from "axios";
import moment from "moment";

export const Service = ({handleOpenClose, info, date, clientList, staffList, places,allPaycodes, modalDate, day, createModalDate}) => {
    const dispatch = useDispatch()
    const classes = scheduleModalsStyle()
    const global = modalsStyle()
    const [inputs, setInputs] = useState(
        modalDate ? {...modalDate} :
                  day ? {...day, ...createModalDate } :
                  createModalDate ? {...createModalDate} :
                {});
    const [times, setTimes] = useState(date ? {...date} : {});
    const [error, setError] = useState({});
    const [service, setService] = useState('');
    const [staffService, setStaffService] = useState('');
    const [clientService, setClientService] = useState('');
    const [signature, setSignature] = useState(false)




    const handleChange = e => {
        setInputs(prevState => ({...prevState, [e.target.name]: e.target.value}),);
        error === e.target.name && setError('')
    }


    const handleCreate = () => {
        const date = {
            type: 'SERVICE',

            ...inputs,
            // authorizedService: inputs.service,
            // client: inputs.client,
            // staff: inputs.staff,
            // placeService: inputs.placeService,
            // staffPayCode: inputs.staffPayCode,
            ...times,
            // startDate: inputs.startDate,
            // startTime: new Date(),
            // endTime: new Date(),
            eventStatus: 'PENDING',
            status: "ACTIVE",
            require: signature
        }
        dispatch(appointmentActions.createAppointment(date))
    }


    const handleSelect = (ev) => {
        setInputs(prevState => ({...prevState, [ev.target.name]: ev.target.value}),)
        ev.target.name === 'staff' && dispatch(adminActions.getAllPaycodes(ev.target.value))
        ev.target.name === 'client' && handleGetClientServ(ev.target.value)
    }
    const handleGetClientServ  = (id) =>{
        axios.get(`/authorization/client/${id}`, {auth: true}).then(
            res=> res.data.length ?
                axios.get(`/authorizationservice/authorization/${res.data[res.data.length - 1].id}`, { auth: true }).then(date =>
                    setClientService(date.data) )
    : ''
        ).catch(() => setClientService(''))
    }

    // const handleGetService = (id) =>{
    //     axios.get( `/staff/${id}/service`, { auth:true }).then(
    //         (res) => setStaffService(res.data.service)
    //     ).catch(() => setStaffService(''))
    // }
    // const clientsAuthorizations = useSelector(state => state.client.clientsAuthorizations)
    // useEffect(() => {
    //     if (clientsAuthorizations.length) {
    //         axios.get( `/authorizationservice/authorization/${clientsAuthorizations[0].id}`).then(
    //             (res) => setService(res.data)
    //         )
    //     }
    // }, [clientsAuthorizations])

    const loader = FindLoad('CREATE_APPOINTMENT')

    const handleChangeSignature = () =>{
        setSignature(!signature)
    }

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
                        type={'service'}
                        language={null}
                        name={"service"}
                        label={"Authorized Service*"}
                        handleSelect={handleSelect}
                        value={inputs.service}
                        list={clientService ? clientService : []}
                        typeError={error === 'service' && ErrorText.field}
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
                        name={"placeService"}
                        label={"Place of Service*"}
                        handleSelect={handleSelect}
                        value={inputs.placeService}
                        list={places ? places : []}
                        typeError={error === 'placeService' && ErrorText.field}
                    />
                </div>


                <div>
                    <ValidationInput
                        variant={"outlined"}
                        onChange={handleChange}
                        value={inputs.startDate ?
                            moment(inputs.startDate).format('YYYY-MM-DD')
                            : inputs.startDate}
                        type={"date"}
                        label={"Start Date*"}
                        name='startDate'
                        typeError={error === 'startDate' && ErrorText.field}
                    />

                    <div className={classes.timeInputs}>

                        <ValidationInput
                            variant={"outlined"}
                            onChange={handleChange}
                            value={times.startTime ?
                                `${times.startTime.getHours() < 10 ? `0${times.startTime.getHours()}` : times.startTime.getHours()}:${times.startTime.getMinutes() < 10 ? `0${times.startTime.getMinutes()}` : times.startTime.getMinutes()}`
                                : ''}
                            type={"time"}
                            label={"Start Time*"}
                            name='startTime'
                            style={classes.startTime}
                            typeError={error === 'startTime' && ErrorText.field}
                        />
                        <ValidationInput
                            variant={"outlined"}
                            onChange={handleChange}
                            value={times.endTime ?
                                `${times.endTime.getHours() < 10 ? `0${times.endTime.getHours()}` : times.endTime.getHours()}:${times.endTime.getMinutes() < 10 ? `0${times.endTime.getMinutes()}` : times.endTime.getMinutes()}`
                                : ''}
                            type={"time"}
                            label={"End Time*"}
                            name='endTime'
                            typeError={error === 'endDate' && ErrorText.field}
                        />
                    </div>
                    <SelectInput
                        type={'id'}
                        language={null}
                        name={"staffPayCode"}
                        label={"Staff Paycode*"}
                        handleSelect={handleChange}
                        value={modalDate ?
                            inputs.staffPayCode._id ? inputs.staffPayCode._id : inputs.staffPayCode
                            : inputs.staffPayCode}
                        list={allPaycodes ? allPaycodes : []}
                        typeError={error === 'staffPayCode' && ErrorText.field}
                    />

                    <div className={classes.signature}>
                        <p>Require Signature</p>
                        <Switcher checked={signature} handleClick={handleChangeSignature}/>
                    </div>


                </div>


            </div>
            <CreateChancel
                loader={!!loader.length}
                create={info ? "Save" : "Add"}
                chancel={"Cancel"}
                onCreate={handleCreate}
                onClose={handleOpenClose}
                buttonWidth='47%'
            />

        </div>
    )
}