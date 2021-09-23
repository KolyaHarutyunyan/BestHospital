import React, {useEffect, useState} from "react";
import {ValidationInput, SelectInput, CreateChancel, ModalHeader} from "@eachbase/components";
import {createClientStyle,} from "./styles";
import {ErrorText} from "@eachbase/utils";
import {useDispatch, useSelector} from "react-redux";
import {clientActions, fundingSourceActions} from "@eachbase/store";
import {useParams} from "react-router-dom";



export const AddAuthorizationService = ({handleClose, info, fundingId}) => {

    const [error, setError] = useState("");
    const [inputs, setInputs] = useState(info ? {...info,funding: info?.funderId?.name} : {});
    const params = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fundingSourceActions.getFoundingSourceServiceById(fundingId))
    }, []);


    const fSelect = useSelector(state => state.fundingSource.fundingSourceServices)



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
                title={info ? "Edit Authorization Service" : 'Add Authorization Service'}
                text={'To add a new authorization service in the system, please fulfill the below fields.'}
            />
            <div className={classes.createFoundingSourceBody}>
                <div className={classes.clientModalBlock}>
                    <div className={classes.clientModalBox}>
                        <p className={classes.inputInfo}>Service</p>
                        <SelectInput
                            name={"funding"}
                            label={"Service Code*"}
                            handleSelect={handleChange}
                            value={inputs.funding}
                            list={fSelect}
                            typeError={error === 'funding' ? ErrorText.field : ''}
                        />

                        <div className={classes.displayCodeBlock2}>
                            <p className={classes.displayCodeBlockText}>Available Modfiers </p>
                            <div className={classes.availableModfiers } >
                                <p className={classes.availableModfier}>N/A</p>
                            </div>
                        </div>

                        <p className={classes.inputInfo}>Availability</p>
                        <ValidationInput
                            variant={"outlined"}
                            onChange={handleChange}
                            value={inputs.address}
                            type={"text"}
                            label={"Total Units*"}
                            name='address'
                            typeError={error === 'address' && ErrorText.field}
                        />
                        <div className={classes.displayCodeBlock}>
                            <p className={classes.displayCodeBlockText}>Completed Units: <span
                                className={classes.displayCode}>N/A</span></p>
                            <p className={classes.displayCodeBlockText} style={{marginTop: 16}}>Available Units: <span
                                className={classes.displayCode}>N/A</span></p>
                            <p className={classes.displayCodeBlockText} style={{marginTop: 16}}>Percent Utilization: <span
                                className={classes.displayCode}>N/A</span></p>
                        </div>
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
