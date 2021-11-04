import React, {useState} from "react";
import {CreateChancel, SelectInput, ValidationInput} from "@eachbase/components";
import {ErrorText} from "@eachbase/utils";
import {scheduleModalsStyle} from "./styles";
import {modalsStyle} from "../../../../components/modal/styles";

export const Break = ({ handleOpenClose, type, date }) => {
    const classes = scheduleModalsStyle()
    const global = modalsStyle()
    const [inputs, setInputs] = useState(date ? {...date} : {});
    const [error, setError] = useState({});

    const handleChange = e => setInputs(
        prevState => ({...prevState, [e.target.name]: e.target.value}),
        error === e.target.name && setError(''),
        // e.target.name === 'firstName' && handleChangeFirstName(e.target.value),
        // e.target.name === 'lastName' && handleChangeLastName(e.target.value),
    );


    const info = ''
    const handleCreate = () => {

    }

    const title =
        type === 'Paid' ? 'Add a Paid Time Off' :
            type === 'Break' ? 'Add a Break' :
                type === 'Drive' ? 'Add a Drive Time' : ''

    const edit =
        type === 'Paid' ? 'Edit Paid Time Off' :
            type === 'Break' ? 'Edit Break' :
                type === 'Drive' ? 'Edit Drive Time' : ''

    const sub =
        type === 'Paid' ? 'To add a Paid Time Off, please fulfill the below fields.' :
            type === 'Break' ? 'To add a Break, please fulfill the below fields.' :
                type === 'Drive' ? 'To add a Drive Time, please fulfill the below fields.' : ''

    return (
        <div>
            <p className={global.availableScheduleTitle}>{info ? edit : title}</p>
            <p className={classes.subTitle}>{sub}</p>


            <div className={classes.breakWrapper}>
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
                    name={"staffPaycode"}
                    label={"Staff Paycode*"}
                    handleSelect={handleChange}
                    value={inputs.staffPaycode}
                    list={[]}
                    typeError={error === 'staffPaycode' && ErrorText.field}
                />
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

                {type === 'Drive' &&
                <ValidationInput
                    variant={"outlined"}
                    onChange={handleChange}
                    value={inputs.miles}
                    type={"number"}
                    label={"Miles"}
                    name='miles'
                    typeError={error === 'miles' && ErrorText.field}
                />
                }

                <CreateChancel
                    // loader={httpOnLoad.length > 0}
                    create={info ? "Save" : "Add"}
                    chancel={"Cancel"}
                    onCreate={handleCreate}
                    onClose={handleOpenClose}
                    buttonWidth='191px'
                />


            </div>
        </div>
    )
}