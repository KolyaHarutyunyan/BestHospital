import React, {useState} from "react";
import {AddModalButton, RadioButton, SelectInputPlaceholder, ValidationInput} from "@eachbase/components";
import {PayrollSetupStyles} from '../styles';
import {ErrorText} from "@eachbase/utils";

const payCodeType = [
    {name: 'Daily'},
    {name: 'Weekly'},
    {name: 'Consecutive'}
]

const payCodeBtn = {
    width: '100%',
    height: '48px'
}

const applyOvertimeData = [
    {
        label: 'No',
        value: 'No',
    },
    {
        label: 'Yes',
        value: 'Yes'
    }
]

const ptoData = [
    {
        label: 'No',
        value: 'No',
    },
    {
        label: 'Yes',
        value: 'Yes'
    }
]

const checkboxStyle = {display: 'flex', alignItems: 'center', flexDirection: 'row'}

export const PayCodeType = ({maxWidth, marginRight, marginTop}) => {

    const classes = PayrollSetupStyles()

    const [inputs, setInputs] = useState({});
    const [error, setError] = useState('');
    const [applyOvertime, setApplyOvertime] = useState('No');
    const [AccruePTO, setAccruePTO] = useState('No');

    const handleChange = e => {
        setInputs(
            prevState => (
                {
                    ...prevState,
                    [e.target.name]: e.target.value
                }
            ));
        error === e.target.name && setError('')
    }

    const handleSubmit = () => {
        let data = {
            name: inputs.name,
            code: inputs.code,
            type: inputs.type,
        }
        if (inputs.name && inputs.type && inputs.code ) {
            console.log(data, 'daaaata')
        } else {
            setError(
                !inputs.name ? 'name' :
                    !inputs.code ? 'code' :
                        !inputs.type ? 'type' :
                            'Input is not filled'
            )
        }
    }

    const change = (event) => {
        setApplyOvertime(event.target.value);
    };
    const changePTO = (event) => {
        setAccruePTO(event.target.value);
    };

    return (
        <div className={classes.payCodeType} style={{maxWidth: maxWidth,marginRight: marginRight ? marginRight : 0,marginTop: marginTop ? marginTop : 0}}>
            <h1 className={classes.modalTitle}>Add a New Paycode Type</h1>
            <p className={classes.modalSubTitle}>Please fulfill the below fields to add a Paycode Type in the system.</p>
            <ValidationInput
                onChange={handleChange}
                value={inputs.name}
                variant={"outlined"}
                name={"name"}
                type={"text"}
                placeholder={'Name*'}
                typeError={error === 'name' ? ErrorText.field : ''}
            />
            <ValidationInput
                onChange={handleChange}
                value={inputs.code}
                variant={"outlined"}
                name={"code"}
                type={"text"}
                placeholder={'Code*'}
                typeError={error === 'code' ? ErrorText.field : ''}
            />
            <SelectInputPlaceholder
                placeholder='Type'
                name={"type"}
                handleSelect={handleChange}
                value={inputs.type}
                list={payCodeType}
                typeError={error === 'type' ? ErrorText.field : ''}
            />
            <div className={classes.flexBox}>
                <div className={classes.checkboxContainer}>
                    <p>Apply Overtime?</p>
                    <RadioButton styles={checkboxStyle} value={applyOvertime} onChange={change} radioData={applyOvertimeData} />
                </div>
                <div className={classes.checkboxContainer}>
                    <p>Accrue PTO?</p>
                    <RadioButton styles={checkboxStyle} value={AccruePTO} onChange={changePTO} radioData={ptoData}  />
                </div>
            </div>
            <AddModalButton
                handleClick={handleSubmit} text='Add Paycode Type'
                styles={payCodeBtn}
            />
        </div>
    )
}