import React, {useState} from "react";
import {CreateChancel, SelectInput, ValidationInput} from "@eachbase/components";
import {ErrorText} from "@eachbase/utils";
import {scheduleModalsStyle} from "./styles";
import {modalsStyle} from "../../../../components/modal/styles";


export const Service =({ handleOpenClose, info, date}) =>{
    const classes = scheduleModalsStyle()
    const global = modalsStyle()
    const [inputs, setInputs] = useState(date ? {...date} : {});
    const [error, setError] = useState({});

    const handleChange = e => setInputs(
        prevState => ({...prevState, [e.target.name]: e.target.value}),
        error === e.target.name && setError(''),
    );

    const handleCreate = () => {
        console.log(inputs, 'iiiiii')
    }

    return(
        <div className={classes.serciveModall}>
            <p className={global.availableScheduleTitle}>{'Add a Service Appointment'}</p>
            <p className={classes.subTitle}>{'To add a Service Appointment, please fulfill the below fields.'}</p>

            <div className={classes.seviceModalWrapper}>
            <div>
                <SelectInput
                    language={null}
                    name={"client"}
                    label={"Client*"}
                    handleSelect={handleChange}
                    value={inputs.client}
                    list={[]}
                    typeError={error === 'client' && ErrorText.field}
                />
                <SelectInput
                    language={null}
                    name={"service"}
                    label={"Service*"}
                    handleSelect={handleChange}
                    value={inputs.service}
                    list={[]}
                    typeError={error === 'service' && ErrorText.field}
                />
                <SelectInput
                    language={null}
                    name={"staffMember"}
                    label={"Staff Member*"}
                    handleSelect={handleChange}
                    value={inputs.staffMember}
                    list={[]}
                    typeError={error === 'staffMember' && ErrorText.field}
                />
                <SelectInput
                    language={null}
                    name={"placeofService"}
                    label={"Place of Service*"}
                    handleSelect={handleChange}
                    value={inputs.placeofService}
                    list={[]}
                    typeError={error === 'placeofService' && ErrorText.field}
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