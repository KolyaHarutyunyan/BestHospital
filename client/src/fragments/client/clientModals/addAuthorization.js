import React, {useEffect, useState} from "react";
import {ValidationInput, SelectInput, CreateChancel, ModalHeader} from "@eachbase/components";
import {createClientStyle,} from "./styles";
import {ErrorText} from "@eachbase/utils";
import {useDispatch, useSelector} from "react-redux";
import {clientActions, fundingSourceActions} from "../../../store";
import {useParams} from "react-router-dom";


export const AddAuthorization = ({handleClose, info}) => {
    const [error, setError] = useState("");
    const [inputs, setInputs] = useState(info ? {...info,funding: info.funderId.name, address : info.address.street} : {});
    const params = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fundingSourceActions.getFundingSource())
    }, []);
    const fSelect = useSelector(state => state.fundingSource.fSelect)
    const classes = createClientStyle()

    const handleChange = e => setInputs(
        prevState => ({...prevState, [e.target.name]: e.target.value}),
        error === e.target.name && setError(''),
    );

    const handleCreate = () => {
        if (inputs.authId && inputs.funding && inputs.startDate && inputs.endDate && inputs.address && inputs.status) {
            let funderId;
            fSelect.forEach(item => {
                if (inputs.funding === item.name) {
                    funderId = item.id
                }
            })
            const data = {
                "authId": inputs.authId,
                "startDate": inputs.startDate,
                "endDate": inputs.endDate,
                "address": inputs.address,
                "status": +inputs.status
            }
            if (info) {
                dispatch(clientActions.editClientsAuthorizations(data, info.id))
            } else {
                console.log(params.id, 'client id')
                console.log(funderId, 'fund id')
                dispatch(clientActions.createClientsAuthorizations(data, params.id, funderId))
            }
            handleClose()
        } else {
            setError(
                !inputs.authId ? 'authId' :
                    !inputs.funding ? 'funding' :
                        !inputs.startDate ? 'startDate' :
                            !inputs.endDate ? 'endDate' :
                                !inputs.address ? 'address' :
                                    !inputs.status ? 'status' :
                                        'Input is not field'
            )
        }
    }

    const list = [
        {name: 1},
        {name: 2}
    ]


    return (
        <div className={classes.createFoundingSource}>
            <ModalHeader
                handleClose={handleClose}
                title={info ? "Edit Authorization" : 'Add Authorization'}
                text={'Please fulfill the below fields to add an authorization.'}
            />
            <div className={classes.createFoundingSourceBody}>
                <div className={classes.clientModalBlock}>
                    <div className={classes.clientModalBox}>
                        <ValidationInput
                            variant={"outlined"}
                            onChange={handleChange}
                            value={inputs.authId}
                            type={"text"}
                            label={"Auth#*"}
                            name='authId'
                            typeError={error === 'authId' && ErrorText.field}
                        />
                        <SelectInput
                            name={"funding"}
                            label={"Funding Source*"}
                            handleSelect={handleChange}
                            value={inputs.funding}
                            list={fSelect}
                            typeError={error === 'funding' ? ErrorText.field : ''}
                        />

                        <div style={{display: 'flex'}}>
                            <ValidationInput
                                variant={"outlined"}
                                onChange={handleChange}
                                value={inputs.startDate}
                                type={"date"}
                                label={"Start Date*"}
                                name='startDate'
                                typeError={error === 'startDate' && ErrorText.field}
                            />
                            <div style={{width: 16}}/>
                            <ValidationInput
                                variant={"outlined"}
                                onChange={handleChange}
                                value={inputs.endDate}
                                type={"date"}
                                label={"Terminated Date*"}
                                name='endDate'
                                typeError={error === 'endDate' && ErrorText.field}
                            />

                        </div>
                        <SelectInput
                            name={"status"}
                            label={"Status*"}
                            handleSelect={handleChange}
                            value={inputs.status}
                            list={list}
                            typeError={error === 'status' ? ErrorText.field : ''}
                        />
                        <ValidationInput
                            variant={"outlined"}
                            onChange={handleChange}
                            value={inputs.address}
                            type={"text"}
                            label={"Service Location*"}
                            name='address'
                            typeError={error === 'address' && ErrorText.field}
                        />
                    </div>
                </div>
                <div className={classes.clientModalBlock}>
                    <CreateChancel
                        create={info ? "Save" : 'Add'}
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
