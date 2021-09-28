import React, {useState} from "react";
import {
    AddModalButton,
    RadioButton,
    SelectInputPlaceholder,
    SelectInput,
    ValidationInput, CreateChancel,
} from "@eachbase/components";
import {PayrollSetupStyles} from '../styles';
import {ErrorText} from "@eachbase/utils";
import {useDispatch} from "react-redux";
import {payrollActions} from "@eachbase/store/payroll";

const payCodeType = [
    {name: 'HOURLY'},
    {name: 'SALARY'},
    {name: 'FIXED'},
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

export const PayCodeType = ({handleOpenClose, editedData, maxWidth, marginRight, marginTop}) => {

    const classes = PayrollSetupStyles()
    const dispatch = useDispatch()
    const [inputs, setInputs] = useState(editedData ? editedData : {});
    const [error, setError] = useState('');
    const [applyOvertime, setApplyOvertime] = useState(editedData && editedData.overtime === true ? 'Yes' : 'No');
    const [AccruePTO, setAccruePTO] = useState(editedData && editedData.pto === true ? 'Yes' : 'No');


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
            overtime: applyOvertime === 'Yes',
            pto: AccruePTO === 'Yes'
        }
        if (inputs.name && inputs.type && inputs.code) {
            if(editedData) {
                dispatch(payrollActions.editPayCodeByIdGlobal(data, editedData?.id));
                handleOpenClose()
            } else {
                dispatch(payrollActions.createPayCodeGlobal(data))
                setInputs({
                    name: '',
                    code: '',
                    type: '',
                })
                setApplyOvertime('No')
                setAccruePTO('No')
            }

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
        <div className={classes.payCodeType} style={{
            maxWidth: maxWidth,
            marginRight: marginRight ? marginRight : 0,
            marginTop: marginTop ? marginTop : 0,
            width: editedData ? '480px' : '100%'
        }}>
            {
                editedData ? <h1 className={classes.editModalTitle}>Edit Paycode Type</h1> :
                    <>
                        <h1 className={classes.modalTitle}>Add a New Paycode Type</h1>
                        <p className={classes.modalSubTitle}>Please fulfill the below fields to add a Paycode Type in
                            the system.</p>
                    </>
            }

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
            {
                (editedData) ?
                    <SelectInput
                        placeholder='Type'
                        name={"type"}
                        handleSelect={handleChange}
                        value={inputs.type}
                        list={payCodeType}
                        typeError={error === 'type' ? ErrorText.field : ''}
                    />
                    :
                    <SelectInputPlaceholder
                        placeholder='Type'
                        name={"type"}
                        handleSelect={handleChange}
                        value={inputs.type}
                        list={payCodeType}
                        typeError={error === 'type' ? ErrorText.field : ''}
                    />
            }

            <div className={classes.flexBox}>
                <div className={classes.checkboxContainer}>
                    <p>Apply Overtime?</p>
                    <RadioButton styles={checkboxStyle} value={applyOvertime} onChange={change}
                                 radioData={applyOvertimeData}/>
                </div>
                <div className={classes.checkboxContainer}>
                    <p>Accrue PTO?</p>
                    <RadioButton styles={checkboxStyle} value={AccruePTO} onChange={changePTO} radioData={ptoData}/>
                </div>
            </div>
            {
                editedData ? <CreateChancel
                    buttonWidth='192px'
                    create='Save'
                    chancel="Cancel"
                    onClose={ handleOpenClose}
                    onCreate={handleSubmit}
                /> :
                    <AddModalButton
                        handleClick={handleSubmit} text={'Add Paycode Type'}
                        styles={payCodeBtn}
                    />
            }
        </div>
    )
}