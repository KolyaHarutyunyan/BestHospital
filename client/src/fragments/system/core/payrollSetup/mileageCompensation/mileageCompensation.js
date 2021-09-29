import React, {useState} from "react";
import {
    AddModalButton,
    ValidationInput, CreateChancel,
} from "@eachbase/components";
import {PayrollSetupStyles} from '../styles';
import {ErrorText} from "@eachbase/utils";
import {useDispatch} from "react-redux";

const overtimeBtn = {
    width: '100%',
    height: '48px'
}

export const MileageCompensation = ({marginTop,marginRight,maxWidth, editedData,handleOpenClose}) => {

    const classes = PayrollSetupStyles()
    const dispatch = useDispatch()

    const [inputs, setInputs] = useState({});
    const [error, setError] = useState('');

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
            startDate: inputs.startDate
        }
        if (inputs.name && inputs.startDate) {
            // if (editedData) {
            //     dispatch(payrollActions.editOvertimeSettingsByIdGlobal(data, editedData?.id));
            // } else {
            //     dispatch(payrollActions.createOvertimeSettingsGlobal(data))
            //     setInputs({
            //         name: '',
            //         startDate: '',
            //     })
            // }

            console.log(data, 'data data')

        } else {
            setError(
                !inputs.name ? 'name' :
                    !inputs.startDate ? 'startDate' :
                        'Input is not filled'
            )
        }
    }
    return (
        <div className={classes.payCodeType} style={{
            maxWidth: maxWidth,
            marginRight: marginRight ? marginRight : 0,
            marginTop: marginTop ? marginTop : 0,
        }}>
            {
                editedData ? <h1 className={classes.editModalTitle}>Edit Mileage Compensation</h1> :
                    <>
                        <h1 className={classes.modalTitle}>Add a New Mileage Compensation</h1>
                        <p className={classes.modalSubTitle}>Please fulfill the below fields to add a Mileage
                            Compensation in the system.</p>
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
                value={inputs.startDate}
                variant={"outlined"}
                name={"startDate"}
                type={"date"}
                placeholder={'Start Date*'}
                typeError={error === 'startDate' ? ErrorText.field : ''}
            />
            {
                editedData ? <CreateChancel
                        buttonWidth='192px'
                        create='Save'
                        chancel="Cancel"
                        onClose={handleOpenClose}
                        onCreate={handleSubmit}
                    /> :
                    <AddModalButton
                        handleClick={handleSubmit} text={'Add Mileage Compensation'}
                        styles={overtimeBtn}
                    />
            }


        </div>
    )
}