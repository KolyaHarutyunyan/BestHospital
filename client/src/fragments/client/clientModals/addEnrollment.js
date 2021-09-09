import React, {useEffect, useState} from "react";
import {ValidationInput, SelectInput, CreateChancel, ModalHeader} from "@eachbase/components";
import {createClientStyle,} from "./styles";
import {ErrorText} from "@eachbase/utils";
import {useDispatch, useSelector} from "react-redux";
import {clientActions, fundingSourceActions} from '@eachbase/store';
import {useParams} from "react-router-dom";



export const AddEnrollment = ({handleClose, info}) => {

    const [error, setError] = useState("");
    const [inputs, setInputs] = useState(info ? {...info, funding: info.funderId.name} : {});
    const classes = createClientStyle()
    const params = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fundingSourceActions.getFundingSource())
    }, []);
    const fSelect = useSelector(state => state.fundingSource.fSelect)


    const handleChange = e => setInputs(
        prevState => ({...prevState, [e.target.name]: e.target.value}),
        error === e.target.name && setError(''),
    );

    const handleCreate = () => {
        if (inputs.funding && inputs.startDate && inputs.terminationDate) {
            let funderId;
            fSelect.forEach(item => {
                if (inputs.funding === item.name) {
                    funderId = item.id
                }
            })
            const data = {
                "primary": true,
                "startDate": inputs.startDate,
                "terminationDate": inputs.terminationDate
            }
            if (info){
                dispatch(clientActions.editClientEnrollment(data, params.id, funderId, info.id))
            }else {
                dispatch(clientActions.createClientEnrollment(data, params.id, funderId))
            }
            handleClose()
        } else {
            setError(
                !inputs.funding ? 'funding' :
                    !inputs.startDate ? 'startDate' :
                        !inputs.terminationDate ? 'terminationDate' :
                            'Input is not field'
            )
        }


    }


    return (
        <div className={classes.createFoundingSource}>
            <ModalHeader
                handleClose={handleClose}
                title={info ? 'Edit an Enrollment' : 'Add an Enrollment'}
                text={'To add a new enrollment in the system, please fulfill the below fields.'}
            />
            <div className={classes.createFoundingSourceBody}>
                <div className={classes.clientModalBlock}>
                    <div className={classes.clientModalBox}>
                        <SelectInput
                            name={"funding"}
                            label={info ? "Funding Source*" : ""}
                            handleSelect={handleChange}
                            value={inputs.funding}
                            list={fSelect}
                            typeError={error === 'funding' ? ErrorText.field : ''}
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
                        <ValidationInput
                            variant={"outlined"}
                            onChange={handleChange}
                            value={inputs.terminationDate}
                            type={"date"}
                            label={"Terminated Date*"}
                            name='terminationDate'
                            typeError={error === 'terminationDate' && ErrorText.field}
                        />
                    </div>
                </div>
                <div className={classes.clientModalBlock}>
                    <CreateChancel
                        create={info ? "Save" : "Add"}
                        chancel={"Cancel"}
                        onCreate={handleCreate}
                        onClose={handleClose}
                        buttonWidth='224px'
                    />
                </div>
            </div>
        </div>
    );
};
